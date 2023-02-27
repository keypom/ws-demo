require('dotenv').config()
const { initKeypom, createDrop, getDrops, claimTrialAccountDrop, createTrialAccountDrop } = require("keypom-js");
const { readFileSync } = require('fs');

const fundingAccountId = process.env.TEST_ACCOUNT_ID
const fundingAccountSecretKey = process.env.TEST_ACCOUNT_PRVKEY

async function createTrialAccount(){
    if (!fundingAccountId || !fundingAccountSecretKey) {
        throw new Error('Please set TEST_ACCOUNT_ID and TEST_ACCOUNT_PRVKEY in terminal')
    }

    await initKeypom({
		// near,
		network: 'testnet',
		funder: {
			accountId: fundingAccountId,
			secretKey: fundingAccountSecretKey,
		}
	});

    const callableContracts = [
        //'counter.examples.keypom.testnet',
        `v1.social08.testnet`,
        `v2.keypom.testnet`,
        'donation.examples.keypom.testnet',
        'guest-book.examples.keypom.testnet',
        'hello-near.examples.keypom.testnet'
    ]

    const newUserName = "demo-" + Date.now()

    const {keys: {secretKeys: trialSecretKeys, publicKeys: trialPublicKeys}} 
    = await createTrialAccountDrop({
        contractBytes: [...readFileSync('./scripts/trial-accounts.wasm')],
        trialFundsNEAR: 10,
        callableContracts: callableContracts,
        callableMethods: callableContracts.map(() => '*'),
        amounts: callableContracts.map(() => '1'),
        numKeys: 1,
        config: {
            dropRoot: "linkdrop-beta.keypom.testnet"
        },
        repayAmountNEAR: 5,
        repayTo: "dennis.near"
    })
    
    const newAccountId = `${newUserName}.linkdrop-beta.keypom.testnet`
	await claimTrialAccountDrop({
        secretKey: trialSecretKeys[0],
        desiredAccountId: newAccountId,
    })
    
    console.log(`
	
	${JSON.stringify({
		account_id: newAccountId,
		public_key: trialPublicKeys[0],
		private_key: trialSecretKeys[0]
	})}

	`)

	console.log(`/keypom-url/${newAccountId}#${trialSecretKeys[0]}`)


	console.log(`
    
    localhost:3000/claim/v2.keypom.testnet#${trialSecretKeys[0]}
    
    `)
}

createTrialAccount();
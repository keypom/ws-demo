import {
  getDropInformation,
  getEnv,
  initKeypom,
  type ProtocolReturnedDrop,
  updateKeypomContractId,
  getFTMetadata,
  claim,
  getKeyInformation,
  hashPassword,
  getPubFromSecret,
  formatNearAmount,
  formatLinkdropUrl,
  generateKeys,
  getKeyInformationBatch,
  getKeySupplyForDrop,
  deleteKeys,
  getKeysForDrop,
  deleteDrops,
  getDropSupplyForOwner,
  getDrops,
} from 'keypom-js';
import * as nearAPI from 'near-api-js';

import { CLOUDFLARE_IPFS, DROP_TYPE, MASTER_KEY } from '@/constants/common';
import getConfig from '@/config/config';
import { get } from '@/utils/localStorage';

let instance: KeypomJS;
const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
const networkId = process.env.REACT_APP_NETWORK_ID ?? 'testnet';

const myKeyStore = new nearAPI.keyStores.BrowserLocalStorageKeyStore();
const config = getConfig();

const connectionConfig = {
  networkId,
  keyStore: myKeyStore,
  nodeUrl: config.nodeUrl,
  walletUrl: config.walletUrl,
  helperUrl: config.helperUrl,
  explorerUrl: config.explorerUrl,
};
class KeypomJS {
  private static instance: KeypomJS;
  nearConnection: nearAPI.Near;
  test = 0;

  constructor() {
    if (instance !== undefined) {
      throw new Error('New instance cannot be created!!');
    }
  }

  init = async () => {
    initKeypom({ network: networkId })
      .then(() => {
        console.log('KeypomJS initialized');
      })
      .catch((err) => {
        console.error('Failed to initialize KeypomJS', err);
      });

    const { connect } = nearAPI;

    this.nearConnection = await connect(connectionConfig);
  };

  public static getInstance(): KeypomJS {
    if (!KeypomJS.instance) {
      KeypomJS.instance = new KeypomJS();
    }

    return KeypomJS.instance;
  }

  getAccountIdPostfix = () => {
    const { networkId } = getEnv();
    switch (networkId) {
      case 'mainnet':
        return '.near';
      case 'testnet':
      default:
        return '.testnet';
    }
  };

  validateAccountId = async (accountId: string) => {
    if (!(accountId.length >= 2 && accountId.length <= 64 && ACCOUNT_ID_REGEX.test(accountId))) {
      throw new Error('Account Id is invalid');
    }

    try {
      const account = await this.nearConnection.account(accountId);
      await account.state();
    } catch (err) {
      throw new Error('Account Id does not exist');
    }
    return true;
  };

  verifyDrop = async (contractId: string, secretKey: string) => {
    const { networkId, supportedKeypomContracts } = getEnv();

    if (
      supportedKeypomContracts === undefined ||
      networkId === undefined ||
      contractId === undefined
    ) {
      throw new Error('Please supply supportedKeypomContracts, networkId and contractId');
    }

    if (supportedKeypomContracts[networkId][contractId] === undefined) {
      throw new Error("Linkdrop is invalid and isn't officially supported by Keypom contract.");
    }

    await updateKeypomContractId({ keypomContractId: contractId });
  };

  checkTicketRemainingUses = async (contractId: string, secretKey: string) => {
    await this.verifyDrop(contractId, secretKey);

    const keyInfo = await getKeyInformation({ secretKey });

    if (keyInfo === null || keyInfo === undefined) {
      throw new Error('Drop has been deleted or has already been claimed');
    }

    return keyInfo.remaining_uses;
  };

  checkIfDropExists = async (secretKey: string) => {
    try {
      await this.getDropInfo({ secretKey });
      return true;
    } catch (err) {
      return false;
    }
  };

  claimTicket = async (secretKey: string, password: string) => {
    let keyInfo = await getKeyInformation({ secretKey });
    const publicKey: string = await getPubFromSecret(secretKey);
    const passwordForClaim = await hashPassword(
      password + publicKey + keyInfo.cur_key_use.toString(),
    );

    try {
      await claim({ secretKey, password: passwordForClaim, accountId: 'foo' });
    } catch (e) {
      console.warn(e);
    }

    keyInfo = await getKeyInformation({ secretKey });
    if (keyInfo.remaining_uses === 2) {
      throw new Error('Password is incorrect. Please try again.');
    }
  };

  // valid contract id -> v1-3.keypom.testnet
  // getEnv check for contractid validity
  // updateKeypomContractId
  // getDropInformation
  // check drop type
  /*
    ft -> Tokens
    fc -> Ticket (3 method calls)
    fc -> NFT (1 method call)
    simple -> simple drop?
  */
  getLinkdropType = async (drop: ProtocolReturnedDrop, contractId: string, secretKey: string) => {
    await this.verifyDrop(contractId, secretKey);
    return this.getDropType(drop);
  };

  getDropType = (drop: ProtocolReturnedDrop) => {
    if (drop.fc === undefined && drop.nft === undefined) {
      return DROP_TYPE.TOKEN;
    }

    if (drop.fc !== undefined) {
      if (drop.fc.methods[0]?.length === 2) {
        return DROP_TYPE.TRIAL;
      }

      if (drop.fc.methods.length === 3) {
        return DROP_TYPE.TICKET;
      }

      if (
        drop.fc.methods.length === 1 &&
        drop.fc.methods[0] !== undefined &&
        drop.fc.methods[0][0].method_name === 'nft_mint'
      ) {
        return DROP_TYPE.NFT;
      }

      return null;
    }

    return null;
  };

  getDrops = async ({ accountId, start, limit }) => await getDrops({ accountId, start, limit });

  getDropSupplyForOwner = async ({ accountId }) => await getDropSupplyForOwner({ accountId });

  getDropMetadata = (metadata: string | undefined) =>
    JSON.parse(metadata || JSON.stringify({ dropName: 'Untitled' }));

  deleteDrops = async ({ wallet, dropIds }) => await deleteDrops({ wallet, dropIds });

  deleteKeys = async ({ wallet, dropId, publicKeys }) =>
    await deleteKeys({ wallet, dropId, publicKeys });

  getDropInfo = async ({
    dropId,
    secretKey,
  }: {
    dropId?: string;
    secretKey?: string;
  }): Promise<ProtocolReturnedDrop> => {
    let drop: ProtocolReturnedDrop;

    if (!dropId && !secretKey) {
      throw new Error('dropId or secretKey must be provided.');
    }

    try {
      drop = await getDropInformation({ dropId, secretKey });
    } catch (err) {
      throw new Error('Unable to claim. This drop may have been claimed before.');
    }

    return drop;
  };

  getClaimedDropInfo = async (dropId: string) => await getKeySupplyForDrop({ dropId });

  getKeysForDrop = async ({ dropId, limit, start }) =>
    await getKeysForDrop({ dropId, limit, start });

  getLinksToExport = async (dropId) => {
    const drop = await this.getDropInfo({ dropId });
    const { secretKeys } = await generateKeys({
      numKeys: drop.next_key_id,
      rootEntropy: `${get(MASTER_KEY) as string}-${dropId as string}`,
      autoMetaNonceStart: 0,
    });

    const links = secretKeys.map(
      (key, i) =>
        `${window.location.origin}/claim/${getConfig().contractId}#${key.replace('ed25519:', '')}`,
    );

    return links;
  };

  getKeysInfo = async (
    dropId: string,
    pageIndex: number,
    pageSize: number,
    getDropErrorCallback?: () => void,
  ) => {
    let drop: ProtocolReturnedDrop;
    try {
      drop = await this.getDropInfo({ dropId });

      const dropSize = drop.next_key_id;
      const { dropName } = this.getDropMetadata(drop.metadata);

      const { publicKeys, secretKeys } = await generateKeys({
        numKeys:
          (pageIndex + 1) * pageSize > dropSize
            ? dropSize - pageIndex * pageSize
            : Math.min(dropSize, pageSize),
        rootEntropy: `${get(MASTER_KEY) as string}-${dropId}`,
        autoMetaNonceStart: pageIndex * pageSize,
      });

      const keyInfo = await getKeyInformationBatch({
        publicKeys,
        secretKeys,
      });

      return {
        dropSize,
        dropName,
        publicKeys,
        secretKeys,
        keyInfo,
      };
    } catch (e) {
      if (getDropErrorCallback) getDropErrorCallback();
      return; // eslint-disable-line no-useless-return
    }
  };

  generateExternalWalletLink = async (
    walletName: string,
    contractId: string,
    secretKey: string,
  ) => {
    // verify the drop first
    try {
      await this.getDropInfo({ secretKey });
    } catch (err) {
      console.error(err);
      throw new Error('This drop has been claimed.');
    }

    // generate the link to navigate to
    const urls = formatLinkdropUrl({
      claimPage: walletName,
      contractId,
      secretKeys: [secretKey],
    });

    return urls[0];
  };

  getTokenClaimInformation = async (
    contractId: string,
    secretKey: string,
    skipLinkdropCheck = false,
  ) => {
    const drop = await this.getDropInfo({ secretKey });

    // verify if secretKey is a token drop
    const linkdropType = await this.getLinkdropType(drop, contractId, secretKey);
    if (linkdropType && !DROP_TYPE[linkdropType]) {
      throw new Error('This drop is not supported. Please contact the sender of this link.');
    }

    const dropMetadata = this.getDropMetadata(drop.metadata);
    let ftMetadata;
    if (drop.ft !== undefined) {
      ftMetadata = await getFTMetadata({ contractId: drop.ft.contract_id });
    }

    return {
      dropName: dropMetadata.dropName,
      wallets: dropMetadata.wallets,
      ftMetadata,
      amountTokens: drop.ft?.balance_per_use, // TODO: format correctly with FT metadata
      amountNEAR: formatNearAmount(drop.deposit_per_use, 4),
    };
  };

  getNftMetadata = async (drop: ProtocolReturnedDrop) => {
    const fcMethods = drop.fc?.methods;
    if (
      fcMethods === undefined ||
      fcMethods.length === 0 ||
      fcMethods[0] === undefined ||
      fcMethods[0][0] === undefined
    ) {
      throw new Error('Unable to retrieve function calls.');
    }

    const fcMethod = fcMethods[0][0];
    const { receiver_id: receiverId } = fcMethod;
    const { viewCall } = getEnv();

    let nftData;
    try {
      nftData = await viewCall({
        contractId: receiverId,
        methodName: 'get_series_info',
        args: { mint_id: parseInt(drop.drop_id) },
      });
    } catch (err) {
      console.error('NFT series not found');
      throw new Error('NFT series not found');
    }

    return {
      media: `${CLOUDFLARE_IPFS}/${nftData.metadata.media}`, // eslint-disable-line
      title: nftData.metadata.title,
      description: nftData.metadata.description,
    };
  };

  getNFTClaimInformation = async (contractId: string, secretKey: string) => {
    // given fc
    const drop = await this.getDropInfo({ secretKey });

    // verify if secretKey is a nft drop
    const linkdropType = await this.getLinkdropType(drop, contractId, secretKey);
    if (linkdropType !== DROP_TYPE.NFT) {
      throw new Error('This drop is not an NFT drop. Please contact your drop creator.');
    }

    const dropMetadata = this.getDropMetadata(drop.metadata);

    const nftMetadata = await this.getNftMetadata(drop); // will still throw relevant error

    return {
      dropName: dropMetadata.dropName,
      wallets: dropMetadata.wallets,
      ...nftMetadata,
    };
  };

  getTicketNftInformation = async (contractId: string, secretKey: string) => {
    const drop = await this.getDropInfo({ secretKey });

    // verify if secretKey is a ticket drop
    const linkdropType = await this.getLinkdropType(drop, contractId, secretKey);
    if (linkdropType !== DROP_TYPE.TICKET) {
      throw new Error('This drop is not a Ticket drop. Please contact your drop creator.');
    }
    const remainingUses = await this.checkTicketRemainingUses(contractId, secretKey);

    const dropMetadata = this.getDropMetadata(drop.metadata);

    const fcMethods = drop.fc?.methods;
    if (
      fcMethods === undefined ||
      fcMethods.length < 3 ||
      fcMethods[2] === undefined ||
      fcMethods[2][0] === undefined
    ) {
      throw new Error('Unable to retrieve function calls.');
    }

    const fcMethod = fcMethods[2][0];
    const { receiver_id: receiverId } = fcMethod;
    const { viewCall } = getEnv();

    let nftData;
    try {
      nftData = await viewCall({
        contractId: receiverId,
        methodName: 'get_series_info',
        args: { mint_id: parseFloat(drop.drop_id) },
      });
    } catch (err) {
      console.error('NFT series not found');
      throw new Error('NFT series not found');
    }

    return {
      remainingUses,
      dropName: dropMetadata.dropName,
      wallets: dropMetadata.wallets,
      media: `${CLOUDFLARE_IPFS}/${nftData.metadata.media}`, // eslint-disable-line
      title: nftData.metadata.title,
      description: nftData.metadata.description,
    };
  };

  claim = async (secretKey: string, walletAddress: string, skipValidation = false) => {
    if (!skipValidation) {
      await this.validateAccountId(walletAddress);
    }
    await claim({ secretKey, accountId: walletAddress });
  };
}

const keypomInstance = KeypomJS.getInstance();

export default keypomInstance;

export const KEYPOM_OPTIONS = {
  // modulesTitle: "Module Title customized",
  // mainTitle: "Main Title asdlkjasdlkdsajdlkasjdalks",
  // mainDescription: "Main Description",
  // headerOne: null,
  // headerTwo: {title: "my overloaded header title"},
  // button: {
  //   text: "Button Text",
  //   url: "https://www.google.com/"
  // },
  modules: [
    {
      name: 'FastAuth',
      description: 'FastAuth is a fast and secure way to login to your account.',
      iconUrl:
        'data:image/png;base64,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',
      baseRedirectUrl: 'https://www.amazon.ca/?ref_=nav_ya_signin&captcha_verified=1&',
    },
  ],
};

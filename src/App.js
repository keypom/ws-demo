import 'regenerator-runtime/runtime';
import React, { useState, useEffect, useRef } from 'react';
import Big from 'big.js';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import getConfig from './config.js';
import { getSelector, getAccount, viewFunction, functionCall } from './utils/wallet-selector-compat.ts';

const config = getConfig(process.env.NEAR_ENV || 'testnet');
const { networkId, contractName } = config
const SUGGESTED_DONATION = '0';
const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

const App = () => {
	const selectorRef = useRef();
	const [selector, setSelector] = useState(null);
	const [currentUser, setCurrentUser] = useState(null);
	const [messages, setMessages] = useState([]);

	const onMount = async () => {
		if (selector) return;
		const s = await getSelector({
			networkId,
			contractId: contractName,
			onAccountChange: async (accountId) => {
				console.log('account changed', accountId)
				if (accountId) {
					setCurrentUser({
						accountId,
						balance: (await (await getAccount()).getAccountBalance()).available
					})
				}
			}
		});
		selectorRef.current = s;
		setSelector(s);

		setMessages(await viewFunction({
			contractId: contractName,
			methodName: 'getMessages',
		}))
	};
	useEffect(() => {
		onMount();
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();

		const { fieldset, message, donation } = e.target.elements;

		fieldset.disabled = true;

		console.log(contractName)

		const res = await functionCall({
			contractId: contractName,
			methodName: 'addMessage',
			args: { text: message.value },
			gas: BOATLOAD_OF_GAS,
			attachedDeposit: Big(donation.value || '0').times(10 ** 24).toFixed()
		})

		setMessages(await viewFunction({
			contractId: contractName,
			methodName: 'getMessages',
		}))
	};

	const signIn = () => {
		selector?.show();
	};

	const signOut = async () => {
		await selector?.signOut().catch((err) => {
			console.log("Failed to sign out");
			console.error(err);
		});
		window.location.reload()
	};

	return (
		<main>
			<header>
				<h1>NEAR Guest Book</h1>
				{currentUser
					? <button onClick={signOut}>Log out</button>
					: <button onClick={signIn}>Log in</button>
				}
			</header>
			{currentUser
				? <Form onSubmit={onSubmit} currentUser={currentUser} />
				: <SignIn />
			}
			{!!currentUser && !!messages.length && <Messages messages={messages} />}
		</main>
	);
};

export default App;

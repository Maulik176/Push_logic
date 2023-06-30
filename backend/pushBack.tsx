import { createSocketConnection, EVENTS } from '@pushprotocol/socket';


const ethers = require('ethers');
const PK = 'your_channel_address_secret_key';
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);

const pushSDKSocket = createSocketConnection({
    user: 'eip155:5:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb', // CAIP-10 format
    env: 'staging',
    socketOptions: { autoConnect: false }
  });

  //for chat
  const pushSDKSocketChat = createSocketConnection({
    user: 'eip155:0xFd6C2fE69bE13d8bE379CCB6c9306e74193EC1A9', // Not CAIP-10 format
    env: 'staging',
    socketType: 'chat',
    socketOptions: { autoConnect: true, reconnectionAttempts: 3 }
});

//just for testing purposes
pushSDKSocket?.on(EVENTS.CONNECT, () => { console.log('connected') })
pushSDKSocket?.on(EVENTS.DISCONNECT, (err) => console.log(err));
pushSDKSocket?.on(EVENTS.CHAT_RECEIVED_MESSAGE, (message) => console.log(message))
pushSDKSocket?.on(EVENTS.USER_FEEDS, (notification) => console.log(notification))
pushSDKSocket?.on(EVENTS.USER_SPAM_FEEDS, (spam) => console.log(spam))
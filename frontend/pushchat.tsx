//initializing user
import { useWeb3React } from "@web3-react/core";
import * as PushAPI from '@pushprotocol/restapi';
const { account, library, chainId } = useWeb3React();
const signer = library.getSigner(account);



//creating the user
const user = await PushAPI.user.create({
    signer: signer, // ethers.js signer
    env: env as ENV,
  });

  //get user details
  // pre-requisite API calls that should be made before
const getUser = await PushAPI.user.get({
    account: 'eip155:0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7', //address changes
    env: 'staging'
});

// need to decrypt the encryptedPvtKey to pass in the api using helper function
const pgpDecrpyptedPvtKey = await PushAPI.chat.decryptPGPKey({
    encryptedPGPPrivateKey: user.encryptedPrivateKey,
    signer: signer,
  });

// Actual api
const response = await PushAPI.chat.chats({
    account: `eip155:0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7`,
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey,
    env: ENV.STAGING,
  })

// conversation hash are also called link inside chat messages
const conversationHash = await PushAPI.chat.conversationHash({
    account: 'eip155:0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7',
    conversationId: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d' // receiver's address or chatId of a group
  });
    
  // actual api
  const chatHistory = await PushAPI.chat.latest({
    threadhash: conversationHash.threadHash,
    account: 'eip155:0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7',
    toDecrypt: true,
    pgpPrivateKey: pgpDecrpyptedPvtKey
  });

  //sending a chat
  // actual api
const chatResponse = await PushAPI.chat.send({
    messageContent: "Societiez chat testing",
    messageType: 'Text', // can be "Text" | "Image" | "File" | "GIF" 
    receiverAddress: 'eip155:0x0F1AAC847B5720DDf01BFa07B7a8Ee641690816d',
    signer: signer,
    pgpPrivateKey: pgpDecrpyptedPvtKey
  });

  const approveResponse = await PushAPI.chat.approve({
    status: 'Approved',
    account: '0x18C0Ab0809589c423Ac9eb42897258757b6b3d3d',
    senderAddress : '0x873a538254f8162377296326BB3eDDbA7d00F8E9' // receiver's address or chatId of a group
  });

//update group details
//get group details by group name
const groupDetails = await PushAPI.chat.getGroupByName({
    groupName: "societiez Group Chat test"
  });



export interface IUser {
    did: string;
    wallets: string;
    profilePicture: string | null;
    publicKey: string;
    encryptedPrivateKey: string;
    encryptionType: string;
    signature: string;
    sigType: string;
    about: string | null;
    name: string | null;
    encryptedPassword: string | null;
    nftOwner: string | null;
    numMsg: number;
    allowedNumMsg: number;
    linkedListHash?: string | null;
    nfts?: [] | null;
}
export interface IFeeds {
    msg: IMessageIPFS;
    did: string;
    wallets: string;
    profilePicture: string | null;
    publicKey: string | null;
    about: string | null;
    threadhash: string | null;
    intent: string | null;
    intentSentBy: string | null;
    intentTimestamp: Date;
    combinedDID: string;
    cid?: string;
    chatId?: string;
    groupInformation?: GroupDTO;
}

export interface IMessageIPFS {
    fromCAIP10: string;
    toCAIP10: string;
    fromDID: string;
    toDID: string;
    messageType: string;
    messageContent: string;
    signature: string;
    sigType: string;
    link: string | null;
    timestamp?: number;
    encType: string;
    encryptedSecret: string;
}

export interface GroupDTO {
    members: {
        wallet: string;
        publicKey: string;
        isAdmin: boolean;
        image: string;
    }[];
    pendingMembers: {
        wallet: string;
        publicKey: string;
        isAdmin: boolean;
        image: string;
    }[];
    contractAddressERC20: string | null;
    numberOfERC20: number;
    contractAddressNFT: string | null;
    numberOfNFTTokens: number;
    verificationProof: string;
    groupImage: string | null;
    groupName: string;
    isPublic: boolean;
    groupDescription: string | null;
    groupCreator: string;
    chatId: string;
    scheduleAt?: Date | null;
    scheduleEnd?: Date | null;
    groupType: string;
}
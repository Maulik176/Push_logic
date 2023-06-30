import React from 'react';
import { Chat, ITheme } from '@pushprotocol/uiweb';
import { useWeb3React } from "@web3-react/core";
// import * as PushAPI from '@pushprotocol/restapi';
const { account, library, chainId } = useWeb3React();
const signer = library.getSigner(account);

export const ChatSupportTest = () => {
  const theme: ITheme = {
    bgColorPrimary: 'gray',
    bgColorSecondary: 'purple',
    textColorPrimary: 'white',
    textColorSecondary: 'green',
    btnColorPrimary: 'red',
    btnColorSecondary: 'purple',
    border: '1px solid black',
    borderRadius: '40px',
    moduleColor: 'pink',
  };
  return (
    <Chat
      account='0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7'
      supportAddress="0xFe6C8E9e25f7bcF374412c5C81B2578aC473C0F7"
      env='staging'
      signer={signer}
      theme={theme}
    />
  );
};
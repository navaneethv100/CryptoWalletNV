import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card';
import WalletAddress from './WalletAddress';

import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";



function EthWallet({mnemonic} : {mnemonic: Array<string>}) {
  const [mnemonicWords, setMnemonicWords] = useState<string>(
    mnemonic.join(' ')
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Array<string>>([]);

  const generateEtheriumWallet = async () => {
      const seed = await mnemonicToSeed(mnemonicWords);
      const derivationPath = `m/44'/60'/${currentIndex}'/0`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, wallet.address]);
  }
  return (
    <Card className='w-full mx-auto shadow-md p-4'>
      <div>
          <Button onClick={generateEtheriumWallet}>
              Add ETH Wallet
          </Button>
      </div>
      <div>
        {publicKeys.map((publicKey, keyIndex) => (
          <WalletAddress walletAddress={publicKey} key={keyIndex} />
        ))
        }
      </div>
    </Card>
    
  )
}

export default EthWallet
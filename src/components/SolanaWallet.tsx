import React, { useState } from 'react'
import { Button } from './ui/button'
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeed } from 'bip39';
import nacl from 'tweetnacl';
import { Card } from './ui/card';
import WalletAddress from './WalletAddress';


function SolanaWallet({mnemonic} : {mnemonic: Array<string>}) {
  const [mnemonicWords, setMnemonicWords] = useState<string>(
    mnemonic.join(' ')
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Array<string>>([]);

  const generateSolanaWallet = async () => {
      const seed = await mnemonicToSeed(mnemonicWords);
      const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, keypair.publicKey.toBase58()]);
  }
  return (
    <Card className='w-full mx-auto shadow-md p-4'>
      <div>
          <Button onClick={generateSolanaWallet}>
              Add SOL Wallet
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

export default SolanaWallet
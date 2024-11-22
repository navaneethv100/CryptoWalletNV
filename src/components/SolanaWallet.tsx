import React, { useState } from 'react'
import { Button } from './ui/button'
import { derivePath } from 'ed25519-hd-key';
import { Keypair } from '@solana/web3.js';
import { mnemonicToSeed } from 'bip39';
import nacl from 'tweetnacl';
import { Card } from './ui/card';
import WalletAddress from './WalletAddress';
import axios from 'axios';
import Spinner from './Spinner';

interface WalletInfo {
  address: string;
  balance: string;
}


function SolanaWallet({mnemonic} : {mnemonic: Array<string>}) {
  const [mnemonicWords, setMnemonicWords] = useState<string>(
    mnemonic.join(' ')
  );

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Array<string>>([]);

  const [walletInfos, setWalletInfos] = useState<WalletInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getSolanaBalance = async (address: string) => {
    try {
      const response = await axios.post("https://solana-mainnet.g.alchemy.com/v2/nMFnviQ8QAq2gFSie-ymlWP95myd-a_f", {
        jsonrpc: "2.0",
        method: "getBalance",
        params: [address],
        id: 1
      });
      return (response.data.result?.value/10**9).toFixed(2) || '0';
    } catch (error) {
      console.error("Error fetching Solana balance", error);
      return '0';
    }
  }

  const generateSolanaWallet = async () => {
    setIsLoading(true);
    try {
      const seed = await mnemonicToSeed(mnemonicWords);
      const derivationPath = `m/44'/501'/${currentIndex}'/0'`;
      const derivedSeed = derivePath(derivationPath, seed.toString("hex")).key;
      const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
      const keypair = Keypair.fromSecretKey(secret);

      
      const newAddress = keypair.publicKey.toBase58();
      const balance = await getSolanaBalance(newAddress);
      
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, newAddress]);
      setWalletInfos([...walletInfos, {address: newAddress, balance}]);
    } catch (error) {
      console.error("Error generating Solana wallet", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Card className='w-full mx-auto shadow-md p-4'>
      <div className="mb-4">
          <Button onClick={generateSolanaWallet} disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Add SOL Wallet'}
          </Button>
      </div>
      <div className="space-y-2">
        {walletInfos.map((walletInfo, keyIndex) => (
          <WalletAddress walletAddress={walletInfo.address} balance={walletInfo.balance} key={keyIndex} symbol='SOL' />
        ))

        }
      </div>
    </Card>
    
  )
}

export default SolanaWallet
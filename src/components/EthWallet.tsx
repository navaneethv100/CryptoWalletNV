import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card';
import WalletAddress from './WalletAddress';

import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import axios from 'axios';
import Spinner from './Spinner';

interface WalletInfo {
  address: string;
  balance: string;
}

function EthWallet({mnemonic} : {mnemonic: Array<string>}) {
  const [mnemonicWords] = useState<string>(mnemonic.join(' '));
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [publicKeys, setPublicKeys] = useState<Array<string>>([]);
  const [walletInfos, setWalletInfos] = useState<WalletInfo[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getEthereumBalance = async (address: string) => {
    try {
      const response = await axios.post("https://eth-mainnet.g.alchemy.com/v2/nMFnviQ8QAq2gFSie-ymlWP95myd-a_f", {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "eth_getBalance",
        "params": [address],
      });
      return (parseInt(response.data.result, 16)/10**18).toFixed(2) || '0';
    } catch (error) {
      console.error("Error fetching Ethereum balance", error);
      return '0';
    }
  }

  const generateEtheriumWallet = async () => {
    setIsLoading(true); 
    try{
      const seed = await mnemonicToSeed(mnemonicWords);
      const derivationPath = `m/44'/60'/${currentIndex}'/0`;
      const hdNode = HDNodeWallet.fromSeed(seed);
      const child = hdNode.derivePath(derivationPath);
      const privateKey = child.privateKey;
      const wallet = new Wallet(privateKey);
      setCurrentIndex(currentIndex + 1);
      setPublicKeys([...publicKeys, wallet.address]);

      const balance = await getEthereumBalance(wallet.address);
      setWalletInfos([...walletInfos, {address: wallet.address, balance}]);
    } catch (error) {
      console.error("Error generating Ethereum wallet", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className='w-full mx-auto shadow-md p-4'>
      <div className="mb-4">
          <Button onClick={generateEtheriumWallet} disabled={isLoading}>
              {isLoading ? <Spinner /> : 'Add ETH Wallet'}
          </Button>
      </div>
      <div className="space-y-2">
        {walletInfos.map((walletInfo, keyIndex) => (
          <WalletAddress walletAddress={walletInfo.address} balance={walletInfo.balance} key={keyIndex} symbol='ETH' />
        ))
        }
      </div>
    </Card>
    
  )
}

export default EthWallet
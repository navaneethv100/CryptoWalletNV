import { useState } from 'react'
import { Button } from './ui/button';
import { generateMnemonic } from 'bip39';
import MnemonicDisplay from './MnemonicDisplay';
import SolanaWallet from './SolanaWallet';
import EthWallet from './EthWallet';

function MainFiles() {
  const [mnemonic, setMnemonic] = useState<Array<string>>(()=>{
    const stored = localStorage.getItem('wallet-mnemonic');
    return stored ? JSON.parse(stored) : [];
  });
  const generateCustomMnemonic = async () => {
    if (mnemonic.length === 0){
      const mnGenerated = await generateMnemonic();
      const mn = mnGenerated.split(' ');
      setMnemonic(mn);
      localStorage.setItem('wallet-mnemonic', JSON.stringify(mn));
    };
  }
  
  return (
    <div className='flex flex-col items-center gap-4'>
      <div>
        <Button onClick={generateCustomMnemonic} disabled={mnemonic.length > 0}>
          {mnemonic.length > 0 ? 'Mnemonic Generated' : 'Generate Mnemonic'} 
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {
          mnemonic.map((mn, index)=> (
            <MnemonicDisplay 
              mnemonic={mn} 
              key={index}
              index={index+1} 
            />
          ))
        }
      </div>
      <div>
        <SolanaWallet mnemonic={mnemonic} />
      </div>
      <div>
        <EthWallet mnemonic={mnemonic} />
      </div>
    </div>
  )
}

export default MainFiles
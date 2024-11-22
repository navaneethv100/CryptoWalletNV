import { useState } from 'react'
import { Button } from './ui/button';
import { generateMnemonic } from 'bip39';
import MnemonicDisplay from './MnemonicDisplay';

function MainFiles() {
  const [mnemonic, setMnemonic] = useState<Array<string>>([]);
  const generateCustomMnemonic = async () => {
    const mnGenerated = await generateMnemonic();
    const mn = mnGenerated.split(' ');
    setMnemonic(mn);
  }
  
  return (
    <div className='flex flex-col items-center gap-4'>
      <div>
        <Button onClick={generateCustomMnemonic}>
          Generate Mnemonic
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
          )
          )
        }
      </div>
    </div>
  )
}

export default MainFiles
import { Card, CardContent } from './ui/card'

function MnemonicDisplay({mnemonic, index}: {mnemonic: string, index: number}) {
  return (
    <Card className='w-full max-w-md mx-auto shadow-md'>
        <CardContent className='p-2'>
            <p className='text-start break-words font-mono text-lg'>
            {index}. {mnemonic}
            </p>
        </CardContent>
    </Card>
  )
}

export default MnemonicDisplay
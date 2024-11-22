import { Avatar, AvatarFallback } from './ui/avatar'
import { Card } from './ui/card';

interface WalletAddressProps {
    walletAddress: string;
    balance? : string;
    symbol? : string;
}

function WalletAddress({walletAddress, balance = '0', symbol=''}: WalletAddressProps) {
  return (
    <Card className='p-2 my-2'>
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-2'>
          <Avatar className="w-10 h-10 bg-background border-2 border-blue-500">
            <AvatarFallback>
              {walletAddress.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <span className='text-sm text-gray-500'>Address</span>
            <span className='font-mono text-sm truncate max-w-[200px]'>
              {walletAddress}
            </span>
          </div>
        </div>
        {balance && (
          <div className='flex flex-col items-end'>
            <span className='text-sm text-gray-500'>Balance</span>
            <span className='font-bold'>
              {balance} {symbol}
            </span>
          </div>
        )}
      </div>
    </Card>

  )
}

export default WalletAddress
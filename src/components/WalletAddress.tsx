import { Avatar, AvatarFallback } from './ui/avatar'

function WalletAddress({walletAddress}: {walletAddress: string}) {
  return (
    <div className='flex items-center gap-2 p-2 border-blue-500 rounded-md'>
        <Avatar className='w-10 h-10 bg-background border-2 border-blue-500'>
            <AvatarFallback>
                {walletAddress.slice(0, 2)}
            </AvatarFallback>
        </Avatar>
        <div>
            {walletAddress}
        </div>
    </div>
  )
}

export default WalletAddress
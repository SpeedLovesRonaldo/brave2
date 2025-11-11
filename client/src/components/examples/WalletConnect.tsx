import WalletConnect from '../WalletConnect';
import { Toaster } from '@/components/ui/toaster';

export default function WalletConnectExample() {
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <WalletConnect score={7} />
      </div>
      <Toaster />
    </>
  );
}

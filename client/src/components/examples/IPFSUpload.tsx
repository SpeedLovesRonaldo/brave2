import IPFSUpload from '../IPFSUpload';
import { Toaster } from '@/components/ui/toaster';

export default function IPFSUploadExample() {
  return (
    <>
      <div className="max-w-2xl mx-auto p-6">
        <IPFSUpload score={7} resultTitle="Brave Legend" />
      </div>
      <Toaster />
    </>
  );
}

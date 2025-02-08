'use client';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import { UploadDropzone } from '@/lib/uploadthing';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string, name?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  endpoint,
}) => {
  return (
    <UploadDropzone
      appearance={{
        label: { color: '#002D62' },
        uploadIcon: { color: '#002D62', blockSize: '80px' },
        button: { color: '#002D62', fontSize: '14px' },
      }}
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        if (!res) return;
        onChange(res[0].url, res[0].name);
      }}
      onUploadError={(err: Error) => {
        toast.error(err.message || 'Upload failed');
      }}
    />
  );
};

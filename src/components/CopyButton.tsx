'use client';

import { Button } from '@/components/ui/Button';
import { toast } from '@/components/ui/Toast';
import { Copy } from 'lucide-react';
import { FC, ButtonHTMLAttributes } from 'react';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  valueToCopy: string;
}

const CopyButton: FC<CopyButtonProps> = ({
  valueToCopy,
  className,
  ...props
}) => {
  return (
    <Button
      {...props}
      onClick={() => {
        navigator.clipboard.writeText(valueToCopy);

        toast({
          title: 'Copied!',
          message: 'Api key copied to clipboard',
          type: 'success',
        });
      }}
      variant='ghost'
      className={className}
    >
      <Copy className='w-5 h-5' />
    </Button>
  );
};

export default CopyButton;

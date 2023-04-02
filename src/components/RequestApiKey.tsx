'use client';

import CopyButton from '@/components/CopyButton';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import LargeHeading from '@/components/ui/LargeHeading';
import Paragraph from '@/components/ui/Paragraph';
import { toast } from '@/components/ui/Toast';
import { createApiKey } from '@/helpers/create-api-key';
import { Key } from 'lucide-react';
import { FC, FormEvent, useState } from 'react';

const RequestApiKey: FC = ({}) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string | null>(null);

  const createNewApiKey = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsCreating(true);

    try {
      const generateApiKey = await createApiKey();
      setApiKey(generateApiKey);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          message: error.message,
          type: 'error',
        });

        return;
      }

      toast({
        title: 'Error',
        message: 'Something went wrong',
        type: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className='container md:max-w-2xl'>
      <div className='flex flex-col items-center gap-6'>
        <Key className='w-12 h-12 mx-auto text-gray-400' />
        <LargeHeading>Request your API Key</LargeHeading>
        <Paragraph>You have&apos;t requested an API key yet.</Paragraph>
      </div>

      <form
        onSubmit={createNewApiKey}
        className='mt-6 sm:flex sm:items-center'
        action='#'
      >
        <div className='relative rounded-md shadow-sm sm:min-w-0 sm:flex-1'>
          {apiKey ? (
            <CopyButton
              type='button'
              valueToCopy={apiKey}
              className='absolute right-0 duration-300 animate-in fade-in'
            />
          ) : null}
          <Input
            readOnly
            value={apiKey ?? ''}
            placeholder='Request an API key to display it here!'
          />
        </div>
        <div className='flex justify-center mt-3 sm:mt-0 sm:ml-4 sm:flex-shrink-0'>
          <Button disabled={!!apiKey} isLoading={isCreating}>
            Request key
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RequestApiKey;

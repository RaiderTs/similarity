import { ThemeToggle } from '@/components/ThemeToggle';
import { buttonVariants } from '@/components/ui/Button';
import SignInButton from '@/components/SignInButton';
import SignOutButton from '@/components/SignOutButton';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { FC } from 'react';
import { authOptions } from '../lib/auth';

interface NavbarProps {}

const Navbar = async ({}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed top-0 left-0 right-0 z-50 flex justify-between h-20 border-b shadow-sm backdrop-blur-sm bg-white/75 dark:bg-slate-900 border-slate-300 dark:border-slate-700 item-center'>
      <div className='container flex items-center justify-between w-full mx-auto max-w-7xl'>
        <Link href={'/'} className={buttonVariants({ variant: 'link' })}>
          Text Similarity 1.0
        </Link>

        <div className='md:hidden'>
          <ThemeToggle />
        </div>

        <div className='hidden gap-4 md:flex'>
          <ThemeToggle />
          <Link
            href={'/documentation'}
            className={buttonVariants({ variant: 'ghost' })}
          >
            Documentation
          </Link>

          {session ? (
            <>
              <Link
                href={'/dashboard'}
                className={buttonVariants({ variant: 'ghost' })}
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <SignInButton />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

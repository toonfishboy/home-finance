import Link from 'next/link';
import { FC, PropsWithChildren } from 'react';
import { GiCash } from 'react-icons/gi';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="grid h-screen grid-rows-[auto_1fr] bg-gray-900 text-white">
        <nav className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-900 to-blue-900 p-1">
          <GiCash className="mr-8 h-10 w-10" />
          <div className="flex gap-4">
            <Link href={'/transactions'} className="text-xl">
              Transactions
            </Link>
            <Link href={'/income'} className="text-xl">
              Income
            </Link>
            <Link href={'/costs'} className="text-xl">
              Costs
            </Link>
          </div>
        </nav>
        <section className="flex grow flex-col overflow-auto">{children}</section>
      </main>
    </>
  );
};

export default Layout;

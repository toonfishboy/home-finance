import { FC, PropsWithChildren } from 'react';
import { GiCash } from 'react-icons/gi';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <main className="grid h-screen grid-rows-[auto_1fr] bg-gradient-to-br from-slate-900  to-slate-800 text-white">
        <nav className="flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-900 to-blue-900 p-1">
          <GiCash className="h-10 w-10" />
          <h1 className="text-xl">Home Finance</h1>
        </nav>
        <section className="flex grow flex-col overflow-auto">{children}</section>
      </main>
    </>
  );
};

export default Layout;

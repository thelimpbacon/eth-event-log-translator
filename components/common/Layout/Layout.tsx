import React, { ReactNode } from "react";
import { useEagerConnect, useInactiveListener } from "@lib/hooks";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  return (
    <div className="bg-[#111827]">
      <main className="px-8 py-8 lg:py-14">{children}</main>
    </div>
  );
};

export default Layout;

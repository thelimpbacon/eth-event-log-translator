import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="bg-[#000611]">
      <main className="px-8 py-8 mb-auto lg:py-14">{children}</main>
    </div>
  );
};

export default Layout;

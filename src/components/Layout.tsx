import React from "react";

interface LayoutProps {}

/**
 * Layout component for the page layout
 */

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return <main>{children}</main>;
};

export default Layout;

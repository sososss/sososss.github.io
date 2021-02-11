import * as React from 'react';

import './layout.scss';

interface LayoutPropsType {
  children: React.ReactNode
}

const Layout = (props: LayoutPropsType) => {
  const { children } = props;

  return (
    <>
      <div id="layout">
        <div id="content">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout;

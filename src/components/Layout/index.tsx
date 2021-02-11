import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './layout.scss';

import Header from '../Header';

interface LayoutPropsType {
  children: React.ReactNode
}

const Layout = (props: LayoutPropsType) => {
  const { children } = props;

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          author
          title
          siteUrl
        }
      }
    }
  `);

  const siteMetadata = data.site.siteMetadata;

  return (
    <>
      <div id="layout">

        <div id="content">
          <Header siteTitle={siteMetadata.title} />
          <main>{children}</main>
          <footer>
            <span>{`Copyright ⓒ `}</span>
            <a href={siteMetadata.siteUrl}>{siteMetadata.author}.</a>
            <span>{` All rights reserved. | Built with `}</span>
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Layout;

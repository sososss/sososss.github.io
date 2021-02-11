import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import './layout.scss';

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
          <main>{children}</main>
          <footer>
            <span>{`@ ${new Date().getFullYear()} ${siteMetadata.author} | Theme by `}</span>
            <a href={siteMetadata.siteUrl}>{siteMetadata.author}</a>
            <span>{` | Built with `}</span>
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Layout;

import * as React from 'react';
import {} from 'react';
import { Link } from 'gatsby';

import './header.scss';

interface HeaderPropsType {
  siteTitle: string;
}

const Header = (props: HeaderPropsType) => {
  const { siteTitle } = props;

  return (
    <header id="header">
      <div className="header-title">
        <Link to="/">
          <div className="header-profile-image-wrap">
          </div>
        </Link>
        <Link to="/">
          <h1 className="header-title-text">{siteTitle}</h1>
        </Link>
      </div>
      <nav id="nav">
      </nav>
    </header>
  )
};

export default Header;

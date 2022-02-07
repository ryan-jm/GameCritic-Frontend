import { EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSectionItem } from '@elastic/eui';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo>GameCritic</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="Navigation links">
          <Link to="/">
            <EuiHeaderLink isActive={location.pathname === '/'}>
              Home
            </EuiHeaderLink>
          </Link>

          <Link to="/reviews">
            <EuiHeaderLink isActive={location.pathname.startsWith('/reviews')}>
              Reviews
            </EuiHeaderLink>
          </Link>
          <EuiHeaderLink isActive={location.pathname.startsWith('/categories')}>
            Categories
          </EuiHeaderLink>
        </EuiHeaderLinks>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};

export default Navbar;

// location.pathname === '/'
// isActive={location.pathname.startsWith('/reviews')}

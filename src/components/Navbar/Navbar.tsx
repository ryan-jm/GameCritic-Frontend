import { EuiButton, EuiHeader, EuiHeaderLogo, EuiHeaderSection, EuiHeaderSectionItem } from '@elastic/eui';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../../stores/AuthContext';
import AppMenu from './AppMenu';
import UserMenu from './UserMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSectionItem border="right">
        <Link to="/">
          <EuiHeaderLogo iconType="dashboardApp">GameCritic</EuiHeaderLogo>
        </Link>
      </EuiHeaderSectionItem>

      <EuiHeaderSection side="right">
        {user ? (
          <>
            <EuiHeaderSectionItem>
              <UserMenu />
            </EuiHeaderSectionItem>
            <EuiHeaderSectionItem>
              <AppMenu />
            </EuiHeaderSectionItem>
          </>
        ) : (
          <EuiHeaderSectionItem>
            <EuiButton
              color="accent"
              size="s"
              onClick={() => navigate('/login')}
            >
              Login
            </EuiButton>
          </EuiHeaderSectionItem>
        )}
      </EuiHeaderSection>
    </EuiHeader>
  );
};

export default Navbar;

// location.pathname === '/'
// isActive={location.pathname.startsWith('/reviews')}

import { EuiButton, EuiHeader, EuiHeaderLink, EuiHeaderLinks, EuiHeaderLogo, EuiHeaderSectionItem } from '@elastic/eui';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../../stores/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  React.useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <EuiHeader position="fixed">
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo iconType="dashboardApp">GameCritic</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        {user ? (
          <EuiHeaderLinks aria-label="Navigation links">
            <Link to="/">
              <EuiHeaderLink isActive={location.pathname === '/'}>
                Home
              </EuiHeaderLink>
            </Link>

            <Link to="/reviews">
              <EuiHeaderLink
                isActive={location.pathname.startsWith('/reviews')}
              >
                Reviews
              </EuiHeaderLink>
            </Link>
            <EuiHeaderLink
              isActive={location.pathname.startsWith('/categories')}
            >
              Categories
            </EuiHeaderLink>
          </EuiHeaderLinks>
        ) : (
          <EuiButton color="accent" size="s" onClick={() => navigate('/login')}>
            Login
          </EuiButton>
        )}
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};

export default Navbar;

// location.pathname === '/'
// isActive={location.pathname.startsWith('/reviews')}

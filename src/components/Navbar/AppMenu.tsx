import {
  EuiHeaderSectionItemButton,
  EuiIcon,
  EuiKeyPadMenu,
  EuiKeyPadMenuItem,
  EuiPopover,
  useGeneratedHtmlId,
} from '@elastic/eui';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AppMenu = () => {
  const headerAppPopoverId = useGeneratedHtmlId({ prefix: 'headerAppPopover' });
  const headerAppKeyPadMenuId = useGeneratedHtmlId({
    prefix: 'headerAppKeyPadMenu',
  });
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const button = (
    <EuiHeaderSectionItemButton
      aria-controls={headerAppKeyPadMenuId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="App Menu"
      onClick={onMenuButtonClick}
    >
      <EuiIcon type="apps" size="l" />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerAppPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
    >
      <EuiKeyPadMenu id={headerAppKeyPadMenuId} style={{ width: 288 }}>
        <EuiKeyPadMenuItem
          label="Reviews"
          isSelected={location.pathname.endsWith('/reviews')}
          onClick={() => navigate('/reviews')}
        >
          <EuiIcon type="discoverApp" size="xl" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem
          label="Dashboard"
          isSelected={
            location.pathname.endsWith('/') || location.pathname.endsWith('/dashboard')
          }
          onClick={() => navigate('/dashboard')}
        >
          <EuiIcon type="dashboardApp" size="xl" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem
          label="Categories"
          isSelected={location.pathname.startsWith('/categories')}
          onClick={() => navigate('/categories')}
        >
          <EuiIcon type="spacesApp" size="xl" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem
          label="Search"
          isDisabled
          betaBadgeLabel="Coming soon!"
          betaBadgeIconType="visVega"
          betaBadgeTooltipContent={
            <p>The search feature is currently under construction.</p>
          }
        >
          <EuiIcon type="searchProfilerApp" size="xl" />
        </EuiKeyPadMenuItem>
      </EuiKeyPadMenu>
    </EuiPopover>
  );
};

export default AppMenu;

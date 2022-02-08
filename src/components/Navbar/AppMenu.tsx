import {
    EuiHeaderSectionItemButton,
    EuiIcon,
    EuiKeyPadMenu,
    EuiKeyPadMenuItem,
    EuiPopover,
    useGeneratedHtmlId,
} from '@elastic/eui';
import { useState } from 'react';

const AppMenu = () => {
  const headerAppPopoverId = useGeneratedHtmlId({ prefix: 'headerAppPopover' });
  const headerAppKeyPadMenuId = useGeneratedHtmlId({
    prefix: 'headerAppKeyPadMenu',
  });

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
      <EuiIcon type="apps" size="m" />
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
        <EuiKeyPadMenuItem label="Reviews">
          <EuiIcon type="discoverApp" size="xl" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Dashboard">
          <EuiIcon type="dashboardApp" size="xl" />
        </EuiKeyPadMenuItem>

        <EuiKeyPadMenuItem label="Favourites">
          <EuiIcon type="heartbeatApp" size="xl" />
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

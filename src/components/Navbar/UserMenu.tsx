import {
    EuiAvatar,
    EuiFlexGroup,
    EuiFlexItem,
    EuiHeaderSectionItemButton,
    EuiLink,
    EuiPopover,
    EuiSpacer,
    EuiText,
    useGeneratedHtmlId,
} from '@elastic/eui';
import { useState } from 'react';

import { useAuth } from '../../stores/AuthContext';

const UserMenu = () => {
  const { user } = useAuth();

  const headerUserPopoverId = useGeneratedHtmlId({
    prefix: 'headerUserPopover',
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
      aria-controls={headerUserPopoverId}
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-label="Account menu"
      onClick={onMenuButtonClick}
    >
      <EuiAvatar
        name={user?.name ?? ''}
        size="s"
        imageUrl={user?.avatar_url ?? ''}
      />
    </EuiHeaderSectionItemButton>
  );

  return (
    <EuiPopover
      id={headerUserPopoverId}
      button={button}
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="none"
    >
      <div style={{ width: 320 }}>
        <EuiFlexGroup
          gutterSize="m"
          className="euiHeaderProfile"
          responsive={false}
        >
          <EuiFlexItem grow={false}>
            <EuiAvatar
              name={user?.name ?? ''}
              size="xl"
              imageUrl={user?.avatar_url ?? ''}
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiText>
              <p>{user?.name}</p>
            </EuiText>

            <EuiSpacer size="m" />

            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFlexGroup justifyContent="spaceBetween">
                  <p></p>

                  <EuiFlexItem grow={false}>
                    <EuiLink>Log out</EuiLink>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </EuiPopover>
  );
};

export default UserMenu;

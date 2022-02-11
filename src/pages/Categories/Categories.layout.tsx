import { EuiFlexGrid, EuiPageTemplate } from '@elastic/eui';
import React from 'react';

const Layout = (props: {
  children:
    | boolean
    | React.ReactChild
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
}) => {
  return (
    <EuiPageTemplate restrictWidth={true} template="empty" style={{ marginTop: '4rem' }}>
      <EuiFlexGrid columns={3}>{props.children}</EuiFlexGrid>
    </EuiPageTemplate>
  );
};

export default Layout;

import * as React from 'react';

export interface AnchorNavigationProps {
  children?: React.ReactNode;
  /** The AnchorNavigationItems components to be rendered in the sticky navigation */
  stickyNavigation?: React.ReactNode;
}

declare const AnchorNavigation: React.FunctionComponent<AnchorNavigationProps>;
export default AnchorNavigation;

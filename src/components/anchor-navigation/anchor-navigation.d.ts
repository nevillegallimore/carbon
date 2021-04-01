import * as React from "react";
import { AnchorNavigationItemProps } from "./anchor-navigation-item";

export interface AnchorNavigationProps {
  children?: React.ReactNode;
  /** The AnchorNavigationItems components to be rendered in the sticky navigation */
  stickyNavigation?: React.ReactElement<AnchorNavigationItemProps>;
  /** Allows to override existing component styles */
  styleOverride?: {
    root?: () => object | object;
    navigation?: () => object | object;
    content?: () => object | object;
  };
}

declare function AnchorNavigation(props: AnchorNavigationProps): JSX.Element;

export default AnchorNavigation;

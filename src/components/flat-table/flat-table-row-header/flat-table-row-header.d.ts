import * as React from 'react';
import { SpacingProps } from '../../../utils/helpers/options-helper';

export interface FlatTableRowHeaderProps extends SpacingProps {
  /** Content alignment */
  align?: string;
  children?: React.ReactNode | string;
   /** Column width, pass a number to set a fixed width in pixels */
   width?: number;
   /** Truncate the cell content if it overflows the  */
   truncate?: boolean;
   /** Title text to display if cell content truncates */
   title?: string;
}

declare const FlatTableRowHeader: React.FunctionComponent<FlatTableRowHeaderProps>;

export default FlatTableRowHeader;

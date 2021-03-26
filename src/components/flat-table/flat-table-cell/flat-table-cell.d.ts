import * as React from "react";
import { SpacingProps } from "../../../utils/helpers/options-helper";

export interface FlatTableCellProps extends SpacingProps {
  /** Content alignment */
  align?: "center" | "left" | "right";
  children?: React.ReactNode | string;
  /** Number of columns that a cell should span */
  colspan?: number | string;
  /** Number of rows that a cell should span */
  rowspan?: number | string;
}

declare function FlatTableCell(props: FlatTableCellProps): JSX.Element;

export default FlatTableCell;

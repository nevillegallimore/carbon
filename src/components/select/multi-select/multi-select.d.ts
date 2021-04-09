import * as React from "react";
import { SpacingProps } from "utils/helpers/options-helper/options-helper";
import { OptionProps } from "../option";
import { OptionRowProps } from "../option-row";
import { OptionGroupHeaderProps } from "../option-group-header";
import { SelectTextboxProps } from "../select-textbox/select-textbox";

type SelectListChild = React.ReactElement<OptionProps | OptionRowProps | OptionGroupHeaderProps>;

export interface MultiSelectProps extends SelectTextboxProps, SpacingProps {
  /** Child components (such as Option or OptionRow) for the SelectList */
  children: SelectListChild[] | SelectListChild;
  /** The default selected value(s), when the component is operating in uncontrolled mode */
  defaultValue?: string[] | object[];
  /** Boolean to toggle where SelectList is rendered in relation to the Select Input */
  disablePortal?: boolean;
  /** If true the loader animation is displayed in the option list */
  isLoading?: boolean;
  /** When true component will work in multi column mode.
   * Children should consist of OptionRow components in this mode
   */
  multiColumn?: boolean;
  /** A custom message to be displayed when any option does not match the filter text */
  noResultsMessage?: string;
  /** A custom callback for when the dropdown menu opens */
  onOpen?: () => void;
  /** If true the Component opens on focus */
  openOnFocus?: boolean;
  /** SelectList table header, should consist of multiple th elements.
   * Works only in multiColumn mode
   */
  tableHeader?: React.ReactNode;
  /** The selected value(s), when the component is operating in controlled mode */
  value?: string[] | object[];
}

declare const MultiSelect: React.ComponentType<MultiSelectProps>;

export default MultiSelect;

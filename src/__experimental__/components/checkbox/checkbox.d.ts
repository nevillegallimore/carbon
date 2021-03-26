import * as React from "react";
import { SpacingProps } from "../../../utils/helpers/options-helper";
import { CommonCheckableInputProps } from "../../../__internal__/checkable-input";

export interface CheckboxProps extends CommonCheckableInputProps, SpacingProps {
  /** Breakpoint for adaptive label (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLabelBreakpoint?: number;
  /** If true the Component will be focused when rendered */
  autoFocus?: boolean;
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** A message that the Help component will display */
  labelHelp?: string | React.ReactNode;
  /** Size of the checkbox */
  size?: "small" | "large";
  /** The value of the checkbox, passed on form submit */
  value?: string;
}

declare function Checkbox(props: CheckboxProps): JSX.Element;

export { Checkbox };

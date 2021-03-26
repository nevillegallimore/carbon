import * as React from "react";
import {
  AlignBinaryType,
  SizesType,
} from "../../../utils/helpers/options-helper/options-helper";
import { MarginSpacingProps } from "../../../utils/helpers/options-helper";
import { CommonCheckableInputProps } from "../../../__internal__/checkable-input";

export interface RadioButtonProps extends CommonCheckableInputProps, MarginSpacingProps {
  /** Unique Identifier for the input. Will use a randomly generated GUID if none is provided */
  id?: string;
  /** When true, sets the component in line (for RadioButtonGroup) */
  inline?: boolean;
  /** Text alignment of the label */
  labelAlign?: "left" | "right";
  /** The name of the the RadioButton (can also be set via the 'name' prop of the RadioButtonGroup component) */
  name?: string;
  /**
   * Set the size of the radio button to 'small' (16x16 - default) or 'large' (24x24).
   */
  size?: SizesType;
  /** the value of the Radio Button, passed on form submit */
  value: string;
}

declare function RadioButton(props: RadioButtonProps): JSX.Element;

export { RadioButton };

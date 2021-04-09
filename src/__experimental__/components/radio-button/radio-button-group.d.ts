import * as React from "react";
import ValidationPropTypes from "components/validations";
import { MarginSpacingProps } from "../../../utils/helpers/options-helper";
import { RadioButtonProps } from "./radio-button";

export interface RadioButtonGroupProps extends ValidationPropTypes, MarginSpacingProps {
  /** Breakpoint for adaptive legend (inline labels change to top aligned). Enables the adaptive behaviour when set */
  adaptiveLegendBreakpoint?: number;
  /** Breakpoint for adaptive spacing (left margin changes to 0). Enables the adaptive behaviour when set */
  adaptiveSpacingBreakpoint?: number;
  /** The RadioButton objects to be rendered in the group */
  children: Array<React.ReactElement<RadioButtonProps>>;
  /** When true, RadioButtons are in line */
  inline?: boolean;
  /** Spacing between labels and radio buttons, given number will be multiplied by base spacing unit (8) */
  labelSpacing?: 1 | 2;
  /** The content for the RadioGroup Legend */
  legend?: string;
  /** Text alignment of legend when inline */
  legendAlign?: "left" | "right";
  /** When true, legend is placed in line with the radiobuttons */
  legendInline?: boolean;
  /** Spacing between legend and field for inline legend, number multiplied by base spacing unit (8) */
  legendSpacing?: 1 | 2;
  /** Percentage width of legend (only when legend is inline)  */
  legendWidth?: number;
  /** Specifies the name prop to be applied to each button in the group */
  name: string;
  /** Callback fired when each RadioButton is blurred */
  onBlur?: (ev: React.SyntheticEvent) => void;
  /** Callback fired when the user selects a RadioButton */
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  /** Flag to configure component as mandatory */
  required?: boolean;
  /** value of the selected RadioButton */
  value?: string;
  /** Allows to override existing component styles */
  styleOverride?: {
    root?: object;
    content?: object;
    legend?: object;
  };
}

declare const RadioButtonGroup: React.FunctionComponent<RadioButtonGroupProps>;

export default RadioButtonGroup;

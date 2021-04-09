import * as React from "react";
import { IconProps } from "../icon/icon";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface InlineInputsProps extends OptionsHelper.MarginSpacingProps {
  /** Size of the loader. */
  size?: OptionsHelper.SizesType;
  /** Applies white color. */
  isInsideButton?: boolean;
  /** Applies slate color. Available only when isInsideButton is true. */
  isActive?: boolean;
}

declare function InlineInputs(props: InlineInputsProps): JSX.Element;

export default InlineInputs;

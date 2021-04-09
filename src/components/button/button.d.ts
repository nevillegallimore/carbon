import * as React from "react";
import { SpacingProps } from "../../utils/helpers/options-helper";
import {
  IconTypes,
  ButtonTypes,
} from "../../utils/helpers/options-helper/options-helper";

export interface ButtonProps extends SpacingProps {
  /** Prop to specify the aria-label text.
   *  Only to be used in Button when only an icon is rendered.
   * This is required to comply with WCAG 4.1.2 - Buttons must have discernible text
   */
  "aria-label"?: string;
  /** [Legacy] Button types for legacy theme: "primary" | "secondary" */
  as?: ButtonTypes;
  /** Color variants for new business themes: "primary" | "secondary" | "tertiary" | "darkBackground" */
  buttonType?: ButtonTypes;
  /** The text the button displays */
  children?: React.ReactNode;
  /** Apply disabled state to the button */
  disabled?: boolean;
  /** Apply destructive style to the button */
  destructive?: boolean;
  /** Ref to be forwarded */
  forwardRef?: React.Ref<HTMLButtonElement>;
  /** Apply fullWidth style to the button */
  fullWidth?: boolean;
  /** Used to transform button into anchor */
  href?: string;
  /** Defines an Icon position related to the children: "before" | "after" */
  iconPosition?: "before" | "after";
  /** Provides a tooltip message when the icon is hovered. */
  iconTooltipMessage?: string;
  /** Provides positioning when the tooltip is displayed. */
  iconTooltipPosition?: string;
  /** Defines an Icon type within the button */
  iconType?: IconTypes;
  /** If provided, the text inside a button will not wrap */
  noWrap?: boolean;
  /** Assigns a size to the button: "small" | "medium" | "large" */
  size?: "small" | "medium" | "large";
  /** Second text child, renders under main text, only when size is "large" */
  subtext?: string;
}

declare function Button(props: ButtonProps): JSX.Element;
declare function ButtonWithForwardRef(
  props: ButtonProps &
    React.RefAttributes<HTMLButtonElement> &
    React.HTMLProps<HTMLButtonElement>
): JSX.Element;

export { ButtonWithForwardRef };
export default Button;

import * as React from "react";
import { MarginSpacingProps } from "../../utils/helpers/options-helper/options-helper";
import { IconProps } from "../icon/icon";

export interface IconButtonProps extends MarginSpacingProps {
  /** Optional: alternative rendered content, displayed within <SelectList> of <Select> (eg: an icon, an image, etc) */
  children: React.ReactElement<IconProps>;
  /** Callback */
  onAction: React.MouseEventHandler<HTMLButtonElement>;
}

declare function IconButton(props: IconButtonProps & React.RefAttributes<HTMLLIElement>): JSX.Element;

export default IconButton;

import * as React from "react";

export interface AdvancedColorPickerPropTypes {
  /** Prop for `availableColors` containing array of objects of colors */
  availableColors: [];
  /** Prop for `defaultColor` containing the default color for `uncontrolled` use */
  defaultColor: string;
  /** Specifies the name prop to be applied to each color in the group */
  name: string;
  /** Prop for `onBlur` event */
  onBlur?: (ev: React.SyntheticEvent<HTMLElement>) => void;
  /** Prop for `onChange` event */
  onChange?: (ev: React.ChangeEvent<HTMLElement>) => void;
  /** Prop for `onClose` event */
  onClose?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `onOpen` event */
  onOpen?: (ev: React.MouseEvent<HTMLElement>) => void;
  /** Prop for `open` status */
  open?: boolean;
  /** Prop for `selectedColor` containing pre-selected color for `controlled` use */
  selectedColor?: string;
}

declare function AdvancedColorPicker(props: AdvancedColorPickerPropTypes): JSX.Element;

export default AdvancedColorPicker;

import * as React from "react";
import { TextboxProps } from "../textbox";

export interface GroupedCharacterProps extends TextboxProps {
  /** Default input value if component is meant to be used as an uncontrolled component */
  defaultValue?: string;
  /** pattern by which input value should be grouped */
  groups?: any[];
  /** character to be used as separator - has to be a 1 character string */
  separator?: string;

}

declare function GroupedCharacter(props: GroupedCharacterProps): JSX.Element;

export default GroupedCharacter;

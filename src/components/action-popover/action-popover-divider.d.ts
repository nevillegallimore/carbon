import { StyledComponentProps } from "styled-components";

export interface ActionPopoverDividerProps {
  /** @default "anchor-navigation-divider" */
  "data-element"?: string;
}

declare function ActionPopoverDivider(
  attrs: StyledComponentProps<"div", {}, ActionPopoverDividerProps, "">
): JSX.Element;

export default ActionPopoverDivider;

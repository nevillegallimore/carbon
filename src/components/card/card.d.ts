import * as React from "react";
import * as OptionsHelper from "../../utils/helpers/options-helper/options-helper";

export interface BatchSelectionProps {
  /** action to be executed when card is clicked or enter pressed */
  action?: (ev: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  /** style value for width of card */
  cardWidth?: string;
  /** flag to indicate if card is interactive */
  interactive?: boolean;
  /** flag to indicate if card is draggable */
  draggable?: boolean;
  /** size of card for applying padding (small | medium | large) */
  spacing: OptionsHelper.SizesRestricted;
  dataRole?: string;
}

declare function BatchSelection(props: BatchSelectionProps): JSX.Element;

export default BatchSelection;

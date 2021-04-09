import * as React from "react";
import { ModalProps } from "../modal/modal";

export interface DialogProps extends ModalProps {
  /* Disables auto focus functionality on child elements */
  disableAutoFocus?: boolean;
  /* Disables the focus trap when the dialog is open */
  disableFocusTrap?: boolean;
  /* Function or reference to first element to focus */
  focusFirstElement: () => void;
  /** Allows developers to specify a specific height for the dialog. */
  height?: string;
  /** Determines if the close icon is shown */
  showCloseIcon?: boolean;
  /** Size of dialog, default size is 750px */
  size?: string;
  /** Subtitle displayed at top of dialog */
  subtitle?: string;
  /** Title displayed at top of dialog */
  title: string | object;
}

declare class Dialog extends React.Component<DialogProps> {}

export default Dialog;

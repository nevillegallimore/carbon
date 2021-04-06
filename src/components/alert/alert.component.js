import React from "react";
import PropTypes from "prop-types";

import Dialog from "../dialog";

const Alert = ({ children, ...rest }) => (
  <Dialog data-component="alert" {...rest}>
    {children}
  </Dialog>
);

Alert.propTypes = {
  /** The ARIA role to be applied to the Dialog */
  ariaRole: PropTypes.string,
  /** Alert content */
  children: PropTypes.node,
  /** Controls the open state of the component */
  open: PropTypes.bool,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the Alert */
  disableEscKey: PropTypes.bool,
  /** Allows developers to specify a specific height for the dialog. */
  height: PropTypes.string,
  /** Title displayed at top of Alert */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Subtitle displayed at top of Alert */
  subtitle: PropTypes.string,
  /** Size of Alert */
  size: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /* Function or reference to first element to focus */
  focusFirstElement: PropTypes.func,
  /* Disables auto focus functionality on child elements */
  disableAutoFocus: PropTypes.bool,
};

Alert.defaultProps = {
  ariaRole: "alertdialog",
  size: "extra-small",
};

export default Alert;

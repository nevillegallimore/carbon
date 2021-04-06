import React, {
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useState,
} from "react";
import PropTypes from "prop-types";

import Modal from "../modal";
import Heading from "../heading";
import ElementResize from "../../utils/helpers/element-resize";
import {
  DialogStyle,
  DialogTitleStyle,
  DialogContentStyle,
  DialogInnerContentStyle,
} from "./dialog.style";
import FocusTrap from "../../__internal__/focus-trap";
import IconButton from "../icon-button";
import Icon from "../icon";

const contentBottomPadding = 30;
const TIMEOUT = 500;

const Dialog = ({
  children,
  open,
  height,
  size,
  ariaRole,
  title,
  disableEscKey,
  subtitle,
  disableAutoFocus,
  focusFirstElement,
  onCancel,
  showCloseIcon,
  bespokeFocusTrap,
  disableClose,
  ...rest
}) => {
  const [fixedBottom, setFixedBottom] = useState(false);

  const dialogRef = useRef();
  const innerContentRef = useRef();
  const titleRef = useRef();
  const listenersAdded = useRef(false);

  const shouldHaveFixedBottom = () => {
    const contentHeight =
      innerContentRef.current.offsetHeight +
      innerContentRef.current.offsetTop +
      contentBottomPadding;

    const windowHeight = window.innerHeight - dialogRef.current.offsetTop;

    return contentHeight > windowHeight;
  };

  const applyFixedBottom = useCallback(() => {
    if (shouldHaveFixedBottom()) {
      setFixedBottom(true);
    }
    if (!shouldHaveFixedBottom()) {
      setFixedBottom(false);
    }
  }, []);

  const centerDialog = useCallback(() => {
    const {
      width: dialogWidth,
      height: dialogHeight,
    } = dialogRef.current.getBoundingClientRect();

    let midPointY = window.innerHeight / 2;
    let midPointX = window.innerWidth / 2;

    midPointY -= dialogHeight / 2;
    midPointX -= dialogWidth / 2;

    if (midPointY < 20) {
      midPointY = 20;
    }

    if (midPointX < 20) {
      midPointX = 20;
    }

    dialogRef.current.style.top = `${midPointY}px`;
    dialogRef.current.style.left = `${midPointX}px`;
  }, []);

  const addListeners = useCallback(() => {
    /* istanbul ignore else */
    if (!listenersAdded.current) {
      ElementResize.addListener(innerContentRef.current, applyFixedBottom);
      ElementResize.addListener(innerContentRef.current, centerDialog);

      window.addEventListener("resize", applyFixedBottom);
      window.addEventListener("resize", centerDialog);

      listenersAdded.current = true;
    }
  }, [applyFixedBottom, centerDialog]);

  const removeListeners = useCallback(() => {
    if (listenersAdded.current) {
      ElementResize.removeListener(innerContentRef.current, applyFixedBottom);
      ElementResize.removeListener(innerContentRef.current, centerDialog);

      window.removeEventListener("resize", applyFixedBottom);
      window.removeEventListener("resize", centerDialog);

      listenersAdded.current = false;
    }
  }, [applyFixedBottom, centerDialog]);

  useEffect(() => {
    if (open) {
      addListeners();
    }

    if (!open) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [open, addListeners, removeListeners]);

  useLayoutEffect(() => {
    if (open) {
      centerDialog();
      setTimeout(() => {
        applyFixedBottom();
      }, TIMEOUT + 10);
    } else {
      setFixedBottom(false);
    }
  }, [applyFixedBottom, centerDialog, open]);

  const closeIcon = () => {
    if (!showCloseIcon || !onCancel) return null;

    return (
      <IconButton
        data-element="close"
        aria-label="Close button"
        onAction={onCancel}
        disabled={disableClose}
      >
        <Icon type="close" />
      </IconButton>
    );
  };

  const dialogTitle = () => {
    if (!title) return null;

    return (
      <DialogTitleStyle
        showCloseIcon={showCloseIcon}
        hasSubtitle={!!subtitle}
        ref={titleRef}
      >
        {typeof title === "string" ? (
          <Heading
            title={title}
            titleId="carbon-dialog-title"
            subheader={subtitle}
            subtitleId="carbon-dialog-subtitle"
            divider={false}
          />
        ) : (
          title
        )}
      </DialogTitleStyle>
    );
  };

  let dialogHeight = height;

  if (height && height.match(/px$/)) {
    dialogHeight = height.replace("px", "");
  }

  const dialogProps = {
    size,
    fixedBottom,
    height: dialogHeight,
  };

  if (ariaRole) dialogProps.role = ariaRole;

  if (title) dialogProps["aria-labelledby"] = "carbon-dialog-title";

  if (subtitle) dialogProps["aria-describedby"] = "carbon-dialog-subtitle";

  const componentTags = {
    "data-component": rest["data-component"] || "dialog",
    "data-element": rest["data-element"],
    "data-role": rest["data-role"],
  };

  return (
    <Modal
      open={open}
      onCancel={onCancel}
      disableEscKey={disableEscKey}
      disableClose={disableClose}
      timeout={TIMEOUT}
      className="carbon-dialog"
      {...componentTags}
    >
      <FocusTrap
        autoFocus={!disableAutoFocus}
        focusFirstElement={focusFirstElement}
        bespokeTrap={bespokeFocusTrap}
        wrapperRef={dialogRef}
      >
        <DialogStyle
          ref={dialogRef}
          {...dialogProps}
          data-component="dialog"
          data-element="dialog"
          data-role={rest["data-role"]}
        >
          {dialogTitle()}
          <DialogContentStyle
            paddingBottom={contentBottomPadding}
            fixedBottom={fixedBottom}
          >
            <DialogInnerContentStyle ref={innerContentRef}>
              {children}
            </DialogInnerContentStyle>
          </DialogContentStyle>
          {closeIcon()}
        </DialogStyle>
      </FocusTrap>
    </Modal>
  );
};

Dialog.propTypes = {
  /** The ARIA role to be applied to the Dialog */
  ariaRole: PropTypes.string,
  /** Dialog content */
  children: PropTypes.node,
  /** Controls the open state of the component */
  open: PropTypes.bool,
  /** A custom close event handler */
  onCancel: PropTypes.func,
  /** Determines if the Esc Key closes the Dialog */
  disableEscKey: PropTypes.bool,
  /** Determines if the Dialog can be closed */
  disableClose: PropTypes.bool,
  /** Allows developers to specify a specific height for the dialog. */
  height: PropTypes.string,
  /** Title displayed at top of dialog */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  /** Subtitle displayed at top of dialog */
  subtitle: PropTypes.string,
  /** Size of dialog, default size is 750px */
  size: PropTypes.string,
  /** Determines if the close icon is shown */
  showCloseIcon: PropTypes.bool,
  /* Function or reference to first element to focus */
  focusFirstElement: PropTypes.func,
  /* Disables auto focus functionality on child elements */
  disableAutoFocus: PropTypes.bool,
  /**
   * Function to replace focus trap
   * @ignore
   * @private
   */
  bespokeFocusTrap: PropTypes.func,
};

Dialog.defaultProps = {
  size: "medium",
  showCloseIcon: true,
  ariaRole: "dialog",
  disableAutoFocus: false,
};

export default Dialog;

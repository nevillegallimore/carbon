import React from "react";
import PropTypes from "prop-types";
import { validProps } from "../../../utils/ether";
import tagComponent from "../../../utils/helpers/tags";
import {
  FieldsetStyle,
  LegendContainerStyle,
  FieldsetContentStyle,
} from "./fieldset.style";

const Fieldset = (props) => {
  const legend = () => {
    if (!props.legend) return null;

    return (
      <LegendContainerStyle inline={props.inline} data-component="legend-style">
        <legend data-element="legend">{props.legend}</legend>
      </LegendContainerStyle>
    );
  };

  const { ...safeProps } = validProps({
    propTypes: Fieldset.propTypes,
    props,
  });

  return (
    <FieldsetStyle {...tagComponent("fieldset", props)} {...safeProps}>
      <FieldsetContentStyle
        data-component="fieldset-style"
        inline={props.inline}
      >
        {legend()}
        {props.children}
      </FieldsetContentStyle>
    </FieldsetStyle>
  );
};

Fieldset.propTypes = {
  /** Child elements */
  children: PropTypes.node,
  /** The text for the fieldsets legend element. */
  legend: PropTypes.string,
  /** When true, legend is placed in line with the children */
  inline: PropTypes.bool,
};

Fieldset.defaultProps = {
  inline: false,
};

export default Fieldset;

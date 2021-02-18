import React from "react";
import ReactDOM from "react-dom";
import { mount as enzymeMount } from "enzyme";
import I18n from "i18n-js";

import Decimal from "./decimal.component";
import Textbox from "../textbox/textbox.component";
import Label from "../label";

// These have been written in a way that we can change our testing library or component implementation with relative
// ease without having to touch the tests.
// Note that we're asserting e.preventDefault has been called in may places, but we're simulating from the rendered
// input, not calling the prop directly, this is important. By mounting we can make these assertions with
// confidence that the `onChange` will not be dispatched if e.preventDefault has been called

let wrapper;
let container;
const onChange = jest.fn();

const mount = (jsx) => {
  wrapper = enzymeMount(jsx, { attachTo: container });
};

const DOM = (jsx) => {
  ReactDOM.render(jsx, container);
};

function render(props = {}, renderer = mount) {
  const defaultProps = {
    onChange,
    ...props,
  };

  renderer(<Decimal {...defaultProps} />);
}

describe("Decimal", () => {
  function setProps(obj) {
    wrapper.setProps(obj);
    wrapper.update();
  }

  function getElements() {
    const cw = wrapper;
    if (cw) {
      const textbox = cw.find(Textbox);
      return {
        input: textbox.find("input"),
        textbox,
        hiddenInput: wrapper.find("input").at(1),
      };
    }
    throw new Error("No wrapper found");
  }

  const value = () => {
    const { textbox } = getElements();
    return textbox.prop("value");
  };

  const hiddenValue = () => {
    const { hiddenInput } = getElements();
    return hiddenInput.prop("value");
  };

  const checkWhere = (where) => {
    const without = where.replace(/\|/g, "");
    if (without !== value()) {
      throw new Error(
        `Testing error: where (${without}) does not match the current value (${value()})`
      );
    }
  };

  const type = (typedValue) => {
    // This function does not trigger the onblur, so the number will not be auto formatted
    const { input } = getElements();
    input.simulate("change", { target: { value: typedValue } });
  };

  const blur = () => {
    const { input } = getElements();
    input.simulate("blur");
  };

  const press = (obj, where, method = "keyPress") => {
    checkWhere(where);

    const preventDefault = jest.fn();
    const selectionStart = where.indexOf("|");
    const lastIndex = where.lastIndexOf("|");
    const selectionEnd =
      lastIndex === selectionStart ? lastIndex : lastIndex - 1;
    const { input } = getElements();
    input.simulate(method, {
      ...obj,
      preventDefault,
      target: { selectionStart, selectionEnd, value: value() },
    });
    return { preventDefault };
  };

  function ClipboardData(obj) {
    this.data = { ...obj };
  }

  ClipboardData.prototype.getData = function (dataType) {
    return this.data[dataType];
  };

  let translations;

  beforeAll(() => {
    translations = { ...I18n.translations };
    I18n.translations.fr = {
      number: {
        format: {
          delimiter: ".",
          separator: ",",
        },
      },
    };
  });

  afterAll(() => {
    I18n.translations = translations;
  });

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    onChange.mockReset();
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    if (wrapper) {
      wrapper.unmount();
      wrapper = null;
    }
  });

  it("renders in ReactDOM", () => {
    render(null, DOM);
  });

  describe("Uncontrolled", () => {
    it("has a defaultValue of 0.00", () => {
      render();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
    });

    it("allows the defaultValue to be defined", () => {
      render({ defaultValue: "12345.67" });
      expect(value()).toBe("12,345.67");
      expect(hiddenValue()).toBe("12345.67");
    });

    it("renders a negative value", () => {
      render({ defaultValue: "-1234.56" });
      expect(value()).toBe("-1,234.56");
      expect(hiddenValue()).toBe("-1234.56");
      expect(hiddenValue()).toBe("-1234.56");
    });

    it.each([
      ["0.00", {}],
      ["", { allowEmptyValue: true }],
    ])(
      "entering a negative sign and blurring should revert to the defaultValue (%s)",
      (expectedValue, props) => {
        const onBlur = jest.fn();
        render({ onBlur, defaultValue: "-1234.56", ...props });
        type("-");
        blur();
        expect(value()).toBe(expectedValue);
        expect(hiddenValue()).toBe(expectedValue);
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "-",
                rawValue: "-",
              },
            },
          })
        );
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: expectedValue,
                rawValue: expectedValue,
              },
            },
          })
        );
        expect(onBlur).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: expectedValue,
                rawValue: expectedValue,
              },
            },
          })
        );
      }
    );

    describe("precision", () => {
      it("supports having a bigger precision", () => {
        render({ defaultValue: "12345.654", precision: 3 });
        expect(value()).toBe("12,345.654");
        expect(hiddenValue()).toBe("12345.654");
      });

      it("allows the user to change the precision", () => {
        render({ defaultValue: "1234.56789", precision: 5 });

        expect(value()).toBe("1,234.56789");
        expect(hiddenValue()).toBe("1234.56789");

        setProps({ precision: 4 });

        expect(value()).toBe("1,234.5679");
        expect(hiddenValue()).toBe("1234.5679");
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "1,234.5679",
                rawValue: "1234.5679",
              },
            },
          })
        );

        setProps({ precision: 3 });

        expect(value()).toBe("1,234.568");
        expect(hiddenValue()).toBe("1234.568");

        setProps({ precision: 2 });

        expect(value()).toBe("1,234.57");
        expect(hiddenValue()).toBe("1234.57");

        setProps({ precision: 1 });

        expect(value()).toBe("1,234.6");
        expect(hiddenValue()).toBe("1234.6");

        setProps({ precision: 2 });

        expect(value()).toBe("1,234.60");
        expect(hiddenValue()).toBe("1234.60");

        onChange.mockReset();

        setProps({ precision: 3 });

        expect(value()).toBe("1,234.600");
        expect(hiddenValue()).toBe("1234.600");

        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "1,234.600",
                rawValue: "1234.600",
              },
            },
          })
        );
      });
    });

    it("calls onChange when the user enters a value", () => {
      render();
      type("12345.56");
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "12,345.56",
              rawValue: "12345.56",
            },
          },
        })
      );
    });

    it("calls onBlur when the field loses focus", () => {
      const onBlur = jest.fn();
      render({ onBlur });
      type("12345.56");
      blur();
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "12,345.56",
              rawValue: "12345.56",
            },
          },
        })
      );
    });

    it.each(["0|.00", "0.|00", "0.0|0", "0.00|"])(
      "prevents the user from typing the negative symbol within the number (%s)",
      (where) => {
        render();

        const { preventDefault } = press({ key: "-" }, where);
        expect(preventDefault).not.toHaveBeenCalled();
      }
    );

    it("allows the user to type a negative symbol at the start of the number", () => {
      render();

      const { preventDefault } = press({ key: "-" }, "|0.00");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it("allows the user to interact with the page with control commands", () => {
      render();
      const { preventDefault } = press({ key: "r", ctrlKey: true }, "0.00|");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    it("allows the user to interact with the page with control commands (safari)", () => {
      render();
      const { preventDefault } = press({ key: "r", metaKey: true }, "0.00|");
      expect(preventDefault).not.toHaveBeenCalled();
    });

    describe.each(["Backspace", "Delete"])(
      "allows the user to delete part of the decimal (%s)",
      (key) => {
        it.each([
          "|1,234.56",
          "1|,234.56",
          "1,|234.56",
          "1,2|34.56",
          "1,23|4.56",
          "1,234|.56",
          "1,234.|56",
          "1,234.5|6",
          "1,234.56|",
          "|1|,234.56",
          "|1,|234.56",
          "|1,2|34.56",
          "|1,23|4.56",
          "|1,234|.56",
          "|1,234.|56",
          "|1,234.5|6",
          "|1,234.56|",
          "1|,|234.56",
          "1|,2|34.56",
          "1|,23|4.56",
          "1|,234|.56",
          "1|,234.|56",
          "1|,234.5|6",
          "1|,234.56|",
          "1,|2|34.56",
          "1,|23|4.56",
          "1,|234|.56",
          "1,|234.|56",
          "1,|234.5|6",
          "1,|234.56|",
          "1,2|3|4.56",
          "1,2|34|.56",
          "1,2|34.|56",
          "1,2|34.5|6",
          "1,2|34.56|",
          "1,23|4|.56",
          "1,23|4.|56",
          "1,23|4.5|6",
          "1,23|4.56|",
          "1,234|.|56",
          "1,234|.5|6",
          "1,234|.56|",
          "1,234.|5|6",
          "1,234.|56|",
          "1,234.5|6|",
          "|1,234.56|",
        ])("%s", (where) => {
          render({ defaultValue: "1234.56" });
          const { preventDefault } = press({ key }, where);
          expect(preventDefault).not.toHaveBeenCalled();
        });
      }
    );

    describe("i18n", () => {
      beforeAll(() => {
        I18n.locale = "fr";
      });

      afterAll(() => {
        I18n.locale = undefined;
      });

      it("has a defaultValue of 0,00", () => {
        render();
        expect(value()).toBe("0,00");
        expect(hiddenValue()).toBe("0.00");
      });

      it("allows the defaultValue to be defined", () => {
        render({ defaultValue: "12345.67" });
        expect(value()).toBe("12.345,67");
        expect(hiddenValue()).toBe("12345.67");
      });

      it("formats a value correctly", () => {
        render();
        type("1234576");
        blur();
        expect(value()).toBe("1.234.576,00");
        expect(hiddenValue()).toBe("1234576.00");
      });

      it("formats a value correctly (extra separator)", () => {
        render();
        type("1.2.34576,00");
        blur();
        expect(value()).toBe("1.234.576,00");
        expect(hiddenValue()).toBe("1234576.00");
      });

      it("renders a negative value", () => {
        render({ defaultValue: "-1234.56" });
        expect(value()).toBe("-1.234,56");
        expect(hiddenValue()).toBe("-1234.56");
      });

      it.each([
        ["0,00", "0.00", {}],
        ["", "", { allowEmptyValue: true }],
      ])(
        "entering a negative sign and blurring should revert to the defaultValue (%s)",
        (formattedValue, rawValue, props) => {
          const onBlur = jest.fn();
          render({ onBlur, defaultValue: "-1234.56", ...props });
          type("-");
          blur();
          expect(value()).toBe(formattedValue);
          expect(hiddenValue()).toBe(rawValue);
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: "-",
                  rawValue: "-",
                },
              },
            })
          );
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue,
                  rawValue,
                },
              },
            })
          );
          expect(onBlur).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue,
                  rawValue,
                },
              },
            })
          );
        }
      );

      describe("precision", () => {
        it("has a default precision of 2 (rounding up)", () => {
          render({ defaultValue: "12345.655" });
          expect(value()).toBe("12.345,66");
          expect(hiddenValue()).toBe("12345.66");
        });

        it("has a default precision of 2 (rounding down)", () => {
          render({ defaultValue: "12345.654" });
          expect(value()).toBe("12.345,65");
          expect(hiddenValue()).toBe("12345.65");
        });

        it("supports having a bigger precision", () => {
          render({ defaultValue: "12345.654", precision: 3 });
          expect(value()).toBe("12.345,654");
          expect(hiddenValue()).toBe("12345.654");
        });

        it("allows the user to change the precision", () => {
          render({ defaultValue: "1234.56789", precision: 5 });

          expect(value()).toBe("1.234,56789");
          expect(hiddenValue()).toBe("1234.56789");

          setProps({ precision: 4 });

          expect(value()).toBe("1.234,5679");
          expect(hiddenValue()).toBe("1234.5679");
          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: "1.234,5679",
                  rawValue: "1234.5679",
                },
              },
            })
          );

          setProps({ precision: 3 });

          expect(value()).toBe("1.234,568");
          expect(hiddenValue()).toBe("1234.568");

          setProps({ precision: 2 });

          expect(value()).toBe("1.234,57");
          expect(hiddenValue()).toBe("1234.57");

          setProps({ precision: 1 });

          expect(value()).toBe("1.234,6");
          expect(hiddenValue()).toBe("1234.6");

          setProps({ precision: 2 });

          expect(value()).toBe("1.234,60");
          expect(hiddenValue()).toBe("1234.60");

          onChange.mockReset();

          setProps({ precision: 3 });

          expect(value()).toBe("1.234,600");
          expect(hiddenValue()).toBe("1234.600");

          expect(onChange).toHaveBeenCalledWith(
            expect.objectContaining({
              target: {
                value: {
                  formattedValue: "1.234,600",
                  rawValue: "1234.600",
                },
              },
            })
          );
        });
      });

      it("calls onChange when the user enters a value", () => {
        render();
        type("12345,56");
        expect(onChange).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "12.345,56",
                rawValue: "12345.56",
              },
            },
          })
        );
      });

      it("calls onBlur when the field loses focus", () => {
        const onBlur = jest.fn();
        render({ onBlur });
        type("12345,56");
        blur();
        expect(onBlur).toHaveBeenCalledWith(
          expect.objectContaining({
            target: {
              value: {
                formattedValue: "12.345,56",
                rawValue: "12345.56",
              },
            },
          })
        );
      });

      describe.each(["Backspace", "Delete"])(
        "allows the user to delete part of the decimal (%s)",
        (key) => {
          it.each([
            "|1.234,56",
            "1|.234,56",
            "1.|234,56",
            "1.2|34,56",
            "1.23|4,56",
            "1.234|,56",
            "1.234,|56",
            "1.234,5|6",
            "1.234,56|",
            "|1|.234,56",
            "|1.|234,56",
            "|1.2|34,56",
            "|1.23|4,56",
            "|1.234|,56",
            "|1.234,|56",
            "|1.234,5|6",
            "|1.234,56|",
            "1|.|234,56",
            "1|.2|34,56",
            "1|.23|4,56",
            "1|.234|,56",
            "1|.234,|56",
            "1|.234,5|6",
            "1|.234,56|",
            "1.|2|34,56",
            "1.|23|4,56",
            "1.|234|,56",
            "1.|234,|56",
            "1.|234,5|6",
            "1.|234,56|",
            "1.2|3|4,56",
            "1.2|34|,56",
            "1.2|34,|56",
            "1.2|34,5|6",
            "1.2|34,56|",
            "1.23|4|,56",
            "1.23|4,|56",
            "1.23|4,5|6",
            "1.23|4,56|",
            "1.234|,|56",
            "1.234|,5|6",
            "1.234|,56|",
            "1.234,|5|6",
            "1.234,|56|",
            "1.234,5|6|",
            "|1.234,56|",
          ])("%s", (where) => {
            render({ defaultValue: "1234.56" });
            const { preventDefault } = press({ key }, where);
            expect(preventDefault).not.toHaveBeenCalled();
          });
        }
      );
    });

    it("calls the onKeyPress callback", () => {
      const onKeyPress = jest.fn();

      render({ onKeyPress });
      press({ key: "1" }, "0.00|");
      expect(onKeyPress).toHaveBeenCalledWith(
        expect.objectContaining({ key: "1" })
      );
    });

    it("has the correct automation selectors", () => {
      render();
      expect(
        wrapper.find(Textbox).getDOMNode().getAttribute("data-component")
      ).toBe("decimal");
    });

    it("works as a form-data component", () => {
      render({ onChange: undefined, name: "example" });
      type("1.23");
      const { hiddenInput } = getElements();
      const html = hiddenInput.getDOMNode();
      expect(html.getAttribute("data-component")).toBe("hidden-input");
      expect(html.getAttribute("type")).toBe("hidden");
      expect(html.getAttribute("value")).toBe("1.23");
      expect(html.getAttribute("name")).toBe("example");
    });

    it("fires onChange when blurring only if the value has changed", () => {
      render({ allowEmptyValue: true });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });
  });
  describe("Controlled", () => {
    it("can be controlled", () => {
      render({ value: "123" });
      expect(value()).toBe("123.00");
      expect(hiddenValue()).toBe("123.00");

      setProps({ value: "456" });
      expect(value()).toBe("456.00");
      expect(hiddenValue()).toBe("456.00");

      setProps({ value: "" });
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
    });

    it("blurring a field does not trigger onChange if the value has not changes", () => {
      render({ value: "123" });
      blur();
      expect(onChange).not.toHaveBeenCalled();
    });

    it("typing a negative value reverts to the default value", () => {
      render({ value: "123" });
      setProps({ value: "-" });
      expect(onChange).not.toHaveBeenCalled();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
    });

    it("typing a negative value reverts to the default value (allowEmptyValue)", () => {
      render({ value: "", allowEmptyValue: true });
      setProps({ value: "-" });
      expect(onChange).not.toHaveBeenCalled();
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
    });

    it("does not format a value that is not a number", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      setProps({ value: "FooBar" });
      blur();
      expect(value()).toBe("FooBar");
      expect(hiddenValue()).toBe("FooBar");
      expect(onBlur).toHaveBeenCalled();
    });

    it("formats a empty value prop when firing events (allowEmptyValue)", () => {
      const onBlur = jest.fn();
      render({
        value: "",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
        allowEmptyValue: true,
      });

      blur();
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "",
              rawValue: "",
            },
          },
        })
      );

      onBlur.mockReset();
      type("1");
      blur();
      expect(value()).toBe("1.00");
      expect(hiddenValue()).toBe("1.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "1.00",
              rawValue: "1",
            },
          },
        })
      );

      onBlur.mockReset();
      type("");
      blur();
      expect(value()).toBe("");
      expect(hiddenValue()).toBe("");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "",
              rawValue: "",
            },
          },
        })
      );
    });

    it("formats a empty value prop when firing events", () => {
      const onBlur = jest.fn();
      render({
        value: "0.00",
        onBlur,
        onChange: (e) => {
          setProps({ value: e.target.value.rawValue });
        },
      });

      blur();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "0.00",
              rawValue: "0.00",
            },
          },
        })
      );

      onBlur.mockReset();
      type("1");
      blur();
      expect(value()).toBe("1.00");
      expect(hiddenValue()).toBe("1.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "1.00",
              rawValue: "1",
            },
          },
        })
      );

      onBlur.mockReset();
      type("");
      blur();
      expect(value()).toBe("0.00");
      expect(hiddenValue()).toBe("0.00");
      expect(onBlur).toHaveBeenCalledWith(
        expect.objectContaining({
          target: {
            value: {
              formattedValue: "0.00",
              rawValue: "0.00",
            },
          },
        })
      );
    });
  });
});

describe("required", () => {
  let inputs;
  beforeAll(() => {
    render({ label: "required", required: true }, (jsx) => {
      wrapper = enzymeMount(jsx);
    });
    inputs = wrapper.find("input");
  });

  it("the required prop is passed to the input", () => {
    expect(inputs.at(0).prop("required")).toBe(true);
  });

  it("the required prop not passed to the hidden input", () => {
    expect(inputs.at(1).prop("required")).toBe(undefined);
  });

  it("the isRequired prop is passed to the label", () => {
    const label = wrapper.find(Label);
    expect(label.prop("isRequired")).toBe(true);
  });
});

export const isSingular = (count) => parseInt(count, 10) === 1;

export default {
  locale: "en-GB",
  actions: {
    edit: "Edit",
    delete: "Delete",
    reset: "Reset Columns",
  },
  actionPopover: {
    ariaLabel: "actions",
  },
  actionToolbar: {
    selected: "Selected",
  },
  batchSelection: {
    selected: (count) => `${count} selected`,
  },
  confirm: {
    no: "No",
    yes: "Yes",
  },
  errors: {
    messages: {
      formSummary:
        /* istanbul ignore next */
        (errors, warnings) => {
          const errorPlural = isSingular(errors) ? "error" : "errors";
          const warningPlural = isSingular(warnings) ? "warning" : "warnings";
          const isErrorPlural = isSingular(errors) ? "is" : "are";
          const isWarningPlural = isSingular(warnings) ? "is" : "are";

          if (errors && warnings) {
            return `There ${isErrorPlural} ${errors} ${errorPlural} and ${warnings} ${warningPlural}`;
          }
          if (errors) {
            return `There ${isErrorPlural} ${errors} ${errorPlural}`;
          }
          if (warnings) {
            return `There ${isWarningPlural} ${warnings} ${warningPlural}`;
          }
          return null;
        },
    },
  },
  message: {
    closeButtonAriaLabel: "Close",
  },
  numeralDate: {
    validation: {
      day: "Day should be a number within a 1-31 range.",
      month: "Month should be a number within a 1-12 range.",
      year: "Year should be a number within a 1800-2200 range.",
    },
  },
  pager: {
    show: "Show",
    records: (count) => `${count} ${isSingular(count) ? "item" : "items"}`,
    first: "First",
    last: "Last",
    next: "Next",
    previous: "Previous",
    pageX: "Page ",
    ofY: (count) => ` of ${count}`,
  },
  select: {
    actionButtonText: "Add New Item",
    placeholder: "Please Select...",
    noResultsForTerm: (term) => `No results for "${term}"`,
  },
  switch: {
    on: "ON",
    off: "OFF",
  },
  table: {
    noData: "No results to display",
  },
  tileSelect: {
    deselect: "Deselect",
  },
  wizards: {
    multiStep: {
      buttons: {
        submit: "Submit",
        next: "Next",
        back: "Back",
      },
    },
  },
};

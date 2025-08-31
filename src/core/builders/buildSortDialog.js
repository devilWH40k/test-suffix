import { fabric } from "../fabric.js";

/**
 * Build Sort Dialog
 * @param {Function} onClose - callback when closing
 * @param {Function} onApply - callback when applying
 * @returns {HTMLElement}
 */
export function buildSortDialog(onClose, onApply) {
  const dialog = fabric.createElement("div", {
    classes: ["sort", "text-regular", "white-color"]
  });

  const headerTitle = fabric.createElement("h2", {
    classes: ["sort__title", "white-color", "text-big", "text-bold"],
    content: "Sorted by"
  });

  const closeBtn = fabric.createElement("button", {
    classes: ["sort__close"],
    attrs: { "aria-label": "Close menu" },
    on: { click: onClose },
    content: {
      tag: "img",
      attrs: { src: "./assets/icons/close.svg", alt: "close icon" }
    }
  });

  const header = fabric.createElement("div", {
    classes: ["sort__header"],
    content: [headerTitle, closeBtn]
  });

  function buildOption(name, label, checked = false) {
    return fabric.createElement("label", {
      classes: ["sort__option"],
      content: [
        {
          tag: "input",
          classes: ["sort__radio"],
          attrs: { type: "radio", name, ...(checked ? { checked: true } : {}) }
        },
        {
          tag: "span",
          classes: ["sort__label"],
          content: label
        }
      ]
    });
  }

  function buildGroup(name, options) {
    const group = fabric.createElement("div", {
      classes: ["sort__group"]
    });

    options.forEach((opt, i) => {
      const optionEl = buildOption(name, opt.label, opt.checked);
      fabric.append(group, optionEl);
    });

    return group;
  }

  const groupsData = [
    {
      name: "quiz-name",
      options: [
        { label: "Quiz name: A to Z", checked: true },
        { label: "Quiz name: Z to A" }
      ]
    },
    {
      name: "results",
      options: [
        { label: "Results and rating: High to Low" },
        { label: "Results and rating: Low to High" }
      ]
    },
    {
      name: "created",
      options: [
        { label: "Created: Oldest to Newest" },
        { label: "Created: Newest to Oldest" }
      ]
    },
    {
      name: "category",
      options: [
        { label: "Category: A to Z" },
        { label: "Category: Z to A" }
      ]
    },
    {
      name: "moderation-status",
      options: [
        { label: "Moderation status: High to Low" },
        { label: "Moderation status: Low to High" }
      ]
    },
    {
      name: "moderation-date",
      options: [
        { label: "Moderation date: Oldest to Newest" },
        { label: "Moderation date: Newest to Oldest" }
      ]
    },
    {
      name: "last-moderation",
      options: [
        { label: "Last moderation by: A to Z" },
        { label: "Last moderation by: Z to A" }
      ]
    }
  ];

  const form = fabric.createElement("form", {
    classes: ["sort__form"]
  });

  groupsData.forEach(groupData => {
    const groupEl = buildGroup(groupData.name, groupData.options);
    fabric.append(form, groupEl);
  });

  const applyBtn = fabric.createElement("button", {
    classes: ["sort__apply", "btn", "btn-primary"],
    attrs: { type: "button" },
    content: "Apply",
    on: { click: onApply }
  });

  fabric.append(form, applyBtn);

  fabric.append(dialog, header);
  fabric.append(dialog, form);

  return dialog;
}

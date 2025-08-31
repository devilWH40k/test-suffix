import { fabric } from "../fabric.js";

function buildMenuItem(iconId, text) {
  const icon = fabric.createElement("svg", {
    classes: ["action-menu__item-icon", "light-color"],
    content: [
      {
        tag: "use",
        attrs: { "xlink:href": `/assets/icons/action-menu-icons.svg#${iconId}` }
      }
    ]
  });

  const label = fabric.createElement("span", {
    classes: ["action-menu__text"],
    content: text,
  });

  return fabric.createElement("li", {
    classes: ["action-menu__item"],
    content: [icon, label],
  });
}

function buildMenuList() {
  const items = [
    ["show-results", "Show results"],
    ["open-quiz", "Open quiz page"],
    ["copy", "Copy link"],
    ["create-copy", "Create copy"],
    ["hide", "Hide quiz"],
  ].map(([iconId, text]) => buildMenuItem(iconId, text));

  return fabric.createElement("ul", {
    classes: ["action-menu__list"],
    content: items,
  });
}

function buildNav() {
  return fabric.createElement("nav", {
    classes: ["action-menu__nav"],
    content: buildMenuList(),
  });
}

function buildDivider() {
  return fabric.createElement("div", {
    classes: ["action-menu__divider"],
  });
}

function buildDeleteButton(onDelete) {
  const icon = fabric.createElement("svg", {
    classes: ["action-menu__delete-icon"],
    content: [
      {
        tag: "use",
        attrs: { "xlink:href": "/assets/icons/sidebar-icons.svg#sidebar-trash" }
      }
    ],
  });

  const text = fabric.createElement("span", {
    classes: ["action-menu__delete-text"],
    content: "Delete",
  });

  return fabric.createElement("button", {
    classes: ["action-menu__delete"],
    content: [icon, text],
    on: {
      click: onDelete,
    }
  });
}

export function buildActionMenu(onDelete) {
  const container = fabric.createElement("div", {
    classes: ["action-menu"],
  });

  fabric.append(container, buildNav());
  fabric.append(container, buildDivider());
  fabric.append(container, buildDeleteButton(onDelete));

  return container;
}

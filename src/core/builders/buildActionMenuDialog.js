import { fabric } from "../fabric.js";

/**
 * Build Action Menu Dialog
 * @returns {HTMLElement}
 */
export function buildActionMenuDialog(onClose, onDelete) {
	const dialog = fabric.createElement("div", {
		classes: ["action-menu-dialog", "primary-blue-bg"],
	});

	const header = fabric.createElement("header", {
		classes: ["action-menu-dialog__header"],
		content: [
			{
				tag: "h3",
				classes: ["action-menu-dialog__heading", "text-big", "white-color"],
				content: "Action menu",
			},
			{
				tag: "img",
				classes: ["action-menu-dialog__close-icon"],
				attrs: {
					src: "./assets/icons/close.svg",
					alt: "close icon",
				},
				on: {
					click: onClose,
				},
			},
		],
	});

	const nav = fabric.createElement("nav", {
		classes: ["action-menu-dialog__nav"],
	});

	const list = fabric.createElement("ul", {
		classes: ["action-menu-dialog__nav-list"],
	});

	const menuItems = [
		{
			icon: "show-results-act-menu.svg",
			alt: "show results icon",
			text: "Show results",
		},
		{
			icon: "open-quiz-act-menu.svg",
			alt: "open quiz icon",
			text: "Open quiz page",
		},
		{
			icon: "copy-act-menu.svg",
			alt: "copy icon",
			text: "Copy link",
		},
		{
			icon: "create-copy-act-menu.svg",
			alt: "create copy icon",
			text: "Create copy",
		},
		{
			icon: "hide-act-menu.svg",
			alt: "hide quiz icon",
			text: "Hide quiz",
		},
	];

	menuItems.forEach((item) => {
		const li = fabric.createElement("li", {
			classes: ["action-menu-dialog__nav-item", "text-regular", "white-color"],
			content: [
				{
					tag: "img",
					classes: ["action-menu-dialog__item-icon"],
					attrs: {
						src: `./assets/icons/${item.icon}`,
						alt: item.alt,
					},
				},
				{
					tag: "span",
					classes: ["action-menu-dialog__item-text"],
					content: item.text,
				},
			],
		});
		fabric.append(list, li);
	});

	const divider = fabric.createElement("div", {
		classes: ["action-menu-dialog__divider"],
	});

	const deleteBtn = fabric.createElement("button", {
		classes: ["action-menu-dialog__delete-btn"],
		on: { click: onDelete },
		content: [
			{
				tag: "svg",
				classes: ["action-menu-dialog__delete-btn-icon"],
				content: [
					{
						tag: "use",
						attrs: { "xlink:href": "/assets/icons/sidebar-icons.svg#sidebar-trash" },
					},
				],
			},
			{
				tag: "span",
				classes: ["text-regular", "primary-color"],
				content: "Delete",
			},
		],
	});

	fabric.append(nav, list);
	fabric.append(dialog, header);
	fabric.append(dialog, nav);
	fabric.append(dialog, divider);
	fabric.append(dialog, deleteBtn);

	return dialog;
}

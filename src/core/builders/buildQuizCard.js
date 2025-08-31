import { fabric } from "../fabric.js";

/**
 * Build quiz card component from data
 * @param {Object} data - single card data
 * @returns {HTMLElement}
 */
export function buildQuizCard(data, openActionMenuCallback, openCommentsRatesDialogCallback) {
	const card = fabric.createElement("div", {
		classes: ["card", "primary-blue-color"],
	});

	const titleBlock = fabric.createElement("div", {
		classes: ["card__title-block"],
		content: [
			{
				tag: "img",
				classes: ["card__img"],
				attrs: {
					src: "./assets/imgs/card-preview-1.png",
					alt: "card image",
				},
			},
			{
				tag: "h5",
				classes: ["card__title", "text-bold", "text-regular"],
				content: data.title,
			},
		],
	});

	const stats = fabric.createElement("div", { classes: ["card__stats"] });

	fabric.append(stats, {
		tag: "div",
		classes: ["card__stat-item"],
		content: [
			{
				tag: "img",
				classes: ["card__stat-icon"],
				attrs: {
					src: "./assets/icons/calendar-dates.svg",
					alt: "calendar dates icon",
				},
			},
			{
				tag: "span",
				classes: ["card__stat-text", "text-regular", "text-small"],
				content: data.date,
			},
		],
	});

	const chartItem = fabric.createElement("div", { classes: ["card__stat-item"] });

	fabric.append(chartItem, {
		tag: "div",
		classes: ["card__stat-item-child"],
		content: [
			{
				tag: "img",
				classes: ["card__stat-icon"],
				attrs: {
					src: "./assets/icons/bar-chart.svg",
					alt: "bar chart icon",
				},
			},
			{
				tag: "span",
				classes: ["card__stat-text", "text-regular", "text-small"],
				content: "23",
			},
		],
	});

	const stars = fabric.createElement("div", { classes: ["card__stat-item-stars"] });
	for (let i = 0; i < 5; i++) {
		fabric.append(stars, {
			tag: "img",
			classes: ["card__stat-item-star"],
			attrs: {
				src: "./assets/icons/star.svg",
				alt: "star icon",
			},
		});
	}
	fabric.append(chartItem, stars);
	fabric.append(stats, chartItem);

	const tagsBlock = fabric.createElement("div", {
		classes: ["card__tags-block"],
		content: {
			tag: "span",
			classes: ["card__tags", "text-small"],
			content: data.tags,
		},
	});

	const moderationBlock = fabric.createElement("div", {
		classes: ["card__moderation-block"],
	});

	const moderationInfo = fabric.createElement("div", {
		classes: ["card__moderation-info"],
	});

	if (data.moderated) {
		fabric.append(moderationInfo, {
			tag: "span",
			classes: ["badge", "badge--orange", "text-tiny", "text-bold"],
			content: `Moderate on ${data.moderationPercent}%`,
		});

		const startedBlock = fabric.createElement("div", {
			classes: ["card__moderation-info-started"],
			content: [
				{
					tag: "span",
					classes: ["card__moderation-text", "text-small", "light-color"],
					content: "Started",
				},
				{
					tag: "span",
					classes: ["card__moderation-text", "text-small", "primary-blue-color"],
					content: ` ${data.moderationStartedAt}`,
				},
			],
		});

		fabric.append(moderationInfo, startedBlock);
	} else {
		fabric.append(moderationInfo, {
			tag: "span",
			classes: ["badge", "badge--blue", "text-tiny", "text-bold"],
			content: "Not moderated",
		});
	}

	fabric.append(moderationBlock, moderationInfo);

	if (data.moderator) {
		const moderator = fabric.createElement("div", { classes: ["card__moderator"] });

		fabric.append(moderator, {
			tag: "img",
			classes: ["card__moderator-avatar"],
			attrs: {
				src: data.moderator.avatar || "./assets/imgs/sam.png",
				alt: "moderator avatar",
			},
		});

		const moderatorInfo = fabric.createElement("div", {
			classes: ["card__moderator-info"],
			content: [
				{
					tag: "span",
					classes: ["card__moderator-name", "text-regular", "primary-blue-color"],
					content: data.moderator.name,
				},
				{
					tag: "span",
					classes: ["card__moderator-position", "text-small", "light-color"],
					content: data.moderator.position,
				},
			],
		});

		fabric.append(moderator, moderatorInfo);
		fabric.append(moderationBlock, moderator);
	}

	const btnsBlock = fabric.createElement("div", { classes: ["card__btns-block"] });

	const btnConfigs = [
		{ icon: "link.svg", text: "" },
		{ icon: "comment-text.svg", text: "Comments & rates", onClick: openCommentsRatesDialogCallback },
		{ icon: "pencil-edit.svg", text: "" },
		{ icon: "more-vertical.svg", text: "", onClick: openActionMenuCallback },
	];

	btnConfigs.forEach((cfg) => {
		const button = fabric.createElement("button", {
			classes: ["card__moderation-btn", "btn", "btn-bordered-outlined", "text-regular", "primary-blue-color"],
			content: [
				{
					tag: "img",
					classes: ["card__moderation-btn-icon"],
					attrs: {
						src: `./assets/icons/${cfg.icon}`,
						alt: `${cfg.icon} icon`,
					},
				},
				cfg.text,
			],
			on: cfg.onClick  ? { click: cfg.onClick } : null,
		});

		fabric.append(btnsBlock, button);
	});

	fabric.append(card, titleBlock);
	fabric.append(card, stats);
	if (data.tags) fabric.append(card, tagsBlock);
	fabric.append(card, moderationBlock);
	fabric.append(card, btnsBlock);

	return card;
}

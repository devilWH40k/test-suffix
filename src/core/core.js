import { cardsStore } from "../store/cardStore.js";
import { setCardsRerender } from "../store/cardStore.js";

import { buildQuizCard } from "./builders/buildQuizCard.js";
import { buildActionMenuDialog } from "./builders/buildActionMenuDialog.js";
import { buildSortDialog } from "./builders/buildSortDialog.js";
import { buildCommentsRatesDialog } from "./builders/buildCommentsRatesDialog.js";
import { enableScroll, disableScroll } from "../utils/utils.js";

import { buildOverlay } from "./builders/buildOverlay.js";
import { buildActionMenu } from "./builders/buildActionMenu.js";

const ACTION_MENU_EL_WIDTH = 200;
const ACTION_MENU_EL_HEIGHT = 221;

export function initApp() {
	const cardsListContainer = document.querySelector(".cards-list");
  const gridTableContainer = document.querySelector(".grid-table");
  const sortOptionsListContainer = document.querySelector(".section__sort-options-list");
  const tableViewButton = document.querySelector(".section__view-panel-btn--table");
  const cardsViewButton = document.querySelector(".section__view-panel-btn--cards");
	const sidebarListItems = document.querySelectorAll(".sidebar__item");
	const sidebar = document.querySelector(".sidebar");
	const burgerEl = document.querySelector(".burger");
	const sidebarCross = document.querySelector(".sidebar__close");
	const sortBtn = document.querySelector(".section__header-sort-btn");
	const minimizeBtn = document.querySelector(".sidebar__minimize-btn");

  tableViewButton.addEventListener("click", function tableViewButtonClickHandler() {
    if (tableViewButton.classList.contains("active")) return;

    tableViewButton.classList.toggle("active");
    cardsViewButton.classList.toggle("active");

    gridTableContainer.style.display = "grid";
    cardsListContainer.style.display = "none";
    sortOptionsListContainer.style.opacity = "0";
  })

  cardsViewButton.addEventListener("click", function tableViewButtonClickHandler() {
    if (cardsViewButton.classList.contains("active")) return;
    
    tableViewButton.classList.toggle("active");
    cardsViewButton.classList.toggle("active");

    gridTableContainer.style.display = "none";
    cardsListContainer.style.display = "flex";
    sortOptionsListContainer.style.opacity = "100";
  })

  gridTableContainer.style.display = 'none';

	let actionMenuDialogEl = null;
	let actionMenuEl = null;
	let commentsRatesDialogEl = null;
	let sortDialogEl = null;
	let overlayEl = null;
	let activeSidebarListItem = sidebarListItems[0];

	minimizeBtn.addEventListener("click", function minimizeBtnClickHandler() {
		sidebar.classList.toggle("minimized");
	});

	sortBtn.addEventListener("click", openSortDialog);

	sidebarCross.addEventListener("click", function sidebarCrossClickHandler() {
		enableScroll();
		sidebar.classList.remove("open");
		burgerEl.classList.remove("open");
	});

	burgerEl.addEventListener("click", function burgerClickHandler() {
		burgerEl.classList.toggle("open");
		sidebar.classList.toggle("open");

		const isSidebarOpen = sidebar.classList.contains("open");

		isSidebarOpen ? disableScroll() : enableScroll();
	});

	sidebarListItems.forEach((listItem) => {
		listItem.addEventListener("click", (e) => {
			const clickedListItem = e.target.closest(".sidebar__item");

			if (clickedListItem.classList.contains("sidebar__item--active")) return;

			activeSidebarListItem.classList.remove("sidebar__item--active");
			clickedListItem.classList.add("sidebar__item--active");
			activeSidebarListItem = clickedListItem;
		});
	});

	function deleteCard(cardId) {
    const cardItemToDelete = cardsStore.list.find((card) => card.id === cardId);
    if (!cardItemToDelete) return;

    const newCardItems = cardsStore.list.filter((card) => card.id !== cardId);

		cardsStore.list = [...newCardItems];

		if (overlayEl) {
			setTimeout(() => {
				overlayEl.remove();
				overlayEl = null;
			}, 200);
		}

		if (actionMenuDialogEl) {
      actionMenuDialogEl.classList.remove("action-menu-dialog--visible");

			setTimeout(() => {
				actionMenuDialogEl.remove();
				actionMenuDialogEl = null;
				enableScroll();
			}, 200);
		}

    if (actionMenuEl) {
      actionMenuEl.remove();
    }
	}

	function closeActionMenu() {
		if (actionMenuDialogEl) {
			actionMenuDialogEl.classList.remove("action-menu-dialog--visible");

			setTimeout(() => {
				actionMenuDialogEl.remove();
				actionMenuDialogEl = null;
				enableScroll();
			}, 200);
		}

		if (overlayEl) {
			setTimeout(() => {
				overlayEl.remove();
				overlayEl = null;
			}, 200);
		}
	}

	function openActionMenu(e, cardId) {
    const triggerBtn = e.target.closest(".card__moderation-btn");
    if (!triggerBtn) return;

    e.stopPropagation();

    if (actionMenuEl) {
      actionMenuEl.remove();
      actionMenuEl = null;
    }

		if (window.innerWidth >= 800) {

      const rect = triggerBtn.getBoundingClientRect();

			actionMenuEl = buildActionMenu(() => deleteCard(cardId));
      
      if (rect.left + ACTION_MENU_EL_WIDTH < window.innerWidth && !(rect.bottom + ACTION_MENU_EL_HEIGHT > window.innerHeight)) {
        actionMenuEl.style.top = `${rect.bottom + window.scrollY}px`;
        actionMenuEl.style.left = `${rect.left + window.scrollX}px`;
      } else if (rect.bottom + ACTION_MENU_EL_HEIGHT > window.innerHeight) {
        actionMenuEl.style.top = `${rect.top - ACTION_MENU_EL_HEIGHT + window.scrollY}px`;
        actionMenuEl.style.right = `${(window.innerWidth - rect.right) + window.scrollX - (rect.width / 2)}px`;
      } else {
        actionMenuEl.style.top = `${rect.bottom + window.scrollY}px`;
        actionMenuEl.style.right = `${(window.innerWidth - rect.right) + window.scrollX - (rect.width / 2)}px`;
      }

			document.body.appendChild(actionMenuEl);

      const handleDocClick = (event) => {
        if (actionMenuEl.contains(event.target)) {
          return;
        }

        triggerBtn.classList.remove("active");
        actionMenuEl.remove();

        document.removeEventListener("click", handleDocClick);
      };

      document.addEventListener("click", handleDocClick);
			return;
		}

		actionMenuDialogEl = buildActionMenuDialog(closeActionMenu, () => deleteCard(cardId));
		overlayEl = buildOverlay(closeActionMenu);

		setTimeout(() => {
			actionMenuDialogEl.classList.add("action-menu-dialog--visible");
		}, 10);

		document.body.appendChild(actionMenuDialogEl);
		document.body.appendChild(overlayEl);

		disableScroll();
	}

	function closeCommentsRatesDialog() {
		commentsRatesDialogEl.classList.remove("comments-rates-dialog--visible");

		setTimeout(() => {
			commentsRatesDialogEl.remove();
			commentsRatesDialogEl = null;
			enableScroll();
		}, 200);

		if (overlayEl) {
			setTimeout(() => {
				overlayEl.remove();
				overlayEl = null;
			}, 200);
		}
	}

	function openCommentsRatesDialog(quizTitle, moderationPercent, startedAt) {
		commentsRatesDialogEl = buildCommentsRatesDialog({
			quizTitle,
			moderationPercent,
			startedAt,
			onClose: closeCommentsRatesDialog,
			onEdit: () => console.log("Go to editor"),
		});
		overlayEl = buildOverlay(closeActionMenu);

		setTimeout(() => {
			commentsRatesDialogEl.classList.add("comments-rates-dialog--visible");
		}, 10);

		document.body.appendChild(commentsRatesDialogEl);
		document.body.appendChild(overlayEl);

		disableScroll();
	}

	function closeSortDialog() {
		sortDialogEl.classList.remove("open");

		setTimeout(() => {
			sortDialogEl.remove();
			sortDialogEl = null;
			enableScroll();
		}, 200);
	}

	function openSortDialog() {
		sortDialogEl = buildSortDialog(closeSortDialog);
		document.body.appendChild(sortDialogEl);

		setTimeout(() => {
			sortDialogEl.classList.add("open");
		}, 10);

		disableScroll();
	}

	setCardsRerender((cards) => {
		cardsListContainer.innerHTML = "";

		cards.forEach((data) => {
			const card = buildQuizCard(
				data,
				(e) => openActionMenu(e, data.id),
				() => openCommentsRatesDialog(data.title, data.moderationPercent, data.moderationStartedAt),
			);
			cardsListContainer.appendChild(card);
		});
	});

	cardsStore.list = [...cardsStore.list];
}

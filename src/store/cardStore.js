import { CARD_DATA } from "../constants/cardData.js";
import { createStore } from "./store.js";

export const cardsStore = createStore(
  { list: [...CARD_DATA] },
  (key, value) => {
    if (key === "list") {
      rerenderCards(value);
    }
  }
);

let rerenderCards = () => {};
export function setCardsRerender(fn) {
  rerenderCards = fn;
}

import { fabric } from "../fabric.js";

export function buildComment({ name, role, date, rating, text }) {
  const initials = name
    .split(" ")
    .map((part) => part[0].toUpperCase())
    .join("");

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      fabric.createElement("img", {
        attrs: {
          src: i <= rating 
            ? "./assets/icons/filled-star.svg" 
            : "./assets/icons/star.svg",
          alt: i <= rating ? "filled star icon" : "star icon",
        },
        classes: [
          "comment__star",
          ...(i <= rating ? ["comment__star--filled"] : []),
        ],
      })
    );
  }

  const comment = fabric.createElement("div", {
    classes: ["comment"],
    content: [
      {
        tag: "div",
        classes: ["comment__header"],
        content: [
          {
            tag: "div",
            classes: ["comment__avatar"],
            content: initials,
          },
          {
            tag: "div",
            classes: ["comment__info"],
            content: [
              {
                tag: "div",
                classes: ["comment__name", "text-small", "text-bold"],
                content: name,
              },
              {
                tag: "div",
                classes: ["comment__role", "text-small"],
                content: role,
              },
              {
                tag: "div",
                classes: ["comment__date", "text-small"],
                content: date,
              },
            ],
          },
          {
            tag: "div",
            classes: ["comment__rating"],
            content: stars,
          },
        ],
      },
      {
        tag: "div",
        classes: ["comment__body", "text-regular"],
        content: text,
      },
    ],
  });

  return comment;
}

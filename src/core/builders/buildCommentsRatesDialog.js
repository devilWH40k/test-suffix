import { fabric } from "../fabric.js";
import { buildCommentList } from "./buildCommentList.js";
import { GENERAL_COMMENTS, QUESTIONS_COMMENTS } from "../../constants/commentsData.js";

export function buildCommentsRatesDialog({
  quizTitle,
  moderationPercent,
  startedAt,
  onClose,
  onEdit,
}) {
  return fabric.createElement("div", {
    classes: ["comments-rates-dialog", "primary-blue-color"],
    content: [
      {
        tag: "header",
        classes: ["comments-rates-dialog__header"],
        content: [
          {
            tag: "h4",
            classes: ["comments-rates-dialog__title", "text-big", "text-bold"],
            content: "Comments & rates",
          },
          {
            tag: "img",
            classes: ["comments-rates-dialog__close-icon"],
            attrs: {
              src: "./assets/icons/comments-rates-close-icon.svg",
              alt: "close icon",
            },
            onClick: onClose,
          },
        ],
      },

      {
        tag: "div",
        classes: ["comments-rates-dialog__quiz-info"],
        content: [
          {
            tag: "h5",
            classes: [
              "comments-rates-dialog__quiz-title",
              "text-bold",
              "text-regular",
            ],
            content: quizTitle,
          },
          {
            tag: "div",
            classes: ["comments-rates-dialog__bottom-block"],
            content: [
              {
                tag: "span",
                classes: ["badge", "badge--orange", "text-tiny", "text-bold"],
                content: `Moderate on ${moderationPercent}%`,
              },
              {
                tag: "div",
                classes: ["comments-rates-dialog__started-block"],
                content: startedAt ? ([
                  {
                    tag: "span",
                    classes: [
                      "comments-rates-dialog__moderation-text",
                      "text-small",
                      "light-color",
                    ],
                    content: "Started",
                  },
                  {
                    tag: "span",
                    classes: [
                      "comments-rates-dialog__moderation-text",
                      "text-small",
                      "primary-blue-color",
                    ],
                    content: ' ' + startedAt,
                  },
                ]) : (
                  {
                    tag: "span",
                    classes: [
                      "comments-rates-dialog__moderation-text",
                      "text-small",
                      "primary-blue-color",
                    ],
                    content: 'Not started',
                  }
                )
              },
            ],
          },
        ],
      },

      {
        tag: "main",
        classes: ["comments-rates-dialog__main"],
        content: [
          {
            tag: "div",
            classes: ["comments-rates-dialog__general-rate-block"],
            content: [
              {
                tag: "h4",
                classes: [
                  "comments-rates-dialog__rate-title",
                  "text-big",
                  "text-bold",
                ],
                content: "General rate",
              },
              {
                tag: "div",
                classes: ["comments-rates-dialog__comments"],
                content: buildCommentList(GENERAL_COMMENTS),
              },
            ],
          },

          {
            tag: "div",
            classes: ["comments-rates-dialog__quiz-questions-block"],
            content: [
              {
                tag: "h4",
                classes: [
                  "comments-rates-dialog__questions-title",
                  "text-big",
                  "text-bold",
                ],
                content: "Quiz questions",
              },
              {
                tag: "div",
                classes: ["comments-rates-dialog__comments"],
                content: buildCommentList(QUESTIONS_COMMENTS),
              },
            ],
          },
        ],
      },

      {
        tag: "div",
        classes: ["comments-rates-dialog__bottom-edit"],
        content: [
          {
            tag: "span",
            classes: ["comments-rates-dialog__bottom-edit-text", "text-small"],
            content:
              "You can view detailed recommendations from moderators in the quiz editor.",
          },
          {
            tag: "button",
            classes: [
              "comments-rates-dialog__edit-btn",
              "btn",
              "btn-primary",
              "text-regular",
            ],
            onClick: onEdit,
            content: [
              {
                tag: "img",
                classes: ["comments-rates-dialog__plus-icon"],
                attrs: {
                  src: "./assets/icons/plus.svg",
                  alt: "edit icon",
                },
              },
              " Edit",
            ],
          },
        ],
      },
    ],
  });
}

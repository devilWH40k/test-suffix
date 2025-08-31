import { fabric } from "../fabric.js";
import { buildComment } from "./buildComment.js";

export function buildCommentList(comments = []) {
  return fabric.createElement("div", {
    classes: ["comment-list"],
    content: comments.map((comment) => buildComment(comment)),
  });
}

import { $, addEvent } from "../util/util.js";

export default function MenuForm({ $target, onSubmit }) {
  this.$target = $target;
  this.$button = $("#espresso-menu-submit-button");

  addEvent("submit", $target, onSubmit);
}

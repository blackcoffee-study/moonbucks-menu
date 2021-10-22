import { addEvent } from "../util/util.js";
import Render from "./Render.js";

export default function EditDelete({ $target, state, callback, action }) {
  this.state = state;
  this.$target = $target;
  const { menu } = this.state;

  console.log($target);
  if (action === "delete") {
    menu.splice(idx, 1);
    return this.state;
  }

  if (action === "edit") {
    this.$target.forEach(($button) => {
      console.log("a");
      addEvent("click", $button, callback);
    });
  }
}

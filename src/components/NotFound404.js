import { MiniReact } from "../MiniReact.js";

export default class NotFound404 extends MiniReact.Component {
  async render() {
    document.title = "Rien à voir ici";
    return MiniReact.createElement("h1", { id: "404NotFound" }, [
      "Page introuvable 404",
    ]);
  }
}

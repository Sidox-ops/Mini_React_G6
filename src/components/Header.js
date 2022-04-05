import Component from "../Component.js";
import { MiniReact } from "../MiniReact.js";

export default class Header extends Component {
  render() {
    return MiniReact.createElement("div", { class: "header" }, [
      MiniReact.createElement("div", { class: "menu" }, [
        MiniReact.createElement("a", { class: "button", href: "/" }, ["HOME"]),
        MiniReact.createElement("a", { class: "button", href: "/meteo" }, [
          "METEO",
        ]),
        MiniReact.createElement("a", { class: "button", href: "/uploader" }, [
          "UPLOADER",
        ]),
        MiniReact.createElement("a", { class: "button", href: "/awards" }, [
          "AWARDS",
        ]),
        MiniReact.createElement("div", { id: "show" }),
        MiniReact.createElement("div", { id: "container" }),
      ]),
    ]);
  }
}

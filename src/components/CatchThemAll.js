import { MiniReact } from "../MiniReact.js";

export default class CatchThemAll extends MiniReact.Component {
  async renderImg() {
    let imgElement = document.createElement("img");
    imgElement.src = "/assets/pokemon.jpeg";
    document.querySelector("#container").appendChild(imgElement);
  }

  render() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }

    return MiniReact.createElement("div", null, [
      MiniReact.createElement(
        "button",
        { id: "show", onClick: () => this.renderImg() },
        ["catch them all"]
      ),
      MiniReact.createElement("div", { id: "container" }),
      MiniReact.createElement(
        "div",
        {
          id: "container",
          type: "button",
          onClick: () =>
            this.display({ count: `${this.properties.count + 1}` }),
        },
        [`${this.properties.count} current counter`]
      ),
      MiniReact.createElement("div", { id: "containerSw" }),
    ]);
  }
}

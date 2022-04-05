import { MiniReact } from "../MiniReact.js";
import { prop_access, type_check } from "../utils.js";
import AgreedConsent from "./AgreedConsent.js";

export default class Consent extends MiniReact.Component {
  renderImg() {}

  render() {
    // document.title = "Ce site vous plaît?";
    // // localStorage.clear();
    // return MiniReact.createElement("div", { id: "listNamesArray" }, [
    //   MiniReact.createElement(
    //     "span",
    //     { class: "consentDiv" },
    //     prop_access(localStorage, { consent: "string" })?.consent === true
    //       ? ["Vous êtes un ange"]
    //       : ["Soyez cool"]
    //   ),
    //   MiniReact.createElement(AgreedConsent),
    // ]);
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("service-worker.js");
    }
    return MiniReact.createElement("div", null, [
      MiniReact.createElement(
        "button",
        { id: "show", onClick: () => this.renderImg() },
        ["show me img"]
      ),
      MiniReact.createElement("div", { id: "container" }),
    ]);
    // document.querySelector("#show").addEventListener("click", () => {
    //   // const iconUrl = document.querySelector('select').selectedOptions[0].value;
    //   let imgElement = document.createElement("img");
    //   // imgElement.src = iconUrl;
    //   imgElement.src = "/assets/BDD.png";
    //   document.querySelector("#container").appendChild(imgElement);
    // });
  }
}

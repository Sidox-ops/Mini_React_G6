import { MiniReact } from "../MiniReact.js";
import { prop_access, type_check } from "../utils.js";
import AgreedConsent from "./AgreedConsent.js";

export default class Consent extends MiniReact.Component {
  render() {
    document.title = "Ce site vous plaît?";
    // localStorage.clear();
    return MiniReact.createElement("div", { id: "listNamesArray" }, [
      MiniReact.createElement(
        "span",
        { class: "consentDiv" },
        prop_access(localStorage, { consent: "string" })?.consent === true
          ? ["Vous êtes un ange"]
          : ["Soyez cool"]
      ),
      MiniReact.createElement(AgreedConsent),
    ]);
  }
}

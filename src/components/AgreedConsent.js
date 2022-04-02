import { MiniReact } from "../MiniReact.js";

export default class AgreedConsent extends MiniReact.Component {
  setConsent(response) {
    localStorage.consent = response;
  }

  render() {
    return MiniReact.createElement("form", { id: "formConsent" }, [
      MiniReact.createElement(
        "label",
        { class: "formConsentLabel", for: "name" },
        ["Consentez vous nous mettre une bonne note?"]
      ),
      MiniReact.createElement(
        "button",
        {
          class: "formConsentNo",
          onClick: () => this.setConsent(false),
        },
        ["Non"]
      ),
      MiniReact.createElement(
        "button",
        {
          class: "formConsentYes",
          onClick: () => this.setConsent(true),
        },
        ["Oui, évidemment"]
      ),
    ]);
  }
}

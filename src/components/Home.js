import { MiniReact } from "../MiniReact.js";
import Hello from "./Hello.js";

export default class Home extends MiniReact.Component {
  render() {
    document.title = "Home sweet home";
    return MiniReact.createElement(Hello, { id: "hello" }, [
      MiniReact.createElement("h1", null, [
        "Bienvenue ",
        this.properties?.name,
      ]),
      MiniReact.createElement(Hello, null, [
        MiniReact.createElement("h2", null, ["Hello World"]),
        MiniReact.createElement(Hello, null, ["Du texte"]),
      ]),
    ]);
  }
}

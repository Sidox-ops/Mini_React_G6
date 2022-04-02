import { MiniReact } from "../MiniReact.js";
import Hello from "./Hello.js";

export default class Home extends MiniReact.Component {
  render() {
    return MiniReact.createElement(Hello, { id: "hello" }, [
      MiniReact.createElement("h1", null, ["Bienvenue"]),
      MiniReact.createElement(Hello, null, [
        MiniReact.createElement("h2", null, ["Hello World"]),
        MiniReact.createElement(Hello, null, ["Du texte"]),
      ]),
    ]);
  }
}

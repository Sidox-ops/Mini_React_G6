import { MiniReact } from "../MiniReact.js"
import { Hello } from "./Hello.js"
import { Header } from "./Header.js"


const header = new Header();

export class App extends MiniReact.Component {
    render() {
      return MiniReact.createElement(Hello, { id: "hello" }, [
        header.render(),
        MiniReact.createElement("h1", null, ["Bienvenue"]),
        MiniReact.createElement(Hello, null, [
          MiniReact.createElement("h2", null, ["Hello World"]),
          MiniReact.createElement(Hello, null, ["Du texte"]),
        ]),
      ])
    }
  }
import { MiniReact } from "../MiniReact.js"
import { Hello } from "./Hello.js"
import { Header } from "./Header.js"
import { Uploader } from "./Uploader.js";
import { Meteo } from "./Meteo.js";


const header = new Header();
var type;
var attributes;
var children;

export async function Page() {
  const currentPath = window.location.pathname;
  let elem;
  //console.log("path", currentPath)
  switch (currentPath) {
    case "/":
      const app = new Hello();
      elem = app.render();
      break;
    case "/uploader":
      const uploader = new Uploader();
      elem = uploader.render();
      break;
    case "/meteo":
      const meteo = new Meteo();
      elem = await meteo.render();
      break;
  }

  console.log("elem", elem)
  type = elem.type;
  attributes = elem.attributes;
  children = elem.children; 

  return elem;
}

let component = await Page();

export class App extends MiniReact.Component {

  render() {
    return MiniReact.createElement("div", null, [
      MiniReact.createElement(Header, null, []),
      MiniReact.createElement(type, attributes, children)
    ])
  }
}
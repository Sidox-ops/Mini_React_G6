import { MiniReact } from "../MiniReact.js"
import { Hello } from "./Hello.js"
import { Header } from "./Header.js"
import { Uploader } from "./Uploader.js";
import { Meteo } from "./Meteo.js";


const header = new Header();

export async function Page() {
  const currentPath = window.location.pathname;
  let elem;
  console.log("path", currentPath)
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
  return elem;
}

export class App extends MiniReact.Component {
    render() {
      console.log("Page", Page());
      let component = Page();
      return MiniReact.createElement(Header, null, [
        MiniReact.createElement(component.type, component.attributes, component.child)
        
      ])
    }
  }
import { MiniReact } from "../MiniReact.js"


export class Hello extends MiniReact.Component {
    
  
    render() {
      return MiniReact.createElement("div", {class: "description"}, ["Description"]);
    }
}
import { MiniReact } from "../MiniReact.js"

export class Header extends MiniReact.Component {
  
    constructor(attributes, children) {
      super();
      this.attributes = attributes;
      this.children = children;
    }
  
    render() {
      return MiniReact.createElement("div", this.attributes, this.children);
    }
}
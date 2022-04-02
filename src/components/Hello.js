import { MiniReact } from "../MiniReact.js";

export default class Hello extends MiniReact.Component {
  static propTypes = {
    properties: {
      toWhat: {
        type: "string",
      },
    },
  };

  constructor(attributes, children) {
    super();
    this.attributes = attributes;
    this.children = children;
  }

  render() {
    return MiniReact.createElement("div", this.attributes, this.children);
  }
}

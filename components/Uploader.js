import { MiniReact } from "../MiniReact.js"
import { getFunctionBody } from "../utils.js";

export class Uploader extends MiniReact.Component {

  constructor(attributes, children) {
    super();
    this.attributes = attributes;
    this.children = children;
  }

  showFile() {
    var reader = new FileReader();
    reader.readAsText(document.getElementById("uploader").files[0], "utf-8");
    reader.onload = function (e) {
      alert(reader.result);
    };
  }

  render() { 
    return MiniReact.createElement("div", null, [
      MiniReact.createElement("div", { class: "description" }, ["Description"]),
      MiniReact.createElement("input", { id: "uploader", type: "file", onchange: getFunctionBody(this.showFile) }, [])
    ])
  }
}
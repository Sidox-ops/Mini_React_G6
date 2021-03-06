import { MiniReact } from "../MiniReact.js";
import { getFunctionBody } from "../utils.js";

export default class Uploader extends MiniReact.Component {
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
    document.title = "Upload tes fichiers ici";
    return MiniReact.createElement("div", null, [
      MiniReact.createElement(
        "input",
        {
          id: "uploader",
          type: "file",
          onchange: getFunctionBody(this.showFile),
        },
        []
      ),
    ]);
  }
}

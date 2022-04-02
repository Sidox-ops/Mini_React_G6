import Home from "./components/Home.js";
import Uploader from "./components/Uploader.js";
import Meteo from "./components/Meteo.js";
import NotFound404 from "./components/NotFound404.js";
import Header from "./components/Header.js";

String.prototype.interpolate = function (attributes) {
  return this;
};

export async function generatePage() {
  const currentPath = window.location.pathname;
  let header = new Header();
  let elem;
  switch (currentPath) {
    case "/":
      const home = new Home();
      elem = home.render();
      break;
    case "/uploader":
      const uploader = new Uploader();
      elem = uploader.render();
      break;
    case "/meteo":
      const meteo = new Meteo();
      elem = await meteo.render();
      break;
    default:
      const notFound404 = new NotFound404();
      elem = await notFound404.render();
      break;
  }
  console.log("%crouter.js line:31 root.firstChild", "color: #007acc;", root);
  if (root.firstChild) {
    root.replaceChild(generateStructure(elem), root.firstChild);
  } else {
    root.appendChild(generateStructure(header.render()));
    root.appendChild(generateStructure(elem));
  }
}

export const generateStructure = (structure) => {
  const node = document.createElement(structure.type);
  if (structure.attributes) {
    for (let attName in structure.attributes) {
      if (/on([A-Z].*)/.test(attName)) {
        const eventName = attName.match(/on([A-Z].*)/)[1].toLowerCase();
        node.addEventListener(eventName, structure.attributes[attName]);
      } else {
        node.setAttribute(attName, structure.attributes[attName]);
      }
    }
  }
  if (structure.dataset) {
    for (let attName in structure.dataset) {
      node.dataset[attName] = structure.dataset[attName];
    }
  }
  if (structure.children)
    for (let child of structure.children) {
      // console.log(
      //   "%cscript_migration.js line:293 child",
      //   "color: #007acc;",
      //   child
      // );
      if (child === undefined) continue;
      if (typeof child === "string") {
        node.appendChild(
          // document.createTextNode(child)
          document.createTextNode(child.interpolate(structure.attributes))
        );
      } else {
        node.appendChild(generateStructure(child));
      }
    }
  // console.log("node: " + node);
  structure.node = node;

  return node;
};

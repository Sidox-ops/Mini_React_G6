import { App } from "./components/App.js"

String.prototype.interpolate = function (attributes) {
    return this;
}

export function generatePage() {
    const currentPath = window.location.pathname;
    let elem;
    switch (currentPath) {
      case "/":
        const app = new App();
        elem = app.render();
        break;
    }
    if (root.firstChild) {
      root.replaceChild(generateStructure(elem), root.firstChild);
    } else {
      root.appendChild(generateStructure(elem));
    }
  }
  
  const generateStructure = (structure) => {
    const node = document.createElement(structure.type);
    console.log('%cscript_migration.js line:275 node', 'color: #007acc;', node);
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
        console.log('%cscript_migration.js line:293 child', 'color: #007acc;', child);
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
    structure.node = node;
  
    return node;
  };
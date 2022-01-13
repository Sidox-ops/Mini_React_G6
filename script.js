function renderReactElement(element) {
  const domElement = element.render();
  domElement.props = {
    key: element?.props?.key,
    ...domElement?.props
  };

  return domElement;
}

const MiniReact = {
  Component: class Component {},

  createElement(type, attributes = null, children) {
    if (typeof type === 'function') {
      // Créer un composant en lui passant dans son constructeur ses attributs et children (Voir ligne 42)
      const reactElement = new (type)(attributes, children);

      return renderReactElement(reactElement);
    }

    return {
      type: type,
      attributes: attributes,
      children: children,
    };
  }
};

class Hello extends MiniReact.Component {
  static propTypes = {
    properties: {
      toWhat: {
        type: "string",
      },
    },
  };

  // Récupération de ses attributs et children (voir ligne 19)
  constructor(attributes, children) {
    super();
    this.attributes = attributes;
    this.children = children;
  }

  render() {
    return MiniReact.createElement("div", this.attributes, this.children);
  }
}

class App extends MiniReact.Component {
  render() {
    return MiniReact.createElement(Hello, { id: "hello" }, [
      MiniReact.createElement("h1", null, ["Bienvenue"]),
      MiniReact.createElement(Hello, null, [
        MiniReact.createElement("h2", null, ["Hello World"]),
        MiniReact.createElement(Hello, null, ["Du texte"]),
      ]),
    ])
  }
}

String.prototype.interpolate = function (attributes) {
  return this;
}

function generatePage() {
  // document.title = history.state.title;
  const currentPath = window.location.pathname;
  let elem;
  switch (currentPath) {
    case "/home":
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

// Dispatch event rerender on <div id="root">
const root = document.querySelector('#root');
root.addEventListener("rerender", generatePage);
window.onpopstate = () => root.dispatchEvent(new Event("rerender"));
root.dispatchEvent(new Event("rerender"));
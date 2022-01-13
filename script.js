const root = document.querySelector('#root');

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

createElement(type, attributes = null, children){
    if (typeof type === 'function') {
    const reactElement = new (type)(attributes);
    reactElement.children = children;

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

    children = [];

    render() {
      return MiniReact.createElement("div", null, this.children);
    }
  }

class App extends MiniReact.Component {
    state = {
        users: [1, 2, 3],
    };
    constructor(){
        super();
        // this.state.currentUser = this.props.currentUser;
    }
    render() {
        return MiniReact.createElement(Hello, null, [
          MiniReact.createElement("h1", null, ["Bienvenue"]),
          MiniReact.createElement(Hello, null, [
            MiniReact.createElement("h2", null, ["Hello World"]),
            MiniReact.createElement(Hello, null, ["Du texte"]),
          ]),
        ])
    }
}
function link(label,path){
    const a = document.createElement('a');
    const textA = document.createTextNode(label);
    a.appendChild(textA);
    a.href=path;
    a.addEventListener('click',(e)=>{
        e.preventDefault();
        history.pushState({},textA,path);
        root.dispatchEvent(new Event('rerender'));
    });
    return a;

}

function Page1(){
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Page 1');
    h1.appendChild(text);
    h1.appendChild(link('Page 2','/page2'));
    h1.appendChild(link('Page 3','/page3'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 1")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1
}

function Page2() {
    const h1 = document.createElement('h1');
    const text = document.createTextNode('Page 2');
    h1.appendChild(text);
    h1.appendChild(link('Page 1','/page1'));
    h1.appendChild(link('Page 3','/page3'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 2")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1;
}

function Page3() {
    const h1 = document.createElement('h1');

    const text = document.createTextNode('Page 3');
    h1.appendChild(text);
    h1.appendChild(link('Page 1','/page1'));
    h1.appendChild(link('Page 2','/page2'));

    const h2 = document.createElement('h2');
    const title = document.createTextNode("Vous êtes sur la page 3")
    h2.appendChild(title);
    h1.appendChild(h2);

    return h1;
}

String.prototype.interpolate = function(attributes) {
    return this;
  }
  
function generatePage() {
    // document.title = history.state.title;
    const currentPath = window.location.pathname;
    let elem;
    switch (currentPath) {
      case "/page1":
        elem = Page1();
        break;
      case "/page2":
        elem = Page2();
        break;
      case "/page3":
        let app = new App();
        elem = app.render();
        break;
    }
    if (root.firstChild) {
      root.replaceChild(generateStructure(elem), root.firstChild);
    } else {
      root.appendChild(generateStructure(elem));
    }
}

root.addEventListener("rerender", generatePage);

window.onpopstate = () => root.dispatchEvent(new Event("rerender"));

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
root.dispatchEvent(new Event("rerender"));
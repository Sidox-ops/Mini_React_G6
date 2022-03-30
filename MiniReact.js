const MiniReact = {
    Component: class Component {},
  
    createElement(type, attributes = null, children) {
      if (typeof type === 'function') {
        // Créer un composant en lui passant dans son constructeur ses attributs et children
        const reactElement = new (type)(attributes, children);
  
        return reactElement.render();
      }
  
      return {
        type: type,
        attributes: attributes,
        children: children,
      };
    }
};
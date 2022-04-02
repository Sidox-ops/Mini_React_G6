import { isClass } from "./utils.js";
import Component from "./Component.js";

export const MiniReact = {
  Component,

  createElement(type, attributes = null, children) {
    if (isClass(type)) {
      // Créer un composant en lui passant dans son constructeur ses attributs et children
      const reactElement = new type(attributes, children);

      return reactElement.render();
    }

    return {
      type: type,
      attributes: attributes,
      children: children,
    };
  },
};

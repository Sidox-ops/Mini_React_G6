export default class Component {
  constructor(props) {
    this.properties = props;
  }

  display(newProps) {
    if (this.shouldUpdate(newProps)) this.render();
  }

  shouldUpdate(newProps) {
    return JSON.stringify(this.properties) != JSON.stringify(newProps);
  }
}

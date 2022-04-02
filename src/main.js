import { generatePage } from "./router.js";

const root = document.querySelector("#root");
root.addEventListener("rerender", generatePage);
window.onpopstate = () => root.dispatchEvent(new Event("rerender"));
root.dispatchEvent(new Event("rerender"));

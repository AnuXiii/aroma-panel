import routes from "./constants";
import Router from "./router";
import "./components/Navigation";
import "./components/Title";
import "./components/InputGenerator";
import "./components/SelectBox";
import "./components/Button";
import "./login.js";

// Initialize router after custom elements are defined
const router = new Router(routes);

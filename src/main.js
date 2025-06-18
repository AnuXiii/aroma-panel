import routes from "./constants";
import Router from "./router";
import Navigation from "./components/Navigation";
import Title from "./components/Title";
import InputGenerator from "./components/InputGenerator";
import SelectBox from "./components/SelectBox";
import Button from "./components/Button";

// Initialize router after custom elements are defined
const router = new Router(routes);

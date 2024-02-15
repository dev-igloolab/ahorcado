import "@fontsource/poppins"; // Defaults to weight 400
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/600.css"; // Weight 600
import "@fontsource/poppins/700.css"; // Weight 700
import "./app.css";
import App from "./App.svelte";

const app = new App({
  target: document.getElementById("app") as HTMLElement,
});

export default app;

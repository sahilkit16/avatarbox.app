import configureStore from "../store/configureStore";

window.addEventListener("load", () => {
  const store = configureStore();
  console.log(store);
})

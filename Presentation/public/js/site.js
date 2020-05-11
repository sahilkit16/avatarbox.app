const site = (function (){
  return {
    uncloak: () => {
      document.querySelectorAll(".script-enabled").forEach((element) => {
        element.classList.remove("cloak");
      });
    }
  }
})();
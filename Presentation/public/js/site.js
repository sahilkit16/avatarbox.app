const site = (function () {
  return {
    reportFeedback: (onLoad) => {
      Sentry.showReportDialog({ eventId, onLoad });
    },
    uncloak: () => {
      document.querySelectorAll(".script-enabled").forEach((element) => {
        element.classList.remove("cloak");
      });
    },
  };
})();

const site = (function () {
  return {
    reportFeedback: () => {
      Sentry.showReportDialog({ eventId });
    },
    uncloak: () => {
      document.querySelectorAll(".script-enabled").forEach((element) => {
        element.classList.remove("cloak");
      });
    },
  };
})();

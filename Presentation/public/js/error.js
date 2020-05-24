window.addEventListener("load", function () {
  site.uncloak();
  Sentry.init({ dsn: sessionStorage.SENTRY_DSN });
  const btnId = "btn-feedback";
  const btnFeedback = document.getElementById(btnId);
  if (btnFeedback) {
    btnFeedback.addEventListener("click", () => {
      site.reportFeedback(() => {
        document.getElementById(btnId).remove();
      });
    });
  }
});

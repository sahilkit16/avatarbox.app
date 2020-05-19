window.addEventListener("load", function () {
  site.uncloak();
  Sentry.init({ 
    dsn: 'https://83125bd9f55946968482f22cfc78d236@o391492.ingest.sentry.io/5241503'
  });
  const btnId = 'btn-feedback';
  document.getElementById(btnId)
          .addEventListener('click', () => {
            site.reportFeedback(() => {
              document.getElementById(btnId).remove();
            });
          });
})

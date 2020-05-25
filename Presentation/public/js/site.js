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
    subscribe(){
      var pusher = new Pusher('4b3d3754ce062c9899c6', {
        cluster: 'mt1'
      });
      var channel = pusher.subscribe('gravatar-channel');
      channel.bind('update-event', function({message}) {
        alert(message);
      });
    }
  };
})();

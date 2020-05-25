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
    subscribe(channelId){
      if(!channelId) throw new Error("missing channel id - could not subscribe to Pusher");
      const pusher = new Pusher('4b3d3754ce062c9899c6', {
        cluster: 'mt1'
      });
      const channel = pusher.subscribe(channelId);
      channel.bind('update-event', function({message}) {
        alert(message);
      });
    }
  };
})();

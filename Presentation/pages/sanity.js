import React from "react";
import Error from "./_error";
import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn:
    "https://83125bd9f55946968482f22cfc78d236@o391492.ingest.sentry.io/5241503",
});

function BrokenComponent({ breakit }) {
  if (breakit) {
    throw new Error("broken child component");
  }
  return <div />;
}

class SanityPage extends React.Component {
  constructor() {
    super();
    this.state = { breakit: false };
    this.jsError = this.jsError.bind(this);
    this.reactError = this.reactError.bind(this);
  }

  jsError() {
    try {
      _notDefined();
    } catch (error) {
      const eventId = Sentry.captureException(error);
      this.setState({ eventId, hasError: true });
    }
  }

  static getDerivedStateFromError(error) {
    const eventId = Sentry.captureException(error);
    return { eventId, hasError: true };
  }

  componentDidCatch(err, errInfo) {
    console.log(err, errInfo);
  }

  reactError() {
    this.setState({ breakit: true });
  }

  render() {
    if (this.state.hasError) {
      return <Error eventId={this.state.eventId} />;
    }
    return (
      <div>
        <p>
          <a href="/sanity/server-error">Trigger ExpressJS Server Error</a>
        </p>
        <p>
          <a href="/server-error">Trigger NextJS Server Error</a>
        </p>
        <p>
          <button onClick={this.jsError}>Trigger Javascript Error</button>
        </p>
        <p>
          <button onClick={this.reactError}>Trigger React Error</button>
        </p>
        <BrokenComponent breakit={this.state.breakit} />
      </div>
    );
  }
}

export default SanityPage;

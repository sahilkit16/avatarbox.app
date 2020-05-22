import React from "react";
import Error from "./_error";
import CrashReporter from "../../Common/crash-reporter.client";

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
      const crashReporter = new CrashReporter();
      this.setState({
        eventId: crashReporter.submit(error),
        hasError: true,
      });
    }
  }

  static getDerivedStateFromError(error) {
    const crashReporter = new CrashReporter();
    const eventId = crashReporter.submit(error);
    return { eventId, hasError: true };
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
          <a href="/sanity?server-error=1">Trigger NextJS Server Error</a>
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

SanityPage.getInitialProps = async ({ req }) => {
  if (req.query["server-error"]) {
    throw new Error("this is a test");
  }
  return {};
};

export default SanityPage;

import React from "react";
import Error from "../pages/_error";

function BrokenComponent({ breakit }) {
  if (breakit) {
    throw new Error("broken child component");
  }
  return <div />;
}

class BrokenPage extends React.Component {
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
      // TODO: log error to Sentry
      this.setState({ hasError: true });
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(err, errInfo) {
    console.log(err, errInfo);
  }

  reactError() {
    this.setState({ breakit: true });
  }

  render() {
    if (this.state.hasError) {
      return <Error />;
    }
    return (
      <div>
        <p>
          <a href="/server-error">Trigger 500 Server Error</a>
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

export default BrokenPage;

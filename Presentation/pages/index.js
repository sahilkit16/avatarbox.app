import React from 'react';
import HeroHead from '../components/hero-head';
import HeroBody from '../components/hero-body';
import HeroSection from '../components/hero-section';

class Index extends React.Component {
  constructor(props){
    super(props);
  }
  static getInitialProps = async ctx => {
    const user = ctx.query.user || null;
    const action = `/register/${user ? 'submit' : 'get-started'}`;
    return { user, action };
  }
  render() {
    return (
      <HeroSection title="Sign Up | Avatar Box">
        <HeroHead />
        <HeroBody
          user={this.props.user}
          action={this.props.action}
          headline="New Avatar, Daily"
          proposition="A handy resource to update your Gravatar icon"
        />
      </HeroSection>
    );
  }
}

export default Index;

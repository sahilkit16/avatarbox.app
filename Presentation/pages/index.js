import React from 'react';
import HeroHead from '../components/hero-head';
import HeroBody from '../components/hero-body';
import HeroSection from '../components/hero-section';

class Index extends React.Component {
  constructor(props){
    super(props);
  }
  static getInitialProps = async ctx => {
    const isAuthenticated = ctx.req.session.user;
    const { user } = ctx.query;
    const action = `/home/${user ? 'signin' : 'get-started'}`;
    return { user, action, isAuthenticated };
  }
  render() {
    return (
      <HeroSection>
        <HeroHead 
          title="Home | Avatar Box" 
          isAuthenticated={this.props.isAuthenticated}
        />
        <HeroBody
          user={this.props.user}
          action={this.props.action}
          headline="New Avatar, Daily"
          subtext="A handy resource to auto update your Gravatar icon"
        />
      </HeroSection>
    );
  }
}

export default Index;

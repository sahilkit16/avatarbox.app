import React from 'react';
import HeroHead from '../components/hero-head';
import HeroBody from '../components/hero-body';
import HeroSection from '../components/hero-section';

class Index extends React.Component {
  constructor(props){
    super(props);
  }
  static getInitialProps = async ctx => {
    const userid = (ctx.query.next && ctx.req.session.userid);
    const action = `/home/${userid ? 'sign-in' : 'get-started'}`;
    return { action, user: ctx.req.session.user };
  }
  render() {
    return (
      <HeroSection>
        <HeroHead 
          title="Home | Avatar Box" 
          user={this.props.user}
        />
        <HeroBody
          action={this.props.action}
          headline="New Avatar, Daily"
          subtext="A handy resource to auto update your Gravatar icon"
        />
      </HeroSection>
    );
  }
}

export default Index;

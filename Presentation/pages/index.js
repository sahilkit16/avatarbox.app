import React from 'react';
import HeroHead from '../components/hero-head';
import HeroBody from '../components/hero-body';
import HeroSection from '../components/hero-section';

class Index extends React.Component {
  render() {
    return (
      <HeroSection title="Sign Up | Avatar Box">
        <HeroHead />
        <HeroBody
          headline="New Avatar, Daily"
          proposition="A handy resource to update your Gravatar icon"
        />
      </HeroSection>
    );
  }
}

export default Index;

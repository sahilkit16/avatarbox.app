import React from 'react';
import HeroHead from '../components/hero-head';
import EncryptBody from '../components/encrypt-body';
import HeroSection from '../components/hero-section';

class Encrypt extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <HeroSection title="Encrypt Password | Avatar Box">
        <HeroHead />
        <EncryptBody/>
      </HeroSection>
    );
  }
}

export default Encrypt;

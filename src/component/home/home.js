

import Carousel from "../carousel/carousel";
import Features from "../features/features";
import React, { Component } from 'react';

class Home extends Component {
  render(){
  return (
     <React.Fragment>
      <Carousel  />
      <Features />
      </React.Fragment>
      

  );
  }
}

export default Home;
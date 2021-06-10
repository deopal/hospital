import React,{useState} from 'react';

import slider_1 from "../../assets/images/slider/slider_1.jpg";
import slider_2 from "../../assets/images/slider/slider_2.jpg";
import slider_3 from "../../assets/images/slider/slider_3.jpg";

import {Carousel,Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

        function Carousel_content() {
            const [index, setIndex] = useState(0);
          
            const handleSelect = (selectedIndex, e) => {
              setIndex(selectedIndex);
            };
          
            return (
                <div >
                <Carousel activeIndex={index} onSelect={handleSelect} className="w-100 h-100" >
                  <Carousel.Item>
                    <Image
                      className="d-block w-100"
                      src={slider_1}
                      style={{height:"90vh"}}
                      alt="First slide"
                    />
                    <Carousel.Caption  style={{color:'gray'}}>
                      <h3 style={{textDecoration:'underline'}}>Best medical facilities</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque,
                        aliquet sit amet elementum vel, vehicula eget eros. </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item >
                    <Image
                      className="d-block w-100"
                      src={slider_2}
                      style={{height:"90vh"}}
                      alt="Second slide"
                    />
            
                    <Carousel.Caption  style={{color:'white'}}>
                      <h3 style={{textDecoration:'underline'}}>Best medical facilities</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque,
                        aliquet sit amet elementum vel, vehicula eget eros.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      className="d-block w-100"
                      src={slider_3}
                      style={{height:"90vh"}}
                      alt="Third slide"
                    />
            
                    <Carousel.Caption  style={{color:'grey'}}>
                      <h3 style={{textDecoration:'underline'}}>Best medical facilities</h3>
                      <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque,
                        aliquet sit amet elementum vel, vehicula eget eros. 
                      </p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
                <hr className="m-4" />
                </div>
              );
          }

          export default Carousel_content;
  
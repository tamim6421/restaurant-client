
import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import img1 from '../../../assets/home/01.jpg'
import img2 from '../../../assets/home/02.jpg'
import img3 from '../../../assets/home/03.png'
import './Banner.css'

const Banner = () => {
    return (
        <div className='banner'>
              <Carousel autoPlay = {true} className='banner'>
                <div >
                    <img  src={img1} />
                    
                </div>
                <div>
                    <img src={img2}/>
                  
                </div>
                <div>
                    <img src={img3}/>
                  
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;
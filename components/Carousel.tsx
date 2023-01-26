import React from 'react';
import { Carousel } from 'antd';
import quote1 from '../quote1.jpg'
import quote2 from '../quote2.jpg'
import quote3 from '../quote3.jpg'
import quote4 from '../quote4.jpg'
import s from './style/Carousel.module.css'


const contentStyle: React.CSSProperties = {
    margin: '0 auto',
    width: '800px',
    height: '600px',
    marginTop: '30px',
};

const CarouselImage: React.FC = () => (
    <div className={s.background}>
        <Carousel autoplay>
            <div>
                <h3 style={contentStyle}><img src={quote1.src} alt="logo" style={{ objectFit: 'cover', width: '100%', height: '100%' }}></img></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src={quote2.src} alt="logo" style={{ objectFit: 'cover', width: '100%', height: '100%' }}></img></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src={quote3.src} alt="logo" style={{ objectFit: 'cover', width: '100%', height: '100%' }}></img></h3>
            </div>
            <div>
                <h3 style={contentStyle}><img src={quote4.src} alt="logo" style={{ objectFit: 'cover', width: '100%', height: '100%' }}></img></h3>
            </div>
        </Carousel>
    </div>
);

export default CarouselImage;
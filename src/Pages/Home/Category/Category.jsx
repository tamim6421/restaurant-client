import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import slid1 from '../../../assets/home/slide1.jpg'
import slid2 from '../../../assets/home/slide2.jpg'
import slid3 from '../../../assets/home/slide3.jpg'
import slid4 from '../../../assets/home/slide4.jpg'
import slid5 from '../../../assets/home/slide5.jpg'
import Title from '../../../components/Title/Title';

const Category = () => {

    return (
        <div className='my-10'>

            <Title
                title = {"From 11 am to 10 am"}
                subtitle={"Order Online"}
            ></Title>

               <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        autoplay = {true}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper mb-20"
      >
        <SwiperSlide>
            <img src={slid1} alt="" />
            <h3 className='text-center text-2xl uppercase text-gray-700 font-bold -mt-16 drop-shadow-xl'>salad</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={slid2} alt="" />
        <h3 className='text-center text-2xl uppercase text-gray-700 font-bold -mt-16 drop-shadow-xl'>Pizza</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={slid3} alt="" />
        <h3 className='text-center text-2xl uppercase text-gray-700 font-bold -mt-16 drop-shadow-xl'>soup</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={slid4} alt="" />
        <h3 className='text-center text-2xl uppercase text-gray-700 font-bold -mt-16 drop-shadow-xl'>dessert</h3>
        </SwiperSlide>
        <SwiperSlide>
        <img src={slid5} alt="" />
        <h3 className='text-center text-2xl uppercase text-gray-700 font-bold -mt-16 drop-shadow-xl'>salad</h3>
        </SwiperSlide>
      
      </Swiper>
        </div>
    );
};

export default Category;
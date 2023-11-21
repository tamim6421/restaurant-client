import { useEffect, useState } from "react";
import Title from "../../../../components/Title/Title";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Rating, ThinStar } from '@smastrom/react-rating'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '@smastrom/react-rating/style.css'


const Testimonials = () => {
    const[review, setReview] = useState([])
    const [rating, setRating] = useState(0);
    useEffect( () =>{
        fetch('http://localhost:5000/review')
        .then(res => res.json())
        .then(data => {
            setReview(data)
            
        })
    } ,[])
    // console.log(review)
    return (
        <section className=" my-20">
            <Title
            title={'What Our Client say'}
            subtitle={"Testimonials"}
            ></Title>

            <div>
            <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper  px-5 my-10"
      >
        {
            review.map(review =>  <SwiperSlide key={review._id}>
                <div className="text-center flex flex-col justify-center items-center pb-10 px-16 space-y-2">
                <Rating
                        style={{ maxWidth: 180 }}
                        value={review.rating}
                        onChange={setRating}
                        isRequired
                        />
                    <p>
                        {review.details}
                    </p>
                    <h1 className="text-2xl font-semibold">{review.name}</h1>
                </div>
            </SwiperSlide>)
        }
     
      </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
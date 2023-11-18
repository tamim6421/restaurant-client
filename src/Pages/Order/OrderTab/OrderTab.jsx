import FoodCard from "../../../components/FoodCard/FoodCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const OrderTab = ({item}) => {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };
    return (
        <div>
              <div className='grid gap-5 md:grid-cols-3'>
        {
          item.map(item => <FoodCard key={item._id} item={item}></FoodCard> )
        }
        </div>
        </div>
    );
};

export default OrderTab;
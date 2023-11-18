import { Link } from "react-router-dom";
import Cover from "../../../Shared/Cover/Cover";
import MenuItems from "../../../Shared/MenuItems/MenuItems";


const MenuCategory = ({items, img, title}) => {
  

    return (
        <div className="mb-20">
            {title && <Cover img={img} title={title}></Cover> }

               <div className='md:grid gap-10 grid-cols-2 mt-10 mb-5 '>
                {
                    items.map( item => <MenuItems key={item._id} item={item}></MenuItems>)
                }
            </div>
           <Link to={`/order/${title}`}>
           <button className="btn block mx-auto btn-outline"> Order Now</button>
           </Link>
        </div>
    );
};

export default MenuCategory;
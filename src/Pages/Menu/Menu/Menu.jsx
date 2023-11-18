import { Helmet } from "react-helmet-async";
import Cover from "../../../Shared/Cover/Cover";

import menuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'

import PopularMenu from "../../Home/Home/PopularMenu/PopularMenu";
import useMenu from "../../../hooks/useMenu";
import Title from "../../../components/Title/Title";
import MenuCategory from "../MenuCategory/MenuCategory";



const Menu = () => {
    const[menu, loading] = useMenu()
    const dessert = menu.filter( item => item.category === 'dessert')
    const salad = menu.filter( item => item.category === 'salad')
    const soup = menu.filter( item => item.category === 'soup')
    const pizza = menu.filter( item => item.category === 'pizza')
    const offered = menu.filter( item => item.category === 'offered')
  


    return (
        <div>
            <Helmet>
                <title>Boss Restaurant | Menu</title>
            </Helmet>
            {/* main cover  */}
          <Cover img={menuImg} title="our Menu"></Cover>

            <Title 
            title="Don't Miss"
            subtitle="Today's Offer"
            ></Title>

        {/* offered menu items  */}
            <MenuCategory  items={offered}></MenuCategory>

            {/* dessert menu items  */}
            <MenuCategory
            items={dessert}
            title='dessert'
            img = {dessertImg}
            ></MenuCategory>


            {/* pizza menu items  */}
            <MenuCategory
            items={pizza}
            title='pizza'
            img = {pizzaImg}
            ></MenuCategory>

            {/* salad menu items  */}
            <MenuCategory
            items={salad}
            title='salad'
            img = {saladImg}
            ></MenuCategory>

            {/* salad menu items  */}
            <MenuCategory
            items={soup}
            title='soup'
            img = {soupImg}
            ></MenuCategory>


        </div>
    );
};

export default Menu;
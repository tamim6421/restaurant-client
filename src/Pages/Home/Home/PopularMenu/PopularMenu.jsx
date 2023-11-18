import { useEffect, useState } from "react";
import Title from "../../../../components/Title/Title";
import MenuItems from "../../../../Shared/MenuItems/MenuItems";
import useMenu from "../../../../hooks/useMenu";


const PopularMenu = () => {
    const [menu, loading] = useMenu()
    const popular = menu.filter(item => item.category === 'popular')

    // const [menu, setMenu] = useState([])

    // useEffect( ()=>{
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popular = data.filter(item => item.category === 'popular')
    //         setMenu(popular)
    //     })
    // } ,[])

    // console.log(menu)
    return (
        <div>
            <Title
            title={'From Our Menu'}
            subtitle={"Popular Items"}
            ></Title>

            <div className='md:grid gap-10 grid-cols-2 mb-16'>
                {
                    popular.map( item => <MenuItems key={item._id} item={item}></MenuItems>)
                }
            </div>
        </div>
    );
};

export default PopularMenu;
/* eslint-disable no-unused-vars */


const MenuItems = ({item}) => {
    const{category, image, name, price, rating, recipe} = item
    // console.log(item)
    return (
        <div className="flex space-x-4">
            <img style={{borderRadius :'0 200px 200px 200px'}} src={image} alt="" className="w-[120px]" />
            <div>
                <h2>{name}---------</h2>
                <p> {recipe} </p>
            </div>
            <p className="text-orange-400">${price}</p>
        </div>
        
    );
};

export default MenuItems;
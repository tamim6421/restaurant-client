import Title from "../../../../components/Title/Title";
import featured from '../../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className="featured bg-fixed  pt-8 text-white ">
            <div className="">
            <div>
            <Title
            title={"Check it Out"}
            subtitle={"Featured Item"}
            ></Title>
            </div>
           <div className="md:flex justify-center items-center px-36  bg-slate-600 bg-opacity-50  py-10 gap-5">
          <div>
          <img src={featured} alt="" />
          </div>
            <div className="md:ml-10">
                <p> Aug 20, 3094</p>
                <p>where can i get some</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus voluptates quae expedita repellendus impedit iste, odit voluptate dolore consequatur excepturi est sequi odio dolor incidunt sunt facere. Maxime, sequi necessitatibus?</p>
                <button className="btn btn-outline border-0 border-b-4 text-white">red more</button>
            </div>
           </div>
            </div>
           
        </div>
    );
};

export default Featured;
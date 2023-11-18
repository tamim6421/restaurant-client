import { useLoaderData } from "react-router-dom";
import Title from "../../../components/Title/Title";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { FaEdit, FaUpload } from "react-icons/fa";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const UpdateItems = () => {
    const {category, image, name, recipe, price, _id} = useLoaderData()

    const { register, handleSubmit ,reset } = useForm();
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxios()

  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imagebb and get a url for this image 
    const imageFile = {image: data.image[0]}
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers:{
            'content-type' : 'multipart/form-data'
        }
    })
    if(res.data.success){
        // now send the menu item data send the database 
        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: res.data.data.display_url
        }
        // send data to the database 
        const menuResponse = await axiosSecure.patch(`/menu/${_id}`, menuItem)
        console.log(menuResponse.data)
        if(menuResponse.data.modifiedCount > 0){
            // reset()
            //show success popup
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${data.name} is updated to the menu`,
              showConfirmButton: false,
              timer: 1500
            });
            
        }
    }
  }
    
    
    return (
        <div>
            <Title title={"Update Items"} subtitle={"Refresh Information"}></Title>

            <div>
        <form className="shadow-xl rounded-lg p-3  pb-7" onSubmit={handleSubmit(onSubmit)}>

          {/* recipe name  */}

          <div className="form-control w-full my-7">
            <label className="label">
              <span className="label-text">Recipe Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              defaultValue={name}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>


          <div className=" md:flex gap-8 justify-center items-center">
            {/* category section  */}
            <div className="form-control w-full my-7">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
              defaultValue={category}
                {...register("category", { required: true })}
                className="select select-bordered w-full "
              >
                <option disabled value="default" >
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            {/* price section  */}

            <div className="form-control w-full my-7">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                {...register("price", { required: true })}
                type=""
                defaultValue={price}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

            {/* recipe details  */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Recipe Details</span>
                   
                </label>
                <textarea defaultValue={recipe} {...register("recipe", { required: true })} className="textarea textarea-bordered h-24" placeholder="Text here"></textarea>
               
                </div>

                <div className="form-control w-full " >
                <input defaultValue={image} type="file" {...register("image", { required: true })} className="file-input mt-5 file-input-bordered file-input-warning w-full max-w-xs" />
                </div>

                    <button className="btn bg-orange-400 text-white px-8 mt-5">Update Menu items <FaEdit></FaEdit> </button>
        </form>
      </div>
        </div>
    );
};

export default UpdateItems;
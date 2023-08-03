import { FaUtensils } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddItem = () => {
  const [axiosSecure] = useAxiosSecure();
  const img_hosting_token = import.meta.env.VITE_image_token;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ing_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(ing_hosting_url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        // console.log(imgResponse)
        if (imgResponse.success) {
          const imgUrl = imgResponse.data.display_url;
          const { name, recipe, category, price } = data;
          const newItem = {
            name,
            recipe,
            image: imgUrl,
            category,
            price: parseFloat(price),
          };
          console.log(newItem);
          axiosSecure.post("/menu", newItem).then((data) => {
            console.log("data", data.data);
            if(data.data.insertedId){
                reset()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Adeded successfully',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
          });
        }
      });
    console.log(data);
  };
  console.log(errors);

  return (
    <div className="w-full px-4">
      <div>
        <SectionTitle
          subHeading={"---What's new?---"}
          heading={"ADD AN ITEM"}
        ></SectionTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text font-semibold">Recipe name *</span>
          </label>
          <input
            type="text"
            placeholder="Recipe Name"
            {...register("name", { required: true, maxLength: 80 })}
            className="input input-bordered w-full "
          />
        </div>
        <div className="flex my-4">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              className="select select-bordered"
            >
              <option disabled selected>
                Category
              </option>
              <option>PIZZA</option>
              <option>SOUP Potter</option>
              <option>SALAD</option>
              <option>DRINKS</option>
              <option>DESSERT</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price *</span>
            </label>
            <input
              type="number"
              placeholder="Type here"
              {...register("price", { required: true })}
              className="input input-bordered w-full "
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Recipe Details*</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            {...register("recipe", { required: true })}
            placeholder="Recipe Details"
          ></textarea>
        </div>
        <div className="form-control w-full  my-5">
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register("image", { required: true })}
          />
        </div>

        <button className="btn btn-warning">
          Add Item<FaUtensils></FaUtensils>
        </button>
      </form>
    </div>
  );
};

export default AddItem;

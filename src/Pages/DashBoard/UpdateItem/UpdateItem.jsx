import React from "react";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTile/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import UseMenu from "../../../hooks/UseMenu";

const UpdateItem = () => {
  // const [menu, , refetch] = UseMenu();
  //   const [axiosSecure] = useAxiosSecure();

  // const menuItem = useLoaderData()
  // console.log("update",menuItem)

  const { id } = useParams();
  const [axiosSecure] = useAxiosSecure();
  console.log(id);
  const { data: item = {}, refetch } = useQuery({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await axiosSecure(`/menu/${id}`);
      return res.data;
    },

    enabled: !!id,
  });

  console.log(item);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("lala,fnmsafdjcns", data);
    const { name, recipe, category, price } = data;
    const newItem = {
  
      name,
      recipe,
      category,
      price: parseFloat(price),
    };
    console.log(newItem);
    axiosSecure.patch(`/menu/${id}`, newItem).then((data) => {
      console.log("data", data);
      if (data.data.modifiedCount > 0) {
        refetch();
        console.log("data", data.data);
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Updated successfully",
          showConfirmButton: false,
          timer: 1500,
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
          heading={"Update AN ITEM"}
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

        <button className="btn btn-warning">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;

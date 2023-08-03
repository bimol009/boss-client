import React,{useContext} from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";


const Register = () => {
  const {createUserEmailPass,createdProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {

    
    createUserEmailPass(data.email,data.password)
    .then(result=>{

      const loggeUser = result.user;
      console.log(loggeUser)

      createdProfile(data.name,data.photoURL)
      .then(()=>{
        const savedUser = {name: data.name,email:data.email,photoURL: data.photoURL}
        fetch('http://localhost:5000/users',{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(savedUser)
          
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.insertedId){
            reset()
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "User Sign up Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate('/')
          }
        })
       
        

       
      })
      .catch((error)=>{
        console.log(error)
      })
    })
  };

  return (
    <div>
      <Helmet>
        <title>BistroBoss | Register </title>
        <link rel="canonical" href="https://www.tacobell.com/" />
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">
                    This Name field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  {...register("photoURL", { required: true })}
                  placeholder="Photo Url"
                  className="input input-bordered"
                />
                {errors.photoURL && (
                  <span className="text-red-600">
                    This Photo field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">
                    This email field is required
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  {...register("password", {
                    required: true,
                    pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/,
                    minLength: 6,
                    maxLength: 20,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password?.type === "pattern" && (
                  <p className="text-error">
                    Minimum Six characters, at least one uppercase letter, one
                    lowercase letter and one number
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p className="text-error">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-error">Password is min 6 required</p>
                )}
             
                
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <p>
                Already have an account?{" "}
                <Link to="/login">
                  <button className="btn btn-link">Please Login</button>
                </Link>
                
                <button className="btn btn-primary" onClick={() => reset()}>
                  Reset
                </button>
              </p>
             <SocialLogin></SocialLogin>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

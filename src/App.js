import img from "./images/progammer.svg";
import "./App.css";
import Input from "./Input";
import { useState } from "react";

import joi from "joi-browser";

function App() {
  const [info, setInfo] = useState({
    fullname: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    comfirm: "",
  });
  const [errors, seterrors] = useState({});

  const checking = {
   fullname: joi.string().label("fullname"),
    email:joi.string().required().label('Email').email(),
    username: joi.string().alphanum().required().min(5).label("username"),
    phone: joi.number().required().min(9).integer().label("Phone"),
    password: joi.string().min(3).max(8).required(),
    comfirm: joi.ref("password"),
  };

  const validateProperty=({name,value})=>{
    const obj={[name]:value};
    const schema={[name]:checking[name]};
    const result=joi.validate(obj,schema);
    return result.error? result.error.details[0].message :null;
  }

  const handlechange = (e) => {
    const { name, value } = e.target;
    const errormessage=validateProperty(e.target)
    if(errors) errors[e.target.name]=errormessage
    else{
      delete errors[e.target.name]
    }
    setInfo((pre) => {
      return { ...pre, [name]: value };
    });
    seterrors(errors);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const result = joi.validate(info, checking, options);
    console.log(result);
    if(!result.error) return null;

    const errors = {};
    for(let item of result.error.details) errors[item.path[0]]=item.message;
    return errors
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    seterrors(errors ||{});
    if (errors) return;
    console.log("submited");
  };

  return (
    <div className="bg-gray-100 grid GCL   items-center h-[100vh] ">
      <div>
        <img src={img} className="" />
      </div>
      <div>
        <h2 className="text-4xl font-bold">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="py-[30px] px-[80px] grid grid-cols-2 gap-[12%] "
        >
          <Input
            value={info.fullname}
            label="Fullname"
            onChange={handlechange}
            placeholder="Your name"
            type='fullname'
            name='fullname'
            id='fullname'
            error={errors.fullname}
          />
          <Input
            value={info.email}
            label="Email"
            onChange={handlechange}
            placeholder="You@Example.com"
            type='text'
            name='email'
            id='email'
            error={errors.email}
          />
          <Input
            value={info.username}
            label="Username"
            onChange={handlechange}
            placeholder="Username"
            type='username'
            name='username'
            id='username'
            error={errors.username}
          />
          <Input
            value={info.phone}
            label="Phone"
            onChange={handlechange}
            placeholder="+252"
            type='phone'
            name='phone'
            id='phone'
            error={errors.phone}
          />
          <Input
            value={info.password}
            label="Password"
            onChange={handlechange}
            placeholder="password"
            type='password'
            name='password'
            id='password'
            error={errors.password}
          />
          <Input
            value={info.comfirm}
            label="Comfirm password"
            onChange={handlechange}
            placeholder="Retypr password"
            type='comfirm'
            name='comfirm'
            id='comfirm'
            error={errors.comfirm}
          />

          <button disabled={validate()} className="bg-sky-500 text-white text-xl p-2  rounded-md hover:bg-sky-700 ">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

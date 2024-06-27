import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contextApi/UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setUser}=useContext(UserContext);
  const nav= useNavigate();
  async function handlesubmit(e){
    e.preventDefault();
    try {
      await axios
        .post("/login", {
          email,
          password,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setUser(res.data)
            alert("Login Successful");
            nav('/');
          }
        });
    } catch (e) {
      console.log(e);
      alert(`Login Failed ${e.message}`);
    } 
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handlesubmit}>
          <input type="email" placeholder="your@email.com"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account ? <Link className="underline text-black" to={'/register'}>Register Now</Link>
             
          </div>
        </form>
      </div>
    </div>
  );
};

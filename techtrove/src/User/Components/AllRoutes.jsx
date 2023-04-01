import React from "react";

import { Route, Routes, useSearchParams } from "react-router-dom";
import { CreateAccount } from "../Pages/CreateAccount";



import Home from "../Pages/Home";
import { Login } from "../Pages/Login";
import Productspage from "../Pages/Productspage";
import Singleproductpage from "../Pages/Singleproductpage";

const AllRoutes = () => {
  const [seacrchparams, setSearchparams] = useSearchParams();
  const id = seacrchparams.getAll("id");
  console.log(id);
  return (
    <Routes>
      <Route path="/" element={<Home />} />

 
      <Route path="/login" element={<Login />} />
      <Route path="/createaccount" element={<CreateAccount />}/>
      
  
      <Route path="/cart" />
      <Route path="/products" element={<Productspage />} />
      <Route path="/products/:id" element={<Singleproductpage />} />

    </Routes>
  );
};

export default AllRoutes;

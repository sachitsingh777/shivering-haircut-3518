import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useLocation } from "react-router-dom";
// import styled from "styled-components";
import Productscard from "../Components/Productscard";
import { getData } from "../Redux/productReducer/action";

// export const Container = styled.div`
//   background-color: #fed9ff;
//   width: 20%;
//   overflow-y: scroll
//   text-align: center;
//   height: "100px";
//   overflowY: "scroll"
//   padding: 20px;
// `;
//GET /posts?title=json-server&author=typicode
const Productspage = () => {
  const data = useSelector((store) => store.productreducer.products);
  const dispatch = useDispatch();

  const [seacrchparams, setSearchparams] = useSearchParams();
  const initialfilter = seacrchparams.getAll("brand");
  const [filter, setFilter] = useState(initialfilter || []);
  const initialfilterrate = seacrchparams.getAll("rate");
  const [rating, setRating] = useState(initialfilterrate || []);
  const initialfiltercategory = seacrchparams.getAll("category");
  const [category, setCategory] = useState(initialfiltercategory || []);

  const location = useLocation();

  const handleChange = (e) => {
    let newfilter = [...filter];
    const value = e.target.value;
    if (newfilter.includes(value)) {
      newfilter = newfilter.filter((el) => el !== value);
    } else {
      newfilter.push(value);
    }
    setFilter(newfilter);
  };

  const handleChangerate = (e) => {
    let filterrate = [...rating];
    const value = e.target.value;

    if (filterrate.includes(value)) {
      filterrate = filterrate.filter((el) => el !== value);
    } else {
      filterrate.push(value);
    }
    setRating(filterrate);
  };
  const handleChangecategory = (e) => {
    let filtercategory = [...category];
    const value = e.target.value;

    if (filtercategory.includes(value)) {
      filtercategory = filtercategory.filter((el) => el !== value);
    } else {
      filtercategory.push(value);
    }
    setCategory(filtercategory);
  };
  const obj = {
    params: {
      brand: seacrchparams.getAll("brand"),
      rate: seacrchparams.getAll("rate"),
      category: seacrchparams.getAll("category"),
    },
  };

  //changing url by setting useparams

  useEffect(() => {
    let params = {
      brand: filter,
      rate: rating,
      category: category,
    };

    setSearchparams(params);
    dispatch(getData);
  }, [filter, rating, category]);

  //filterby getting use params
  useEffect(() => {
    dispatch(getData(obj));
  }, [location.search]);

  console.log(obj);
  return (
    <div style={{ display: "flex", height: "auto", gap: "2%" }}>
      <div
        style={{
          height: "600px",
          width: "20%",
          overflowY: "scroll",
        }}
      >
        <h4>Filtering products</h4>
        <h2>Filter by Brand</h2>
        <input
          type="checkbox"
          value={"Amazon"}
          onChange={handleChange}
          checked={filter.includes("Amazon")}
        />

        <label htmlFor="">Amazon</label>
        <br />
        <input
          type="checkbox"
          value={"iphone"}
          onChange={handleChange}
          checked={filter.includes("iphone")}
        />
        {/* hp,acer,Samsung,google,sony,DJI */}
        <label htmlFor="">iphone</label>
        <br />
        <input
          type="checkbox"
          value={"hp"}
          onChange={handleChange}
          checked={filter.includes("hp")}
        />
        <label htmlFor="">HP laptops</label>
        <br />
        <input
          type="checkbox"
          value={"acer"}
          onChange={handleChange}
          checked={filter.includes("acer")}
        />

        <label htmlFor="">Acer</label>
        <br />

        <input
          type="checkbox"
          value={"sony"}
          onChange={handleChange}
          checked={filter.includes("sony")}
        />

        <label htmlFor="">Sony</label>
        <br />
        <input
          type="checkbox"
          value={"google"}
          onChange={handleChange}
          checked={filter.includes("google")}
        />
        <label htmlFor="">Google</label>
        <br />
        <input
          type="checkbox"
          value={"sonos"}
          onChange={handleChange}
          checked={filter.includes("sonos")}
        />
        <label htmlFor="">Sonos</label>
        <br />
        <input
          type="checkbox"
          value={"toshiba"}
          onChange={handleChange}
          checked={filter.includes("toshiba")}
        />
        <label htmlFor="">Toshiba</label>
        <br />
        <hr />
        <h6>Filter by Rating</h6>
        <input
          type="checkbox"
          value={"⭐⭐⭐⭐⭐"}
          onChange={handleChangerate}
          checked={rating.includes("⭐⭐⭐⭐⭐")}
        />
        <label htmlFor=""> ⭐⭐⭐⭐⭐</label>
        <br />
        <input
          type="checkbox"
          value={"⭐⭐⭐⭐"}
          onChange={handleChangerate}
          checked={rating.includes("⭐⭐⭐⭐")}
        />
        <label htmlFor=""> ⭐⭐⭐⭐</label>
        <br />
        <input
          type="checkbox"
          value={"⭐⭐⭐"}
          onChange={handleChangerate}
          checked={rating.includes("⭐⭐⭐")}
        />
        <label htmlFor=""> ⭐⭐⭐</label>
        <br />
        <input
          type="checkbox"
          value={"⭐⭐"}
          onChange={handleChangerate}
          checked={filter.includes("⭐⭐")}
        />
        <label htmlFor=""> ⭐⭐</label>
        <br />
        <input
          type="checkbox"
          value={"⭐"}
          onChange={handleChangerate}
          checked={rating.includes("⭐")}
        />
        <label htmlFor=""> ⭐</label>
        <br />

        <hr />
        <h6>Filter by Category</h6>
        {/* TV,phone,electronic,laptop, */}
        <br />

        <input
          type="checkbox"
          value={"laptop"}
          onChange={handleChangecategory}
          checked={category.includes("laptop")}
        />
        {/* hp,acer,Samsung,google,sony,DJI */}
        <label htmlFor="">laptop</label>
        <br />
        <input
          type="checkbox"
          value={"phone"}
          onChange={handleChangecategory}
          checked={category.includes("phone")}
        />
        {/* hp,acer,Samsung,google,sony,DJI */}
        <label htmlFor="">Mobiles</label>
        <br />

        <input
          type="checkbox"
          value={"TV"}
          onChange={handleChangecategory}
          checked={category.includes("TV")}
        />
        <label htmlFor="">Telivisons</label>
        <br />
        <input
          type="checkbox"
          value={"electronic"}
          onChange={handleChangecategory}
          checked={category.includes("electronic")}
        />
        <label htmlFor=""> Other Gadgets</label>
        <br />
      </div>
      <div
        style={{
          overflowY: "scroll",
          height: "500px",
          width: "78%",
        }}
      >
        {data === undefined ? (
          <h1 style={{ color: "red" }}> Loading Error</h1>
        ) : (
          data.map((el, ind) => {
            return <Productscard key={el.id} {...el} />;
          })
        )}
      </div>
    </div>
  );
};

export default Productspage;
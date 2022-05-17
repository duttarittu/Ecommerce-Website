import React, { Fragment, useEffect } from 'react';
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import  Product from "./Product";
import MetaData from '../layout/MetaData';
import  getProduct from "../../actions/productAction";
import { useDispatch } from "react-redux";

const product = {
  name: "Blue Tshirt",
  images: [{url: "https://i.ibb.co/DRST11n/1.webp"}],
  price: "$300",
  _id : "abhishek"
}
const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])
  


  return (
    <Fragment>

      <MetaData title="Ecommerce" />
        <div className='banner'>
            <p>Welcome to Ecommerce</p>
            <h1>Find amezing products below</h1>
            <a href='#container'>
              <button>
                Scroll <CgMouse />
              </button>
            </a>
        </div>
        <h2 className='homeHeading'>Featured Products</h2>
        <div className='container' id="container">
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
          <Product product={ product } />
        </div>
    </Fragment>
  )
}

export default Home;
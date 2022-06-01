import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {clearErrors, getProductDetails} from "../../actions/productAction";
import ReactStars from 'react-rating-stars-component';
import {useAlert} from 'react-alert';

const Product = ({match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {product,loading,error} = useSelector((state) => state.productDetails);
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(match.params.id))
    }, [dispatch,match.params.id],error,alert);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25 ,
        value:product.rating,
        isHalf: true,
      };
    
  return (
      <Fragment>
          <div className='ProductDetails'>
              <div>
                      { product.images && product.images.map( (item,i ) => (
                          <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        
                        />
                      ))}
                  
              </div>

              <div>
                  <div className='detailsBlock-1'>
                      <h2>{product.name}</h2>
                      <p>Product #{product._id}</p>
                  </div>
                  <div className='detailsBlock-2'>
                      <ReactStars {...options} />
                      <span> ({product.numOfReviews} Reviews)</span>
                  </div>
                  <div className='detailsBlock-3'>
                      <h1>{`${product.price}`}</h1>
                      <div className='detailsBlock-3-1'>
                          <div className='detailsBlock-3-1-1'>
                              <button>-</button>
                              <input type="number" value="1"></input>
                              <button>+</button>
                          </div>{" "}
                          <button>Add to cart</button>
                      </div>
                      <p>
                          Status:{" "}
                          <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                      </p>
                  </div>
                  <div className='detailsBlock-4'>
                      description: <p>{product.description}</p>
                  </div>
                  <button className="submitReview">Submit Review</button>
              </div>
          </div>
      </Fragment>
    
  )
}

export default Product;
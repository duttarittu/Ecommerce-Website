import React, { Fragment, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import "./ProductDetails.css";
import FavoriteIcon from '@mui/icons-material/Favorite';
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


  return (
      <Fragment>
          <div className='ProductDetails'>
              <div className='product-images'>
                <Carousel>
                { product.images && product.images.map( (item,i ) => (
                          <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        
                        />
                      ))}
                </Carousel>
                      
              </div>
              <div className='product-info'>
                  <div className='price'>
                      <h1>Price</h1>
                      <h2>&#8377;{product.price}/-</h2>
                    </div>
                  <div className='product-details'>
                      <h2>Product Description</h2>
                      <p>{product.description}</p>
                    </div>
                    <div className='contact-details'><span>My contanct Details: </span><p>{product.contact}</p></div>
                    <div className='location'><span>My Address: </span><p>{product.location}</p></div>
                  <div className='date-love'>
                    <h4>{product.created}</h4>
                    <FavoriteIcon/>
                  </div>
              </div>
          </div>


          <div className='product-name'>
          <div >{product.name}</div>
          <div></div>
          <div></div>
          </div>

        


      </Fragment>
    
  )
}

export default Product;
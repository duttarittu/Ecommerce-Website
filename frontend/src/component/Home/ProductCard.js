 import React from 'react';
 import { Link } from "react-router-dom";
 import "./ProductCard.css"
//  import ReactStars from "react-rating-stars-component";
 
// const options = {
//     edit: false,
//     color: "rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size: window.innerWidth <600 ? 20 : 25,
//     value: 2.5,
//     isHalf: true
// };

 const ProductCard = ({ product }) => {
//   const options = {
//     edit: false,
//     color: "rgba(20,20,20,0.1)",
//     activeColor:"tomato",
//     size: window.innerWidth <600 ? 20 : 25,
//     value: product.ratings,
//     isHalf: true
// };
   return (
     <Link className='productCard' to={`/product/${product._id}`}>
         <img src={product.images[0].url} alt={product.name}/>
         <p>{product.name}</p>
         {/* <div>
             <ReactStars {...options} />
             <span>{product.numOfReviews}</span>
         </div> */}
         <span>&#8377;{product.price}</span>
         
         <div class="row">
          <div class="column"><h3>{product.location}</h3></div>
          <div class="column"><h4>{product.created.substring(0, 10)}</h4></div>
        </div>
         
     </Link>
   )
 }
 
 export default ProductCard;
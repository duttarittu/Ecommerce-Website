const res = require("express/lib/response");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//create Product 
exports.createProduct = catchAsyncErrors(async (req,res,next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      // public_id: result.public_id,
      // url: result.secure_url,
      public_id: "sample_id ",
      url: "sampleurl.com"
    });
  }

  req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
});

// Get all product
exports.getAllProduct = catchAsyncErrors(async (req,res,next) => {
    const resultPerPage = 80;
    const productsCount = await Product.countDocuments()

    const apiFeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products,
        productsCount
    });
});

// Get product details

exports.getProductDetails = catchAsyncErrors(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    res.status(200).json({
        success: true,
        product
    })

});


// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });

res.status(200).json({
    success: true,
    product
})
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404))
    }

    await product.remove();
    return res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })

});

//Create Review or update the review
exports.creteProductReview = catchAsyncErrors(async (req,res,next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString)
    if(isReviewed){
        product.reviews.forEach(rev => {
            if(rev.user.toString() === req.user._id.toString);
            rev.rating = rating;
            rev.comment = comment;
        })
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg=0;
    product.reviews.forEach(rev=>{
        avg+=rev.rating;
    })
    product.ratings = avg/product.reviews.length;
    await product.save({validateBeforeSave: false});
    res.status(200).json({
        success: true,
    })
})

//Get all reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  });

  //Delete review
    exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHanlder("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numOfReviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

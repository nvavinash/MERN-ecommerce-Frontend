import React from "react";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";
const ProductDetailsPage = () => {
  return (
    <>
      <Navbar />
      <ProductDetails />
      <Footer/>
    </>
  );
};

export default ProductDetailsPage;

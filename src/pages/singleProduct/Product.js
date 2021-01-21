import React from "react";
import { withRouter } from "react-router-dom";
import Products from '../../components/product/singleProduct.js';



 class Product extends React.Component {
  render() {
    return (
      <>
      <h1>Product view</h1>
      <Products/>
      </>
    );
  }
}

export default withRouter(Product)
import React from "react";
import { withRouter } from "react-router-dom";
import Products from '../../components/product/products.js';



 class Search extends React.Component {
  render() {
    return (
      <>
      <h1>Search view</h1>
      <Products/>
      </>
    );
  }
}

export default withRouter(Search)
import React from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Product from '../../components/product/product.js';
import * as ProductService from "../../services/product";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        errorInfo: null,
        products: [],

    };
  }

  async componentDidMount(){
    ProductService.getProducts()
      .then(
          (result) => {
              this.setState({
                products: result
              })
          },
          (error) => {
              this.setState({
                errorInfo:  error.toString()
              })
          }
      )
  }
  render() {
    return (
      <>
        <div>
          <Typography variant="h1" component="h2">
            Fafago
          </Typography>
          <Typography variant="h4" gutterBottom>
            Cuando haces pop, ya no hay stop.
          </Typography>
        </div>
        <div style={{ backgroundColor: "#eeeeee" }}>
          <Container maxWidth="lg">
            <Grid container spacing={1}>
            {this.state.products.map((product) => 
              <Product key={product.id} product = {product} currentRate = {{value: 1}}  chat={this.state.token} username={this.state.userId} noEdit={true}/>
            )}    
            </Grid>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Home)
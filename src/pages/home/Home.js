import React from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Product from '../../components/product/product.js';
import * as ProductService from "../../services/product";
import * as AuthService from "../../services/auth";
import jwt from "jsonwebtoken";
import { connect } from "react-redux";

function stateToProps(state) {
  return {
    token: state.userToken,
    data: jwt.decode(state.userToken),
  }
}
class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        errorInfo: null,
        userId: '',
        token: props.token,
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
      if(this.state.token){
        AuthService.getUser(this.state.token)
        .then(
          (result) => {
              this.setState({
                userId: result.userId
              })
          },
          (error) => {
              this.setState({
                errorInfo:  error.toString()
              })
          }
        )       
      }
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

export default connect(stateToProps)(withRouter(Home))
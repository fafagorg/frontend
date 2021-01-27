import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import FilterProduct from './filterProduct';
import * as ProductService from "../../services/product";
import * as AuthService from "../../services/auth";
import Select from 'react-select';
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';


function stateToProps(state) {
  return {
    token: state.userToken,
    data: jwt.decode(state.userToken),
  }
}

class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            products: [],
            isEditing: {},
            userId: '',
            exchangeRates: [],
            currentRate: {label:"EUR",value: 1},
            token: props.token,
            bannedWords: ['ticket','spam','exchange','date','dating','dm','whatsapp']

        };
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.filterProduct = this.filterProduct.bind(this);
    }

    async componentDidMount(){
      ProductService.getProductsFiltered("","","",window.location.search.replace("?category=", ""))
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


    ProductService.getExchangeRates().then(
      (result) => {
        result.push({label:"EUR",value: 1})
        this.setState({
          exchangeRates: result
        })
      },
      (error) => {
        this.setState({
          errorInfo:  error.toString()
        })
      }
    )  
    }
    handleChangeCurrency(currency){
      this.setState(() => ({
        currentRate: currency
      }))
    }


    handleCloseError(){
        this.setState({
            errorInfo: null
        })
    }

    addProduct(product) {
      if(isNaN(product.price)){
        this.setState({
          errorInfo:  "Price must be a number"
        })
      }else if(this.state.bannedWords.filter((b) => { return product.name.includes(b) }).length > 0 || this.state.bannedWords.filter((b) => { return product.category.includes(b) }).length > 0){
        this.setState({
          errorInfo:  "Banned word used in name or category"
        })
      }else{

        product.seller = this.state.userId;

        ProductService.addProduct(product, this.state.token );

        this.setState(prevState => {

          return({
              products: [...prevState.products, product]
          });          
        });
      }
    }

    filterProduct(filter) {        
      ProductService.getProductsFiltered(filter.name,filter.priceMin,filter.priceMax,filter.category)
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
      
        return(
          
        <div>
            <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
            <div style={{width: "80%"}}>
              <table className="table">
              <thead>
                  <tr>
                      <th>Name</th>
                      <th>PriceMax</th>
                      <th>PriceMin</th>
                      <th>Category</th>
                      <th>&nbsp;</th>
                  </tr>
              </thead>
              <tbody>
              <FilterProduct onFilterProduct={this.filterProduct}/>
              </tbody>
              </table>
            </div>
            <div style={{ backgroundColor: "#eeeeee" }}>
            <Container maxWidth="lg">
            <Grid container spacing={1}>
            {this.state.products.map((product) => 
              <Product key={product.id} product = {product} currentRate = {this.state.currentRate}  chat={this.state.token} username={this.state.userId} noEdit={true}/>
            )}
            </Grid>
            </Container>
            </div>
            <hr/>
            <div style={{width: "30%"}}>
            <text ><strong>Select the desired typed of currency to show: </strong></text>
            <Select options={this.state.exchangeRates} onChange={this.handleChangeCurrency.bind(this)}/>
            </div>
            

         
        </div>
        
        
        );
    }
}



export default connect(stateToProps)(Products);
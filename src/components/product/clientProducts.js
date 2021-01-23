import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import * as ProductService from "../../services/product";
import Select from 'react-select';



class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            products: [],
            exchangeRates: [],
            currentRate: {label:"EUR",value: 1},
            username: window.location.search.replace("?username=", "")

        };
    }

    async componentDidMount(){
      if(this.state.username){
        ProductService.getClientProducts(this.state.username)
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

    render() {
      
        return(
          
        <div>
            <Alert message={this.state.errorInfo} onClose={this.handleCloseError}/>
            <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Seller</th>
                    <th>Current currency</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            {this.state.products.map((product) => 
                <Product key={product.id} product = {product} currentRate = {this.state.currentRate} hidden={true} />
            )}
            <text><strong>Select the desired typed of currency: </strong></text>
            <Select options={this.state.exchangeRates} onChange={this.handleChangeCurrency.bind(this)}/>

            </tbody>
            </table>
        </div>
        
        
        );
    }
}



export default Products;
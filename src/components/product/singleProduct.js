import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import * as ProductService from "../../services/product";
import Select from 'react-select';
import jwt from "jsonwebtoken";
import { connect } from "react-redux";
import * as AuthService from "../../services/auth";
import EditProduct from './EditProduct';

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
            exchangeRates: [],
            currentRate: {label:"EUR",value: 1},
            idProduct: window.location.search.replace("?id=", ""),
            username: "",
            token: props.token,
            isEditing: {},
            bannedWords: ['ticket','spam','pikachu','date']
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
    }

    async componentDidMount(){

      if(this.state.token){
        AuthService.getUser(this.state.token)
        .then(
          (result) => {
              this.setState({
                username: result.userId
              })
          },
          (error) => {
              this.setState({
                errorInfo:  error.toString()
              })
          }
        )       
      }

      if(this.state.idProduct){
        ProductService.getProductById(this.state.idProduct)
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

    handleCancel(name, product){
      this.setState(prevState => {
        const isEditing = Object.assign({}, prevState.isEditing);
        delete isEditing[name];
        return {
          isEditing: isEditing
        }
      })
      
    }

    handleChange(name, product){
      this.setState(prevState => ({
        isEditing: {...prevState.isEditing, [name]: product}
      }))
    }

    handleSave(name, product){
      
      if(product.seller !== this.state.username){
        this.setState({
          errorInfo:  "You can not edit products that you do not own"
        })
      }else if(isNaN(product.price)){
        this.setState({
          errorInfo:  "Price must be a number"
        })
      }else if(this.state.bannedWords.filter((b) => { return product.name.includes(b) }).length > 0 || this.state.bannedWords.filter((b) => { return product.category.includes(b) }).length > 0){
        this.setState({
          errorInfo:  "Banned word used in name or category"
        })
      }else{
        this.setState(prevState => {
          const isEditing = Object.assign({}, prevState.isEditing);
          delete isEditing[name];
          
        
            const products = prevState.products;
            const pos = products.findIndex(p => p.id === product.id);
        
            let res = {isEditing: isEditing};
  
            if(product.seller === this.state.username){
              res.products = [...products.slice(0,pos), Object.assign({}, product), ...products.slice(pos+1)];    
            }
            return res;
  
        })

        ProductService.editProduct(product.id,product, this.state.token);
      }
    }

    handleEdit(product){
        this.setState(prevState =>({
          //const products = prevState.products;
          //if(!products.find(p => p.name === product.name)){
          //return ({
            isEditing: {...prevState.isEditing, [product.id]: product}
        }));
      //});
    }

    handleDelete(product) {
      if(product.seller !== this.state.username){
        this.setState({
          errorInfo:  "You can not delete a product that you do not own"
        })
      }else{

        ProductService.deleteProduct(product.id, this.state.token);
        this.setState(prevState => ({
          products: prevState.products.filter((p) => p.id !== product.id)
        }))
      }
      
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        })
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
                !this.state.isEditing[product.id] ?
                <Product key={product.id} product = {product} currentRate={this.state.currentRate} hidden={true} username={this.state.username}
                  chat={this.state.token}
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}/>
                :
                <EditProduct key={product.id} product = {this.state.isEditing[product.id]}
                  onCancel={this.handleCancel.bind(this, product.id)}
                  onChange={this.handleChange.bind(this, product.id)}
                  onSave={this.handleSave.bind(this, product.id)}/>
            )}
            <text><strong>Select the desired typed of currency: </strong></text>
            <Select options={this.state.exchangeRates} onChange={this.handleChangeCurrency.bind(this)}/>
            <br/>
            <a href="/search">
                <button className="btn btn-primary">Return to general search</button>
            </a>

            </tbody>
            </table>
        </div>
        
        
        );
    }
}



export default connect(stateToProps)(Products);
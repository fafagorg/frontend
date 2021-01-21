import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import NewProduct from './newProduct';
import EditProduct from './EditProduct';
import FilterProduct from './filterProduct';
import * as ProductService from "../../services/product";
import * as AuthService from "../../services/auth";
import Select from 'react-select';



class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            products: [],
            isEditing: {},
            userId: '',
            exchangeRates: [{value: 5, label: "DOLARES"}, {label:"EUR",value: 1}],
            currentRate: {label:"EUR",value: 1},

        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.filterProduct = this.filterProduct.bind(this);
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
      AuthService.getUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDQ0NzE2ODU2MzllNDczYmQ4MmQ4OSIsInVzZXJuYW1lIjoiYWxmcGFiIiwibmFtZSI6ImFsZnBhYiIsInN1cm5hbWUiOiJhbGZwYWIiLCJlbWFpbCI6ImFsZnBhYkBhbGZwYWIuY29tIiwicGhvbmUiOiI2NjYwMDAwMDAiLCJfX3YiOjB9LCJpYXQiOjE2MTEyMjA4MjAsImV4cCI6MTYxMTMwNzIyMH0.Yykb1Oyra8Gj9Moal2CdA1N4kgKrmZpyW15WHWBu4EQ')
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

    handleChangeCurrency(currency){
      this.setState(() => ({
        currentRate: currency
      }))
    }

    handleSave(name, product){
      this.setState(prevState => {
        const isEditing = Object.assign({}, prevState.isEditing);
        delete isEditing[name];
        
      
          const products = prevState.products;
          const pos = products.findIndex(p => p.id === product.id);
      
          let res = {isEditing: isEditing};

          if(product.seller === this.state.userId){
            res.products = [...products.slice(0,pos), Object.assign({}, product), ...products.slice(pos+1)];    
          }
          return res;

      })

      if(product.seller !== this.state.userId){
        this.setState({
          errorInfo:  "You can not edit products that you do not own"
        })
      }else{

        ProductService.editProduct(product.id,product);
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
      if(product.seller !== this.state.userId){
        this.setState({
          errorInfo:  "You can not delete a product that you do not own"
        })
      }else{

        ProductService.deleteProduct(product.id);
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

    addProduct(product) {        
        product.seller = this.state.userId;

        product.id = Math.max(...this.state.products.map(p => {
          return p.id;
        })) +1;
        ProductService.addProduct(product, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDQ0NzE2ODU2MzllNDczYmQ4MmQ4OSIsInVzZXJuYW1lIjoiYWxmcGFiIiwibmFtZSI6ImFsZnBhYiIsInN1cm5hbWUiOiJhbGZwYWIiLCJlbWFpbCI6ImFsZnBhYkBhbGZwYWIuY29tIiwicGhvbmUiOiI2NjYwMDAwMDAiLCJfX3YiOjB9LCJpYXQiOjE2MTEyMjA4MjAsImV4cCI6MTYxMTMwNzIyMH0.Yykb1Oyra8Gj9Moal2CdA1N4kgKrmZpyW15WHWBu4EQ' );

        this.setState(prevState => {

          return({
              products: [...prevState.products, product]
          });          
      });

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
            <NewProduct onAddProduct={this.addProduct}/>
            {this.state.products.map((product) => 
                !this.state.isEditing[product.id] ?
                <Product key={product.id} product = {product} currentRate = {this.state.currentRate}
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
            

            </tbody>
            </table>
        </div>
        
        
        );
    }
}



export default Products;
import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import NewProduct from './newProduct';
import EditProduct from './EditProduct';
import * as ProductService from "../../services/product";
import * as AuthService from "../../services/auth";




/*import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';*/


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            products: [],
            isEditing: {},
            userId: ''
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addProduct = this.addProduct.bind(this);
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
      AuthService.getUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDQ0NzE2ODU2MzllNDczYmQ4MmQ4OSIsInVzZXJuYW1lIjoiYWxmcGFiIiwibmFtZSI6ImFsZnBhYiIsInN1cm5hbWUiOiJhbGZwYWIiLCJlbWFpbCI6ImFsZnBhYkBhbGZwYWIuY29tIiwicGhvbmUiOiI2NjYwMDAwMDAiLCJfX3YiOjB9LCJpYXQiOjE2MTA4OTMwOTgsImV4cCI6MTYxMDk3OTQ5OH0.-MOgaxbtSEQaTi8kxf0dqHv0rk_TGEHiFFoJrd83b7Y')
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
        ProductService.addProduct(product);

        this.setState(prevState => {

          return({
              products: [...prevState.products, product]
          });          
      });

    }


    /*render() {
        const classes = makeStyles((theme) => ({
            root: {
              flexGrow: 1,
            },
            paper: {
              padding: theme.spacing(1),
              textAlign: 'center',
              color: theme.palette.text.secondary,
            },
          }));;
      
        function FormRow() {
          return (
            <React.Fragment>
              <Grid item xs={4}>
                <Paper className={classes.paper}>item</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>item</Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper className={classes.paper}>item</Paper>
              </Grid>
            </React.Fragment>
          );
        }
      
        return (
          <div className={classes.root}>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
              <Grid container item xs={12} spacing={3}>
                <FormRow />
              </Grid>
            </Grid>
          </div>
        );
      }*/

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
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            <NewProduct onAddProduct={this.addProduct}/>
            {this.state.products.map((product) => 
                !this.state.isEditing[product.id] ?
                <Product key={product.id} product = {product} 
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}/>
                :
                <EditProduct key={product.id} product = {this.state.isEditing[product.id]} 
                  onCancel={this.handleCancel.bind(this, product.id)}
                  onChange={this.handleChange.bind(this, product.id)}
                  onSave={this.handleSave.bind(this, product.id)}/>
            )}
            </tbody>
            </table>
        </div>
        
        
        );
    }
}



export default Products;
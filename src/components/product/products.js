import React from 'react';
import Product from './product.js';
import Alert from './Alert.js';
import NewProduct from './newProduct';
import EditProduct from './EditProduct';
import ProductsApi from './ProductApi';
import * as ProductService from "../../services/product";


/*import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';*/


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            products: [],
            isEditing: {}
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    componentDidMount(){
      ProductService.getProducts()
      .then(
          (result) => {
              this.setState({
                errorInfo: result
              })
          },
          (error) => {
              this.setState({
                errorInfo: "Problem with connection to server" 
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
        
        if (name === product.name) {
          const products = prevState.products;
          const pos = products.findIndex(p => p.name === product.name);
          return {
            products: [...products.slice(0,pos), Object.assign({}, product), ...products.slice(pos+1)],
            isEditing: isEditing
          }
        }

        return {
          errorInfo: "Cannot edit name"
        }
      })
    }

    handleEdit(product){
        this.setState(prevState =>({
          //const products = prevState.products;
          //if(!products.find(p => p.name === product.name)){
          //return ({
            isEditing: {...prevState.isEditing, [product.name]: product}
        }));
      //});
    }

    handleDelete(product) {
      this.setState(prevState => ({
        products: prevState.products.filter((p) => p.name !== product.name)
      }))
    }

    handleCloseError(){
        this.setState({
            errorInfo: null
        })
    }

    addProduct(product) {        
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
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
            <NewProduct onAddProduct={this.addProduct}/>
            {this.state.products.map((product) => 
                !this.state.isEditing[product.name] ?
                <Product key={product.name} product = {product} 
                  onEdit={this.handleEdit}
                  onDelete={this.handleDelete}/>
                :
                <EditProduct key={product.name} product = {this.state.isEditing[product.name]} 
                  onCancel={this.handleCancel.bind(this, product.name)}
                  onChange={this.handleChange.bind(this, product.name)}
                  onSave={this.handleSave.bind(this, product.name)}/>
            )}
            </tbody>
            </table>
        </div>
        
        
        );
    }
}



export default Products;
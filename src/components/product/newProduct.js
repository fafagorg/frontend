import React from 'react';
import * as AuthService from "../../services/auth";
const userId = AuthService.getUser('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMDQ0NzE2ODU2MzllNDczYmQ4MmQ4OSIsInVzZXJuYW1lIjoiYWxmcGFiIiwibmFtZSI6ImFsZnBhYiIsInN1cm5hbWUiOiJhbGZwYWIiLCJlbWFpbCI6ImFsZnBhYkBhbGZwYWIuY29tIiwicGhvbmUiOiI2NjYwMDAwMDAiLCJfX3YiOjB9LCJpYXQiOjE2MTA4OTMwOTgsImV4cCI6MTYxMDk3OTQ5OH0.-MOgaxbtSEQaTi8kxf0dqHv0rk_TGEHiFFoJrd83b7Y');

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', price: '', category: ''};
        this.changeProduct = this.changeProduct.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeProduct(event) {
        const name = event.target.name;
        const price = event.target.price;
        const category = event.target.category;
        const value = event.target.value;
        this.setState({
            [name]: value,
            [price]: value,
            [category]: value
        });
    }

    clickAdd() {
        this.props.onAddProduct(this.state);
        this.setState({
            name: '', price: '', category: ''
        });
    }

    render() {
        return(
            <tr>
                <td><input className="form-control" name="name" value={this.state.name} onChange={this.changeProduct}/></td>
                <td><input className="form-control" name="price" value={this.state.price} onChange={this.changeProduct}/></td>
                <td><input className="form-control" name="category" value={this.state.category} onChange={this.changeProduct}/></td>
                <td><button className="btn btn-primary" onClick={this.clickAdd}>Add Product</button></td>
            </tr>
        );
    }
}

export default NewProduct;
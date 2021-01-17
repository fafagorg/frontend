import React from 'react';

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
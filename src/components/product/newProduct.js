import React from 'react';

class NewProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', price: '', category: ''};
        this.changeProduct = this.changeProduct.bind(this);
        this.clickAdd = this.clickAdd.bind(this);
    }

    changeProduct(editing, event) {
        const data = event.target.value;
        if (editing == "name") {
            this.setState({
                name: data
            });
        } else if(editing == "price") {
            this.setState({
                price: data
            });    
        } else {
            this.setState({
                category: data
            }); 
        }
    }

    clickAdd() {
        this.props.onAddProduct(this.state);
    }

    render() {
        return(
            
            <tr>
                <td><input className="form-control" placeholder="Name" name="name" value={this.state.name} onChange={(event) => this.changeProduct("name", event)}/></td>
                <td><input className="form-control" placeholder="Price" name="price" value={this.state.price} onChange={(event) =>this.changeProduct("price", event)}/></td>
                <td><input className="form-control" placeholder="ategory" name="category" value={this.state.category} onChange={(event) =>this.changeProduct("category", event)}/></td>
                <td></td>
                <td></td>
                <td><button data-testid="add" className="btn btn-primary" onClick={this.clickAdd}>Add Product</button></td>
            </tr>
        );
    }
}

export default NewProduct;
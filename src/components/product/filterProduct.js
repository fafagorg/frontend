import React from 'react';
import { withHistory } from "../navigation/history";

class FilterProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', priceMax: '', priceMin: '', category: this.props.history.location.search.replace("?category=", "")};
        this.changeFilter = this.changeFilter.bind(this);
        this.clickFilter = this.clickFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    changeFilter(event) {
        const name = event.target.name;
        const priceMax = event.target.priceMax;
        const priceMin = event.target.priceMin;
        const category = event.target.category;
        const value = event.target.value;
        this.setState({
            [name]: value,
            [priceMax]: value,
            [priceMin]: value,
            [category]: value
        });
    }

    clickFilter() {
        this.props.onFilterProduct(this.state);
        this.props.history.push("/search?category=" + this.state.category)
    }
    clearFilter(event) {
        this.props.history.push("/search?category=")
        this.props.onFilterProduct(this.state);
        this.setState({
            name: '', priceMax: '', priceMin: '', category: ''
        });
        const name = event.target.name;
        const priceMax = event.target.priceMax;
        const priceMin = event.target.priceMin;
        const category = event.target.category;
        this.setState({
            [name]: '',
            [priceMax]: '',
            [priceMin]: '',
            [category]: ''
        });
    }

    render() {
        return(
            <tr>
                <td><input className="form-control" name="name" value={this.state.name} onChange={this.changeFilter}/></td>
                <td><input className="form-control" name="priceMax" value={this.state.priceMax} onChange={this.changeFilter}/></td>
                <td><input className="form-control" name="priceMin" value={this.state.priceMin} onChange={this.changeFilter}/></td>
                <td><input className="form-control" name="category" value={this.state.category} onChange={this.changeFilter}/></td>
                <td><button className="btn btn-primary" onClick={this.clickFilter}>Filter Products</button></td>
                <td><button className="btn btn-primary" onClick={this.clearFilter}>Clear filter</button></td>
            </tr>
        );
    }
}

export default withHistory(FilterProduct);
import React from 'react';

function Product(props){
    return(
    <tr>
        <td>{props.product.name}</td>
        <td>{props.product.price}</td>
        <td>{props.product.category}</td>
        <td>{props.product.seller}</td>
        <td hidden>{props.product.id}</td>
        <td>
            <button className="btn btn-primary" onClick={() => props.onEdit(props.product)}>Edit</button>
            <button className="btn btn-primary" onClick={() => props.onDelete(props.product)}>Delete</button>
        </td>
    </tr>
    );

}

export default Product;
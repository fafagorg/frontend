import React from 'react';

function Product(props){
    return(
        
    <tr>
        {!props.hiden &&
        <td><a href={"http://localhost:3000/product/?id="+ props.product.id}>{props.product.name}</a></td>
        }
        {props.hiden &&
        <td>{props.product.name}</td>
        }
        <td>{props.product.price * props.currentRate.value}</td>
        <td>{props.product.category}</td>
        <td>{props.product.seller}</td>
        <td>{props.currentRate.label}</td>
        <td hidden>{props.product.id}</td>
        {!props.hiden &&
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.product)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.product)}>Delete</button>
            </td>
        }

        
    </tr>
    );

}

export default Product;
import React from 'react';

function Product(props){
    return(
        
    <tr>
        {!props.hidden &&
        <td><a href={"/product/?id="+ props.product.id}>{props.product.name}</a></td>
        }
        {props.hidden &&
        <td>{props.product.name}</td>
        }
        <td>{props.product.price * props.currentRate.value}</td>
        <td>{props.product.category}</td>
        {!props.hideLink &&
        <td><a href={"/product/client/?username="+ props.product.seller}>{props.product.seller}</a></td>
        }
        {props.hideLink &&
        <td>{props.product.seller}</td>
        }
        <td>{props.currentRate.label}</td>
        <td hidden>{props.product.id}</td>
        {props.username === props.product.seller && !props.noEdit &&
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.product)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.product)}>Delete</button>
            </td>
        }
        {props.chat && props.product.seller !== props.username &&
            <a href={"/chat/"+props.username+"-"+props.product.seller+"-"+props.product.id}>
                <button className="btn btn-primary">Chat with seller</button>
            </a>
        }

        
    </tr>
    );

}

export default Product;
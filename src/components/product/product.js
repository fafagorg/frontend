import React from 'react';
import { Link } from "react-router-dom";

function Product(props){
    return(
        
    <tr>
        {!props.hidden &&
        <td><Link class="link" style={{ color: '#00F' }} to={"/product?id="+ props.product.id}>{props.product.name}</Link></td>
        }
        {props.hidden &&
        <td>{props.product.name}</td>
        }
        <td>{props.product.price * props.currentRate.value}</td>
        <td>{props.product.category}</td>
        {!props.hideLink &&
        <td><Link class="link" style={{ color: '#00F' }} to={"/product_client?username="+ props.product.seller}>{props.product.seller}</Link></td>
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
            <a href={"/chat?roomId="+props.username+"-"+props.product.seller+"-"+props.product.id}>
                <button className="btn btn-primary">Chat with seller</button>
            </a>
        }

        
    </tr>
    );

}

export default Product;
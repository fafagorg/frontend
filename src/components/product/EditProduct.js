import React from 'react';

function EditProduct(props) {
    const handleChange = event => {
        props.onChange({...props.product, [event.target.name]: event.target.value})
    }
    return (
        <tr>
            <td><input clasName="from-control" name="name" value={props.product.name} onChange={handleChange}/></td>
            <td><input clasName="from-control" name="price" value={props.product.price} onChange={handleChange}/></td>
            <td><input clasName="from-control" name="category" value={props.product.category} onChange={handleChange}/></td>
            <td>
                <button className="btn btn-primary" onClick={() =>props.onSave(props.product)}>Save</button>
                <button className="btn btn-primary"onClick={() => props.onCancel(props.product)}>Cancel</button>
            </td>
        </tr>
    )
    
}

export default EditProduct;
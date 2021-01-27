import React from 'react';

function EditProduct(props) {
    const handleChange = event => {
        props.onChange({...props.product, [event.target.name]: event.target.value})
    }
    return (
        <>
            <input clasName="from-control" name="name" value={props.product.name} onChange={handleChange}/>
            <input clasName="from-control" name="price" value={props.product.price} onChange={handleChange}/>
            <input clasName="from-control" name="category" value={props.product.category} onChange={handleChange}/>
            <input clasName="from-control" name="seller" value={props.product.seller}/>
            <input hidden clasName="from-control" name="id" value={props.product.id}/>

                <button className="btn btn-primary" onClick={() =>props.onSave(props.product)}>Save</button>
                <button className="btn btn-primary" onClick={() => props.onCancel(props.product)}>Cancel</button>
  
        </>
    )
    
}

export default EditProduct;
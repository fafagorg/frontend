import React from 'react';

function EditReview(props) {

    const handleChange = event => {
        props.onChange({ ...props.review, [event.target.name]: event.target.value })
    }

    return (
        <tr>
            <td><input className="form-control" name="title" value={props.review.title} onChange={handleChange}></input></td>
            <td><input className="form-control" name="score" value={props.review.score} onChange={handleChange}></input></td>
            <td><input className="form-control" name="description" value={props.review.description} onChange={handleChange}></input></td>
            <td>{props.review.dateCreated}{/*<input className="form-control" name="dateCreated" value={props.review.dateCreated} onChange={handleChange}></input>*/}</td>
            <td><input className="form-control" name="reviewerClientId" value={props.review.reviewerClientId} onChange={handleChange}></input></td>
            <td><input className="form-control" name="reviewedProductId" value={props.review.reviewedProductId} onChange={handleChange}></input></td>
            <td>{props.review.externalScore}{/*<input className="form-control" name="dateCreated" value={props.review.dateCreated} onChange={handleChange}></input>*/}</td>

            <td><button className="btn btn-primary" onClick={() => props.onSave(props.review)}>Save</button></td>
            <td><button className="btn btn-primary" onClick={() => props.onCancel(props.review)}>Cancel</button></td>
        </tr>
    );
}

export default EditReview;
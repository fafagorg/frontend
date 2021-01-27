import React from 'react';
import ReviewsApi from './ReviewsApi.js';
import * as ROUTES from "../../constants/routes";
import { connect } from 'react-redux'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';


class EditReview extends React.Component {

    constructor(props) {
        super(props);
        const params = window.location.pathname.replace(ROUTES.EDITREVIEW + '/', '').split('/');
        this.id = params[0] || undefined;

        this.state = {
            item: {
                "title": "Review",
                "score": 3,
                "description": "Review",
                "reviewedProductId": "1",
                "comments": [],
                "id": "5a07ff02-6d6b-47d3-b9ca-570f1666946b",
                "dateCreated": "2021-01-26T13:35:01.017Z",
                "externalScore": "Positive",
                "reviewerClientId": "123456"
            }
        };

        this.changeHandler = this.changeHandler.bind(this);
    }


    changeHandler = event => {
        event.persist();

        let value = event.target.value;

        this.setState(prevState => ({
            item: { ...prevState.item, [event.target.name]: value }
        }))
        console.log(this.state)
    };

    async componentDidMount() {
        const result = await ReviewsApi.getReview(this.id)
        this.state.item = result;
    }

    async saveReview() {
        const result = ReviewsApi.putReview(this.props.token, this.state.item.id, this.state.item)
        this.props.history.push('/profile')
    }

    render() {

        function goBack() {
            window.history.back();
        }

        return (
            <>
                <h2>Edit your review:</h2>
                <tr>
                    <td>Title</td>
                    <td>Description</td>

                </tr>
                <tr>
                    <td><input className="form-control" name="title" value={this.state.item.title} onChange={this.changeHandler}></input></td>

                    <td><input className="form-control" name="description" value={this.state.item.description} onChange={this.changeHandler}></input></td>
                </tr>
                <br></br>
            Score:
                <br></br>
                <Rating
                    name="customized-empty"
                    defaultValue={1}
                    precision={1}
                    onChange={(event, newValue) => {
                        this.state.item.score = newValue
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
                <br></br>
                <button style={{ margin: '10px' }} className="btn btn-primary" onClick={() => this.saveReview()}>Save review</button>

            </>
        );
    }

}

function mapStateToProps(state) {
    return {
        userToken: state.userToken,
        username: state.username
    }
}
export default connect(mapStateToProps)(EditReview);

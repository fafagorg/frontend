import React from 'react';
import Review from './Review.js';
import Alert from './Alert.js';
import NewReview from './NewReview.js';
import EditReview from './EditReview.js';
import ReviewsApi from './ReviewsApi.js';

class Reviews extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            errorInfo: null,
            reviews: [],
            isEditing: {}
        };

        this.handleEdit = this.handleEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addReview = this.addReview.bind(this);
        this.loadReviews = this.loadReviews.bind(this);
    }

    async loadReviews() {
        try {
            let result = await ReviewsApi.getAllReviews();
            this.setState({
                reviews: result
            });
        } catch (error) {
            this.setState({
                errorInfo: "There was a problem with the connection to the server"
            });
        }
    }

    async componentDidMount() {
        await this.loadReviews();
    }

    handleEdit(review) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [review.id]: review }
        }));
    }

    async handleDelete(review) {
        try {
            await ReviewsApi.deleteReview(review.id);
        } catch (error) {
            this.setState({
                errorInfo: "There was an error deleting review"
            });
        }

        await this.loadReviews();
    }

    handleCancel(id, review) {
        this.setState(prevState => {
            const isEditing = Object.assign({}, prevState.isEditing);
            delete isEditing[id];

            return {
                isEditing: isEditing
            }
        });
    }

    handleChange(id, review) {
        this.setState(prevState => ({
            isEditing: { ...prevState.isEditing, [id]: review }
        }));
    }

    async handleSave(id, review) {

        if (review.title === '') {
            this.setState({
                errorInfo: "Title cannot be empty"
            });
        }

        if (Number(review.score) < 1 || Number(review.score) > 5) {
            this.setState({
                errorInfo: "Score must be a number between 1 and 5"
            });
        }

        try {
            await ReviewsApi.putReview(id, review);
            this.setState(prevState => {
                const isEditing = Object.assign({}, prevState.isEditing);
                delete isEditing[id];
                return {
                    isEditing: isEditing
                }
            });
        } catch (error) {
            this.setState({
                errorInfo: "There was an error updating review"
            });
        }

        await this.loadReviews();
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    async addReview(review) {
        if (review.title === '') {
            this.setState({
                errorInfo: "Title cannot be empty"
            });
        }

        if (Number(review.score) < 1 || Number(review.score) > 5) {
            this.setState({
                errorInfo: "Score must be a number between 1 and 5"
            });
        }

        try {
            await ReviewsApi.postReview(review)
        } catch (error) {
            this.setState({
                errorInfo: "There was an error adding review"
            });
        }

        await this.loadReviews();
    }

    render() {
        return (
            <div>
                <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />

                <table class="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Score</th>
                            <th>Description</th>
                            <th>Created at</th>
                            <th>Reviewer</th>
                            <th>Reviewed product</th>
                            <th>Sentiment</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <NewReview onAddReview={this.addReview} />
                    {this.state.reviews.map((review) =>
                        !this.state.isEditing[review.id] ?
                            <Review key={review.id} review={review} onEdit={this.handleEdit}
                                onDelete={this.handleDelete} />
                            :
                            <EditReview key={review.id} review={this.state.isEditing[review.id]}
                                onCancel={this.handleCancel.bind(this, review.id)}
                                onChange={this.handleChange.bind(this, review.id)}
                                onSave={this.handleSave.bind(this, review.id)} />
                    )}
                </table>

            </div>
        );
    }
}

export default Reviews;
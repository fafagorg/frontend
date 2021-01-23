import React from "react";


import RecipeReviewCard from './ReviewCard'


import * as ROUTES from "../../constants/routes";

import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Alert from './Alert.js';
import NewReview from './NewReview.js';
import ReviewsApi from './ReviewsApi.js';




const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },

})(Rating);



class Review extends React.Component {

  constructor(props) {
    super(props);
    const params = window.location.pathname.replace(ROUTES.REVIEWS + '/', '').split('/');
    this.type = params[0] || undefined;
    this.id = params[1] || undefined

    this.state = {
      errorInfo: null,
      reviews: []
    };

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

  async addReview(review) {
    if (review.title === '') {
      this.setState({
        errorInfo: "Title cannot be empty"
      });
      return false;
    }

    if (Number(review.score) < 1 || Number(review.score) > 5) {
      this.setState({
        errorInfo: "Score must be a number between 1 and 5"
      });
      return false;
    }

    try {
      await ReviewsApi.postReview(review)
    } catch (error) {
      this.setState({
        errorInfo: "There was an error adding review"
      });
    }

    await this.loadReviews();
    return true;
  }




  handleCloseError() {
    this.setState({
        errorInfo: null
    });
}


  render() {
    var reviewCards = []
    this.state.reviews.forEach(review => {
      reviewCards.push(<RecipeReviewCard review={review}></RecipeReviewCard>)
    })

    return (
      <>
        <div>
          <Alert message={this.state.errorInfo} onCloseCallback={this.handleCloseError} />
          {reviewCards}
          <br></br>
          <NewReview onAddReview={this.addReview} />

        </div>
      </>
    );
  }
}

export default Review;

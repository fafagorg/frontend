import React from "react";

import RecipeReviewCard from '../../components/reviews/ReviewCard'
import Alert from '../../components/reviews/Alert.js';
import NewReview from '../../components/reviews/NewReview.js';
import * as ROUTES from "../../constants/routes";
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import ReviewsApi from './ReviewsApi.js';
import { connect } from 'react-redux'




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
      let result;
      if (this.type == 'client' || this.type == 'product') {
        result = await ReviewsApi.getReviewsByTypeAndId(this.type, this.id);
      }
      else {
        this.setState({
          reviews: [],
          errorInfo: "Type " + this.type + " not compatible"
        });
        return;
      }
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
    if (review.description === '') {
      this.setState({
        errorInfo: "Description cannot be empty"
      });
      return false;
    }
    if (this.type == "product") {
      review.reviewedProductId = this.id
    } else if (this.type == "client") {
      review.reviewedClientId = this.id
    }

    if (Number(review.score) < 1 || Number(review.score) > 5) {
      this.setState({
        errorInfo: "Score must be a number between 1 and 5"
      });
      return false;
    }

    try {
      let containBadWords = await ReviewsApi.checkBadWords(review);
      if (!containBadWords) {
        await ReviewsApi.postReview(this.props.userToken, review)
      } else {
        this.setState({
          errorInfo: "Your review contains bad words. Please be polite."
        });
        return false;
      }

    } catch (error) {
      this.setState({
        errorInfo: "There was an error adding review" + error
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



function mapStateToProps(state) {
  return {
    userToken: state.userToken
  }
}
export default connect(mapStateToProps)(Review);

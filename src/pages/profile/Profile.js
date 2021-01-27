import React from "react";
import RecipeReviewCard from '../../components/reviews/ReviewCard'
import ProfileApi from './ProfileApi.js';
import ReviewsApi from '../reviews/ReviewsApi.js';
import { connect } from 'react-redux';
import Alert from '../../components/reviews/Alert.js';
import * as ROUTES from "../../constants/routes";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import NewReview from '../../components/reviews/NewReview.js';


class Profile extends React.Component {

  constructor(props) {
    super(props);

    const params = window.location.pathname.replace(ROUTES.USER_PROFILE + '/', '').split('/');
    this.profileId = params[0] || undefined;

    this.state = {
      errorInfo: null,
      name: '',
      surname: '',
      email: '',
      photo: '',
      reviewsDone: [
      ],
      reviewsReceived: [],
      products: []
    };

    this.handleCloseError = this.handleCloseError.bind(this);
    this.getProfileTitle = this.getProfileTitle.bind(this);
    this.addComment = this.addComment.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
    this.addReview = this.addReview.bind(this);
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

    review.reviewedClientId = this.profileId


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

  async deleteReview(reviewId) {
    try {
      await ReviewsApi.deleteReview(this.props.userToken, reviewId)
    } catch (error) {
      this.setState({
        errorInfo: "There was an error removing the review" + error
      });
    }

    await this.loadReviews();
    return true;
  }


  async loadReviews() {
    try {
      let result = await ProfileApi.getProfile(this.props.username);
      if (result.err) {
        this.setState({
          errorInfo: result.err
        });
        return;
      }
      this.setState({
        name: result.name,
        surname: result.surname,
        email: result.email,
        photo: result.photo
      });
      if (result.reviews && result.reviews.reviewsDone && result.reviews.reviewsReceived) {
        this.setState({
          reviewsDone: result.reviews.reviewsDone,
          reviewsReceived: result.reviews.reviewsReceived
        });
      } else {
        this.setState({
          errorInfo: "Error obtaining profile"
        });
      }

    } catch (error) {
      this.setState({
        errorInfo: "There was a problem with the connection to the server"
      });
    }
  }

  async componentDidMount() {
    await this.loadReviews();
  }

  handleCloseError() {
    this.setState({
      errorInfo: null
    });
  }

  async addComment(comment, reviewId) {
    if (comment.body === '') {
      this.setState({
        errorInfo: "Comment title cannot be empty"
      });
      return false;
    }
    comment.clientId = this.props.username;
    try {
      await ReviewsApi.postComment(this.props.userToken, comment, reviewId)
    } catch (error) {
      this.setState({
        errorInfo: "There was an error adding review" + error
      });
    }

    await this.loadReviews();
    return true;
  }


  getProfileTitle() {
    return <>
      <Avatar alt="Profile photo" style={{ width: 100, height: 100 }} src={this.state.photo} />
      <h1>{this.state.name} {this.state.surname} profile</h1>

    </>
  }



  render() {

    var reviewsDoneCards = [];
    var reviewsReceivedCards = [];
    console.log(this.state)
    this.state.reviewsDone.forEach(review => {
      reviewsDoneCards.push(<RecipeReviewCard deleteReview={this.deleteReview} deleteButton={review.reviewerClientId === this.props.username} review={review} addComment={this.addComment}></RecipeReviewCard>)
    })
    this.state.reviewsReceived.forEach(review => {
      reviewsReceivedCards.push(<RecipeReviewCard deleteReview={this.deleteReview} deleteButton={review.reviewerClientId === this.props.username} review={review} addComment={this.addComment}></RecipeReviewCard>)
    })




    return (
      <>

        <Alert message={this.state.errorInfo} onCloseCallback={this.handleCloseError} />
        {this.getProfileTitle()}
        <a href={"/product_client?username=" + this.props.username}>
          <br></br>
          <button className="btn btn-primary">👁‍🗨  See {this.props.username} products</button>
        </a>
        <br></br>
        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div style={{ marginLeft: '20px' }}>
              <h2>Your Reviews: </h2>
              {reviewsDoneCards}
              <br></br>
              <br></br>
            </div>
          </Grid>

          <Grid item xs={6}>
            <div style={{ marginRight: '20px' }}>
              <h2>Reviews received:</h2>
              {reviewsReceivedCards}
            </div>
            <br></br>
            <br></br>
          </Grid>

        </Grid>
        <br></br>

        {this.profileId ?
          <>
            <h3>Leave a review to {this.state.name} {this.state.surname}:</h3>
            <NewReview onAddReview={this.addReview} />
          </> :
          <>
          </>
        }

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
export default connect(mapStateToProps)(Profile);


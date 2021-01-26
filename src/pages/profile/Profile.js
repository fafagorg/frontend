import React from "react";
import RecipeReviewCard from '../../components/reviews/ReviewCard'
import ProfileApi from './ProfileApi.js';
import { connect } from 'react-redux';
import Alert from '../../components/reviews/Alert.js';


 class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      errorInfo: null,
      reviewsDone: [],
      reviewsReceived: [],
      products: []
    };

    this.handleCloseError = this.handleCloseError.bind(this);
  }


  async loadReviews() {
    try {
      let result = await ProfileApi.getProfile(this.props.username);
      if (result.err){
        this.setState({
          errorInfo: result.err
        });
        return;
      }
      if (result.reviews && result.reviews.reviewsDone && result.reviews.reviewsReceived){
        this.setState({
          reviewsDone: result.reviews.reviewsDone,
          reviewsReceived: result.reviews.reviewsReceived
        });
      } else{
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




  render() {
    var reviewsDoneCards = [];
    var reviewsReceivedCards = [];
    console.log(this.state)
    this.state.reviewsDone.forEach(review => {
      reviewsDoneCards.push(<RecipeReviewCard review={review}></RecipeReviewCard>)
    })
    this.state.reviewsReceived.forEach(review => {
      reviewsReceivedCards.push(<RecipeReviewCard review={review}></RecipeReviewCard>)
    })
    return (
      <>
        <h1>Hey {this.props.username}! This is your profile.</h1>
        <Alert message={this.state.errorInfo} onCloseCallback={this.handleCloseError} />
       
        <a href={"/product_client?username="+ this.props.username}>
                <button className="btn btn-primary">Your Products</button>
            </a>
        <br></br>
        <br></br>
        Your Reviews:
        {reviewsDoneCards}
      <br></br>
      <br></br>
        Reviews received:
        {reviewsReceivedCards}
        <br></br>
        <br></br>

 
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
  

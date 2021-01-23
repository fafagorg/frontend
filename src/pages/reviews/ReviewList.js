import React from "react";


import RecipeReviewCard from './ReviewCard'




import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';



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
    this.state = {
      reviews: []
    };
  }


  componentDidMount() {
    fetch("http://localhost:8080/api/v1/reviews")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            reviews: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {
    var reviewCards = []
    this.state.reviews.forEach(review =>{
      reviewCards.push(<RecipeReviewCard review={review}></RecipeReviewCard>)
    })

    return (
      <>
        <div>
          {reviewCards}
        </div>
      </>
    );
  }
}

export default Review;

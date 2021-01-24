import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    backgroundColor: '#3405633d',
    marginTop: 10,
    color: 'rgb(0 0 0 0.85)'
  },
  media: {
    height: 200,
    paddingTop: '26.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const review = props.review

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var comments = []
  for (const comment of review.comments) {
    comments.push(<Typography paragraph>{comment.clientId}</Typography>)
    comments.push(<Typography paragraph>{comment.body} </Typography>);
  }


  return (
    <Card className={classes.root}>

      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
             {review.reviewerClientId.substring(0,1).toUpperCase()}{review.reviewerClientId.substring(1,2)}
          </Avatar>
       
        }
        action={
          <Rating
            name="customized-empty"
            defaultValue={4}
            value={review.score}
            readOnly={true}
            precision={1}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
          />
        }
        title={review.title}
        subheader={new Intl.DateTimeFormat("en-GB", {
          year: "numeric",
          month: "long",
          day: "2-digit"
        }).format(new Date(review.dateCreated))}>


      </CardHeader>
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.png"
        title="Paella dish"
      /> */}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {review.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>


        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          {review.comments.length} comments
          <ExpandMoreIcon />

        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {comments}
        </CardContent>
      </Collapse>
    </Card>
  );
}
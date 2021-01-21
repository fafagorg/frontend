import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="https://comps.canstockphoto.es/mirar-marr%C3%B3n-osito-de-peluche-triste-almacen-de-im%C3%A1genes_csp4584995.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Productazo
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            De locos buenisimo te lo vendo
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
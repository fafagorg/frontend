import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 250,
  },
});

function Product(props){
  const classes = useStyles();
    return(
      <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
      <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {!props.hidden &&
            <Link class="link" style={{ color: '#00F' }} to={"/product?id="+ props.product.id}>{props.product.name}</Link>
          }
          {props.hidden &&
            props.product.name
          }
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
            {"Category: "+ props.product.category}
          </Typography>
          <Typography variant="h6" color="textPrimary" component="p">
          {!props.hideLink &&
            <p><text>Seller: </text> <Link class="link" style={{ color: '#00F' }} to={"/product_client?username="+ props.product.seller}>{props.product.seller}</Link></p>
          }
          {props.hideLink &&
            props.product.seller
          }
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            {"Price: "+ props.product.price * props.currentRate.value}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
          {props.username === props.product.seller && !props.noEdit &&
            <>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.product)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.product)}>Delete</button>
            </>
          }
          {props.chat && props.product.seller !== props.username &&
            <a href={"/chat/"+props.username+"-"+props.product.seller+"-"+props.product.id}>
                <button className="btn btn-primary">Chat with seller</button>
            </a>
          }
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
    );

}

/*<tr>
        {!props.hidden &&
        <td><Link class="link" style={{ color: '#00F' }} to={"/product?id="+ props.product.id}>{props.product.name}</Link></td>
        }
        {props.hidden &&
        <td>{props.product.name}</td>
        }
        <td>{props.product.price * props.currentRate.value}</td>
        <td>{props.product.category}</td>
        {!props.hideLink &&
        <td><Link class="link" style={{ color: '#00F' }} to={"/product_client?username="+ props.product.seller}>{props.product.seller}</Link></td>
        }
        {props.hideLink &&
        <td>{props.product.seller}</td>
        }

        <td>{props.currentRate.label}</td>
        <td hidden>{props.product.id}</td>
        {props.username === props.product.seller && !props.noEdit &&
            <td>
                <button className="btn btn-primary" onClick={() => props.onEdit(props.product)}>Edit</button>
                <button className="btn btn-primary" onClick={() => props.onDelete(props.product)}>Delete</button>
            </td>
        }
        {props.chat && props.product.seller !== props.username &&
            <a href={"/chat/"+props.username+"-"+props.product.seller+"-"+props.product.id}>
                <button className="btn btn-primary">Chat with seller</button>
            </a>
        }

        
    </tr>*/

export default Product;
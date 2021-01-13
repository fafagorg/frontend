import React from "react";
import { withRouter } from "react-router-dom";
import ProductCard from "../../components/products/ProductCard"
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Home extends React.Component {
  render() {
    return (
      <>
        <div>
          <Typography variant="h1" component="h2">
            Fafago
          </Typography>
          <Typography variant="h4" gutterBottom>
            Cuando haces pop, ya no hay stop.
          </Typography>
        </div>
        <div style={{ backgroundColor: "#eeeeee" }}>
          <Container maxWidth="lg">
            <Grid container spacing={1}>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>
              <Grid Item lg={3} md={4} sm={6} xs={12} style={{padding:10}}>
                <ProductCard />
              </Grid>              
            </Grid>
          </Container>
        </div>
      </>
    );
  }
}

export default withRouter(Home)
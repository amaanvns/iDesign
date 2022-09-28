import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import {
  Grid,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);
  console.log(products);
  return (
    <>
      {isLoading ? (
        <>loading....</>
      ) : (
        <>
          <div>
            <Box sx={{ flexGrow: 1, padding: "20px" }}>
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={6} sm={4} lg={3}>
                    <Card sx={{ maxWidth: 345 }}>
                      <CardMedia
                        component="img"
                        height="160"
                        image={product.images[0]}
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {product.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {product.description}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          $ {product.price}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          Discount: {product.discountPercentage}%
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Add to Cart</Button>
                        <Typography sx={{marginLeft:"20px"}}>Rating:{product.rating}</Typography>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default Products;

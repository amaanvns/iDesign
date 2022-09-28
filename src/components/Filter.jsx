import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  filterByCategory,
  filterByBrand,
  filterByPrice,
  filterByDiscount,
  filterByRating
  
} from "../features/products/productsSlice";
import {
  Grid,
  Box,
  Button,
} from "@mui/material";

const Filter = () => {
  const [showCategory, setShowCategory] = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productsFilter = useSelector((state) => state.products.allProducts);

  let filters = [];
  let categories;
  let brands;

  if (productsFilter.length != 0) {
    for (let i = 0; i < productsFilter.length; i++) {
      filters.push(productsFilter[i].category);
    }
    categories = filters.filter(
      (item, index) => filters.indexOf(item) === index
    );
    filters = [];
    for (let j = 0; j < productsFilter.length; j++) {
      filters.push(productsFilter[j].brand);
    }
    brands = filters.filter((item, index) => filters.indexOf(item) === index);
    filters = [];
  }

  const handleCategory = (category) => {
    dispatch(filterByCategory(category));
  };

  const handleBrand = (brand) => {
    dispatch(filterByBrand(brand));
  };

  const displayCategroy = () => {
    setShowBrand(false);
    setShowCategory(true);
  };

  const displayBrand = () => {
    setShowCategory(false);
    setShowBrand(true);
  };

  return (
    <div>
      <Box sx={{ padding: "20px" }}>
        <Grid justifyContent="center" container spacing={2}>
          <Grid item>
            <Button onClick={displayCategroy}>Category</Button>
          </Grid>
          <Grid item>
            <Button onClick={displayBrand}>Brand</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>dispatch(filterByPrice())}>Price</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>dispatch(filterByRating())}>Rating</Button>
          </Grid>
          <Grid item>
            <Button onClick={()=>dispatch(filterByDiscount())}>Discount</Button>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {showCategory && (
            <>
              {categories?.map((category) => (
                <Grid item sx={2}>
                  <Button onClick={() => handleCategory(category)}>
                    {category}
                  </Button>
                </Grid>
              ))}
            </>
          )}
          {showBrand && (
            <>
              {brands?.map((brand) => (
                <Grid item sx={2}>
                  <Button onClick={() => handleBrand(brand)}>{brand}</Button>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Filter;

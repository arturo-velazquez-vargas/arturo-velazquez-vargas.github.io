import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const Logo = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="https://www.sellbrite.com/wp-content/uploads/FeaturedImage_20tips-1024x536.png" alt="logo" />
      </Link>
    </Box>
  );
};

export default Logo;

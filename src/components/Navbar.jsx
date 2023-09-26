import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import useMediaQuery from "@mui/material/useMediaQuery";

const Navbar = () => {
  const hideTextOnSm = useMediaQuery("(max-width:600px)");
  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      sx={{
        position: "sticky",
        background: "#000",
        top: 0,
        justifyContent: " space-between",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={45} />

        {!hideTextOnSm && (
          <Typography
            variant="h6"
            style={{
              marginLeft: "4px",
              color: "#fff",
              fontWeight: "bold",
              fontFamily: "Giants-Bold",
            }}
          >
            GazeroTube
          </Typography>
        )}
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;

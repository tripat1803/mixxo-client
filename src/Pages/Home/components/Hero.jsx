import { Box, Button } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";

function Hero() {

  let navigate = useNavigate();
  let category = useContext(CategoryContext);

  return (
    <Box
      sx={{
        // height: "500px",
        minHeight: "100vh",
        // bgcolor: "black",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "relative",
        // marginTop: "-79px",
        marginBottom: "64px",
      }}
    >
      <Button
        onClick={() => {
          navigate(`/shop`);
        }}
        sx={{
          height: "3.5rem",
          width: "10rem",
          bgcolor: "trasnparent",
          borderRadius: "100px",
          border: "2px solid black",
          color: "black",
          fontSize: "1.1rem",
          fontWeight: "bold",
          transition: "all 0.5s",
          textTransform: "none",
          fontFamily: "Montserrat",
          "&:hover": { bgcolor: "#d9b088" },
          zIndex: "1",
          marginBottom: "3%",
        }}
      >
        Shop Now
      </Button>
      <img
        className="w-full h-full absolute object-cover object-center"
        src={require("../../../Assets/background.png")}
        alt="ima"
      />
    </Box>
  );
}

export default Hero;

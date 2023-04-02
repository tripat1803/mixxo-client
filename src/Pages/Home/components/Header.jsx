import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popup from "./Popup";
import Cart from "./ProCart";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import Logo from "../../../Assets/logo.png";
import Signup from "./Signup";
import MenuIcon from "@mui/icons-material/Menu";
import { CartContext } from "../../../Context/AllContext/CartContext";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../Context/AllContext/UserContext";
import { NavHashLink } from "react-router-hash-link";
import Fade from "@mui/material/Fade";
import { CategoryContext } from "../../../Context/AllContext/CategoryContext";

const Container = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    padding: "0px 52px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px 16px",
  },
  display: "flex",
  justifyContent: "space-between",
  zIndex: "25",
  top: "0%",
  transition: "all 0.5s",
  width: "100vw",
}));

const Image = styled("img")(() => ({
  "&:hover": {
    cursor: "pointer",
  },
}));

const navLinks = [
  {
    name: "SHOP",
    link: "/shop",
  },
  {
    name: "REVIEWS",
    link: "/",
  },
  {
    name: "ABOUT",
    link: "/about",
  },
];

const Header = () => {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let category = useContext(CategoryContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [cartData, setCartData] = useState([]);
  const [procart, setcart] = useState(false);
  const [model, setModel] = useState(false);
  const [nav, setnav] = useState(false);
  const [signup, setsignup] = useState(false);
  const [drawer, setDrawer] = useState("-150%");
  const [checkCart, setCheckCart] = useState(false);
  const [background, setBackground] = useState("transparent");
  const [txtColor, setTxtColor] = useState("black");
  const [mongo, setMongo] = useState();
  const [position, setPosition] = useState("fixed");

  // Menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.preventDefault();
    let text = String(e.target.innerText);
    if (text === "My Account" || text.includes("My Account")) {
      navigate("/profile/account");
    } else if (text === "Orders" || text.includes("Orders")) {
      navigate("/profile/order");
    } else if (text === "Logout" || text.includes("Logout")) {
      user.signoutUser();
    }
    setAnchorEl(null);
  };
  //

  const toggleModel = () => {
    setModel(!model);
  };
  const toggleSign = () => {
    setsignup(!signup);
  };

  const togglecart = () => {
    if (procart) {
      setCheckCart(false);
    }
    setcart(!procart);
  };

  useEffect(() => {
    setCartData(cart.cart);
  }, [cart.cart]);

  useEffect(() => {
    if (window.pageYOffset === 0 && location.pathname === "/") {
      setBackground("transparent");
    } else {
      setBackground("white");
    }

    if (location.pathname !== "/") {
      setPosition("sticky");
    } else {
      setPosition("fixed");
    }
  }, [location.pathname]);

  // var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    // var currentScrollPos = window.pageYOffset;
    if (window.pageYOffset === 0 && location.pathname === "/") {
      setBackground("transparent");
    } else {
      setBackground("white");
    }
    // if (prevScrollpos > currentScrollPos) {
    //   setnav(false);
    //   if (checkCart) {
    //     setcart(true);
    //   }
    // } else {
    //   setnav(true);
    //   if (procart) {
    //     setCheckCart(true);
    //   }
    //   setcart(false);
    // }
    // prevScrollpos = currentScrollPos;
  };

  useEffect(() => {
    if (model) {
      document.body.classList.add("active-model");
    } else {
      document.body.classList.remove("active-model");
    }
  }, [model]);

  useEffect(() => {
    if (signup) {
      document.body.classList.add("active-model");
    } else {
      document.body.classList.remove("active-model");
    }
  }, [signup]);

  useEffect(() => {
    setMongo(user.mongoUser);
  }, [user.mongoUser]);

  return (
    <Container
      sx={
        nav
          ? {
              transform: "translateY(-150%)",
              background: background,
              position,
            }
          : {
              transform: "translateY(0%)",
              background: background,
              position,
            }
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* <SvgLogo /> */}
        {/* <Typography>MIXXO</Typography> */}

        {/* Logo */}
        <Image
          onClick={() => {
            navigate("/");
          }}
          src={Logo}
          alt="logo"
          sx={{
            width: "110px",
            position: "relative",
          }}
        />
      </Box>

      {/* Nav Links */}
      <Box
        sx={{
          width: "max-content",
          display: {
            md: "flex",
            lg: "flex",
            xl: "flex",
            sm: "none",
            xs: "none",
          },
          gap: { md: "36px", lg: "36px", xl: "36px", sm: "36px", xs: "16px" },
          color: "black",
          // padding: {
          //   md: "24px",
          //   lg: "24px",
          //   xl: "24px",
          //   sm: "24px",
          //   xs: "16px",
          // },
          alignItems: "center",
        }}
      >
        {navLinks.map((item) => {
          return (
            <>
              {item.name !== "REVIEWS" ? (
                <div
                  onClick={() => {
                    navigate(item.link);
                  }}
                  key={item.name}
                  className="Navbtn"
                  style={{
                    color: txtColor,
                  }}
                >
                  {item.name}
                </div>
              ) : (
                <NavHashLink
                  to={
                    location.pathname && location.search
                      ? `${location.pathname}${location.search}#review`
                      : "#review"
                  }
                  className="Navbtn"
                  smooth
                >
                  {item.name}
                </NavHashLink>
              )}
            </>
          );
        })}
        <Badge
          onClick={togglecart}
          badgeContent={cartData?.length}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
            "& .MuiBadge-badge": {
              color: "black",
              backgroundColor: "#FAE1C1",
            },
          }}
        >
          <ShoppingCartIcon
            sx={{
              color: txtColor,
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </Badge>
        {procart && <Cart data={togglecart} />}
        {mongo ? (
          <IconButton
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              sx={{
                background: "#C07E49",
                color: "white",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {mongo.firstname[0]}
            </Avatar>
          </IconButton>
        ) : (
          <AccountCircleIcon
            onClick={toggleModel}
            sx={{
              color: txtColor,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            fontSize="large"
          />
        )}
      </Box>

      {/* Mobile view */}
      <Box
        sx={{
          width: "max-content",
          display: {
            md: "none",
            lg: "none",
            xl: "none",
            sm: "flex",
            xs: "flex",
          },
          gap: { md: "48px", lg: "48px", xl: "48px", sm: "48px", xs: "24px" },
          color: "black",
          padding: {
            md: "24px",
            lg: "24px",
            xl: "24px",
            sm: "24px",
            xs: "8px",
          },
          alignItems: "center",
        }}
      >
        {mongo ? (
          <IconButton
            id="fade-button2"
            aria-controls={open ? "fade-menu2" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar
              sx={{
                background: "#C07E49",
                color: "white",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              {mongo.firstname[0]}
            </Avatar>
          </IconButton>
        ) : (
          <AccountCircleIcon
            onClick={toggleModel}
            sx={{
              color: txtColor,
              "&:hover": {
                cursor: "pointer",
              },
            }}
            fontSize="large"
          />
        )}
        <MenuIcon
          onClick={() => {
            setDrawer("0%");
          }}
          fontSize="large"
        />
      </Box>
      <Box
        id="drawer"
        sx={{
          display: {
            md: "none",
            lg: "none",
            xl: "none",
            sm: "block",
            xs: "block",
          },
          width: { sm: "80%", xs: "80%" },
          background: "#FAE0BF",
          position: "fixed",
          top: "0%",
          left: drawer,
          minHeight: "100vh",
          zIndex: "25",
          transition: "0.5s",
          overflowY: "scroll",
        }}
      >
        <Box
          sx={{
            padding: "8px",
            textAlign: "right",
          }}
        >
          <CloseIcon
            onClick={() => {
              setDrawer("-150%");
            }}
            fontSize="large"
          />
        </Box>
        <Typography
          onClick={() => {
            navigate("/");
            setDrawer("-150%");
          }}
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
            padding: "16px",
          }}
        >
          HOME
        </Typography>
        {navLinks.map((item) => {
          return (
            <>
              {item.name !== "REVIEWS" ? (
                <Typography
                  onClick={() => {
                    navigate(item.link);
                    setDrawer("-150%");
                  }}
                  sx={{
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "600",
                    padding: "16px",
                  }}
                >
                  {item.name}
                </Typography>
              ) : (
                <NavHashLink
                  onClick={() => {
                    setDrawer("-150%");
                  }}
                  to={
                    location.pathname && location.search
                      ? `${location.pathname}${location.search}#review`
                      : "#review"
                  }
                  style={{
                    width: "100%",
                    textAlign: "center",
                    fontSize: "24px",
                    fontWeight: "600",
                    padding: "16px",
                    display: "block",
                    textDecoration: "none",
                  }}
                  smooth
                >
                  {item.name}
                </NavHashLink>
              )}
            </>
          );
        })}
        <Typography
          onClick={() => {
            setDrawer("-150%");
            navigate("/cart");
          }}
          sx={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "600",
            padding: "16px",
          }}
        >
          VIEW CART
        </Typography>
      </Box>
      {drawer === "0%" && (
        <Box
          onClick={() => {
            setDrawer("-150%");
          }}
          sx={{
            display: {
              md: "none",
              lg: "none",
              xl: "none",
              sm: "block",
              xs: "block",
            },
            width: "100%",
            background: "rgb(0,0,0,0.4)",
            position: "fixed",
            top: "0%",
            left: "0%",
            height: "100vh",
            zIndex: "24",
            transition: "0.5s",
          }}
        ></Box>
      )}
      {model && <Popup data={toggleModel} name={toggleSign} />}
      {signup && <Signup data={toggleSign} name={toggleModel} />}
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      <Menu
        id="fade-menu2"
        MenuListProps={{
          "aria-labelledby": "fade-button2",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Orders</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </Container>
  );
};

export default Header;

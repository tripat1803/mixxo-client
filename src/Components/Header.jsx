import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/system";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popup from "../Pages/Home/components/Popup";
import Cart from "../Pages/Home/components/ProCart";
import {
  Avatar,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import Logo from "../Assets/logo.png";
import Signup from "../Pages/Home/components/Signup";
import MenuIcon from "@mui/icons-material/Menu";
import { CartContext } from "../Context/AllContext/CartContext";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AllContext/UserContext";
import { NavHashLink } from "react-router-hash-link";
import Fade from "@mui/material/Fade";

const navLinks = [
  {
    name: "Shop",
    link: "/shop",
    img: "shop",
  },
  {
    name: "Reviews",
    link: "#review",
    img: "review",
  },
  {
    name: "About Us",
    link: "/about",
    img: "about",
  },
];

const Header = () => {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
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
    <div
      className="flex justify-between z-[25] top-0 duration-500 w-[100vw] px-[32px] md:px-[52px]"
      style={
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
      <div className="flex items-center">
        {/* <SvgLogo /> */}
        {/* <Typography>MIXXO</Typography> */}

        {/* Logo */}
        <Link to="/">
          <img
            className="w-28 relative"
            onClick={() => {
              navigate("/");
            }}
            src={Logo}
            alt="logo"
          />
        </Link>
      </div>

      {/* Nav Links */}
      <div
        className="hidden md:flex gap-[16px] sm:gap-[36px]"
        style={{
          width: "max-content",
          color: "black",
          alignItems: "center",
        }}
      >
        {navLinks.map((val) => {
          return (
            <>
              {val.name !== "Reviews" ? (
                <Link className="Navbtn" to={val.link}>
                  {val.name}
                </Link>
              ) : (
                (!location.pathname.includes("/product")) ?
                  <NavHashLink
                    to={
                      location.pathname && location.search
                        ? `${location.pathname}${location.search}#review`
                        : "#review"
                    }
                    className="Navbtn"
                    smooth
                  >
                    {val.name}
                  </NavHashLink> : <NavHashLink className="Navbtn" to="/#review">
                    {val.name}
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
      </div>

      {/* Mobile view */}
      <div
        className="flex items-center md:hidden w-[max-content] gap-[24px] sm:gap-[48px] p-[8px] sm:p-[24px]"
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
      </div>
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
        <div className="flex flex-col font-pop gap-5 font-semibold text-[19px] px-7 ">
          {/* For home */}
          <Link
            to="/"
            onClick={() => setDrawer("-150%")}
            className="flex items-center space-x-5"
          >
            <img
              className="w-8"
              src={require(`../Assets/Drawer/home.svg`).default}
              alt=""
            />

            <span> Home </span>
          </Link>

          {navLinks.map((item) => {
            return (
              <>
                {item.name !== "Reviews" ? (
                  <Link
                    to={item.link}
                    onClick={() => setDrawer("-150%")}
                    className="flex items-center space-x-5"
                  >
                    <img
                      className="w-8"
                      src={require(`../Assets/Drawer/${item?.img}.svg`)}
                      alt=""
                    />

                    <span>{item.name}</span>
                  </Link>
                ) : (
                  (!location.pathname.includes("/product")) ?
                    <NavHashLink
                      onClick={() => {
                        setDrawer("-150%");
                      }}
                      className="flex items-center space-x-5"
                      to={
                        location.pathname && location.search
                          ? `${location.pathname}${location.search}#review`
                          : "#review"
                      }
                    >
                      <img
                        className="w-8"
                        src={require(`../Assets/Drawer/${item?.img}.svg`)}
                        alt=""
                      />

                      <span>{item.name}</span>
                    </NavHashLink> : <NavHashLink
                      to="/#review"
                      onClick={() => setDrawer("-150%")}
                      className="flex items-center space-x-5"
                    >
                      <img
                        className="w-8"
                        src={require(`../Assets/Drawer/${item?.img}.svg`)}
                        alt=""
                      />
                      <span>{item.name}</span>
                    </NavHashLink>
                )}
              </>
            );
          })}
        </div>
        <Link
          to="/cart"
          onClick={() => setDrawer("-150%")}
          className="flex items-center px-7 py-5 gap-5 font-pop font-semibold text-[19px]"
        >
          <img
            className="w-8"
            src={require(`../Assets/shopCart.svg`).default}
            alt=""
          />
          <span>{"Cart"}</span>
        </Link>
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
    </div>
  );
};

export default Header;

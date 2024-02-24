import React, { useContext, useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Fade from "@mui/material/Fade";
import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { CartContext } from "../Context/AllContext/CartContext";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../Context/AllContext/UserContext";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import Cart from "../Pages/Home/components/ProCart";
import Popup from "../Pages/Home/components/Popup";
import Signup from "../Pages/Home/components/Signup";

export default function HeaderNew(props) {
  let user = useContext(UserContext);
  let cart = useContext(CartContext);
  let navigate = useNavigate();
  let location = useLocation();
  const [cartData, setCartData] = useState([]);
  const [procart, setcart] = useState(false);
  const [model, setModel] = useState(false);
  const [signup, setsignup] = useState(false);
  const [drawer, setDrawer] = useState("-150%");
  const [checkCart, setCheckCart] = useState(false);
  const [txtColor, setTxtColor] = useState("black");
  const [mongo, setMongo] = useState();

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
    } else if(text === "Admin" || text.includes("Admin")){
      navigate("/admin");
    }
    setAnchorEl(null);
  };

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
    }
  ];
  return (
    <div style={location.pathname === "/" ? {
      top: "0%",
      width: "100vw",
      background: props.background,
      position: props.position
    } : {
      position: "static"
    }} className="z-[25] duration-500 lg:px-20 px-4">
      <div className="hidden md:flex items-center justify-evenly">
        {/* Logo */}
        <div className="flex-1 pt-2">
          <Link to="/">
            <img
              className="lg:w-32 w-24"
              src={require("../Assets/logo.png")}
              alt="mainLogo"
            />
          </Link>
        </div>

        {/* Links */}
        <div className="relative flex-grow border border-black py-2 px-5 rounded-full flex items-center justify-evenly gap-6 font-bold font-pop">
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

          {/* Cart Icon */}
          <div>
            <button
              onClick={togglecart}
              className="relative border border-[#D6AB81] hover:bg-[#D6AB81] hover:bg-opacity-30 transition-all rounded-full w-[max-content] p-2"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 24C7.35 24 6.015 25.35 6.015 27C6.015 28.65 7.35 30 9 30C10.65 30 12 28.65 12 27C12 25.35 10.65 24 9 24ZM0 0V3H3L8.4 14.385L6.375 18.06C6.135 18.48 6 18.975 6 19.5C6 21.15 7.35 22.5 9 22.5H27V19.5H9.63C9.42 19.5 9.255 19.335 9.255 19.125L9.3 18.945L10.65 16.5H21.825C22.95 16.5 23.94 15.885 24.45 14.955L29.82 5.22C29.94 5.01 30 4.755 30 4.5C30 3.675 29.325 3 28.5 3H6.315L4.905 0H0ZM24 24C22.35 24 21.015 25.35 21.015 27C21.015 28.65 22.35 30 24 30C25.65 30 27 28.65 27 27C27 25.35 25.65 24 24 24Z"
                  fill="black"
                />
              </svg>
            </button>
            {procart && (
              <div className="absolute -right-28 border border-black top-16">
                <Cart data={togglecart} />
              </div>
            )}
          </div>
        </div>

        {/* User Icon */}
        <div className="flex-1 flex justify-end">
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
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex items-center justify-between border border-zinc-700 px-4 py-1 my-3 rounded-full">
        {/* Logo */}
        <div className="flex-1 pt-1">
          <Link to="/">
            <img
              className="w-20 h-10 object-cover"
              src={require("../Assets/logo.png")}
              alt="mainLogo"
            />
          </Link>
        </div>

        <div className="flex gap-3 items-center">
          <Link
            to="/cart"
            className=" bg-[#D6AB81] bg-opacity-30 rounded-full p-[6px]"
          >
            <img
              className="w-4 xxs:w-6"
              src={require("../Assets/shopCart.svg").default}
              alt=""
            />
          </Link>

          {/* Setting */}
          <button
            onClick={() => setDrawer("0%")}
            className=" bg-[#D6AB81] bg-opacity-30 rounded-full p-1"
          >
            <img
              className="w-4 xxs:w-6"
              src={require("../Assets/setting.svg").default}
              alt=""
            />
          </button>
          <div className="flex-1 flex justify-end">
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
        </div>
      </div>

      {/* Drawer */}
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

        {/* Links */}

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
        {mongo?.role === "admin" && <MenuItem onClick={handleClose}>Admin</MenuItem>}
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
        {mongo?.role === "admin" && <MenuItem onClick={handleClose}>Admin</MenuItem>}
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>

      {/* Modals */}
      {model && <Popup data={toggleModel} name={toggleSign} />}
      {signup && <Signup data={toggleSign} name={toggleModel} />}
    </div>
  );
}

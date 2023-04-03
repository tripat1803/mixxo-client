import React from "react";
import WineBarIcon from "@mui/icons-material/WineBar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

const Page = ({ children }) => {
  let navigate = useNavigate();

  return (
    <main>
      <div className="bg-[#fff8ef] pt-[5rem] flex justify-center items-center flex-col gap-[5%]">
        {/* <div className="w-[80%] max-w-[1200px] py-8 bg-[#fae0bf] rounded-[100px] grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 grid-cols-1">
				<div className="2xl:basis-1/2 xl:basis-1/2 lg:basis-1/2 md:basis-full sm:basis-full xs:basis-full flex justify-center items-center">
					<Avatar
						sx={{
							width: "150px",
							height: "150px",
							background: "#815444",
						}}
					></Avatar>
				</div>
				<div className=" px-8 basis-full flex justify-center items-center flex-col gap-[6%]">
					<div className="flex 2xl:justify-start xl:justify-start lg:justify-start md:justify-center sm:justify-center justify-center w-[100%] mb-4">
						<div className="bg-balck text-[#6a2b00] text-[2rem] border-b-[#773d15] border-b-[2.8px] border-solid 2xl:text-left xl:text-left lg:text-left md:text-center sm:text-center text-center">
							Hello Madhav!
						</div>
					</div>
					<div className="w-[100%] 2xl:text-base xl:text-base lg:text-base md:text-base sm:text-base text-[12px]">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aut
						doloremque debitis, sunt exercitationem adipisci vero. Cumque
						mollitia harum commodi suscipit quasi delectus cum? Esse placeat
						nesciunt minus atque reprehenderit dolorem, obcaecati natus quos
						maiores, velit sed aspernatur, praesentium ducimus!
					</div>
					<div className="flex 2xl:justify-start xl:justify-start lg:justify-start md:justify-center sm:justify-center xs:justify-center justify-center w-[100%] p-5">
						<button className=" h-fit w-fit bg-white mt-[5%] rounded-[15px] text-[#6a2b00] font-[500] shadow-[0_6px_6px_-6px_black] 2xl:px-5 xl:px-5 lg:px-5 md:px-4 sm:px-3 px-3 py-3 2xl:text-base xl:text-base lg:text-base md:text-base sm:text-base text-[12px]">
							Select Shipping address
						</button>
					</div>
				</div>
			</div> */}

        <div className=" max-w-[1200px] 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full w-fit pb-16 flex flex-row items-center">
          <button className="text-[#6a2b00] 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full xs:w-full font-[500] text-xl text-center border-r-2 border-black 2xl:px-10 xl:px-10 lg:px-10 md:px-10 sm:px-5 px-3 py-4">
            <Link
              to="/profile/account"
              className="2xl:block xl:block lg:block md:hidden sm:hidden hidden"
            >
              Your Account
            </Link>
            <div className="flex justify-center">
              <AccountCircleIcon
                onClick={() => {
                  navigate("/profile/account");
                }}
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                  },
                }}
              />
            </div>
          </button>
          <button className="text-[#6a2b00] 2xl:w-full xl:w-full lg:w-full md:w-full sm:w-full xs:w-full font-[500] text-xl text-center 2xl:px-10 xl:px-10 lg:px-10 md:px-10 sm:px-5 px-3 py-4">
            <Link
              to="/profile/order"
              className="2xl:block xl:block lg:block md:hidden sm:hidden hidden"
            >
              Your Orders
            </Link>
            <div className="flex justify-center">
              <WineBarIcon
                onClick={() => {
                  navigate("/profile/order");
                }}
                sx={{
                  display: {
                    xl: "none",
                    lg: "none",
                    md: "block",
                    sm: "block",
                    xs: "block",
                  },
                }}
              />
            </div>
          </button>
        </div>

        <div className="h-[50%] w-[90%] 2xl:w-[80%] xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[90%] max-w-[1200px] flex justify-center flex-col items-center pb-20">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Page;

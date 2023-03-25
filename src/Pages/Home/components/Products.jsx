import { Box } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Empty from "../../../Components/Empty";
import ProductCard from "../../../Components/ProductCard";

function Products({ dataArr }) {

	const [total, setTotal] = useState([]);

	useEffect(() => {
		if(dataArr){
			setTotal(dataArr);
		}
	}, [dataArr]);

	return (
		<Box sx={{
			height: "100%",
			padding: "0px 32px 64px 32px",
			display: "flex",
			justifyContent: "center"
		}}>
			{
				(total) && ((total.length !== 0) && <Box sx={{
					width: { md: "100%", lg: "90%", xl: "75%", sm: "100%", xs: "100%" },
					display: "grid",
					gridTemplateColumns: { md: "50% 50%", lg: "33% 33% 33%", xl: "33% 33% 33%", sm: "50% 50%", xs: "100%" },
					placeItems: "center",
					gap: "64px 0px"
				}}>
					{
						total?.map((item, index) => {
							return (
								<>
									{
										item && <ProductCard
											key={index}
											imageUrl={item.product_id.image[0]?.url}
											title={item.product_id.name}
											id={item.product_id._id}
											productDetails={item.product_id.details[0]}
										/>
									}
								</>
							);
						})
				}
				</Box>)
			}
			{
				(total) && ((total.length === 0) && <Empty message={"No Product To Recommend"} />)
			}
		</Box>
	);
}

export default Products;

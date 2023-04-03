import React, { useContext, useEffect, useState } from 'react';
import { getIdToken } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { publicApi } from '../../../Api/Api';
import { UserContext } from '../../../Context/AllContext/UserContext';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, IconButton, styled } from '@mui/material';

const PageBtn = styled(Box)(() => ({
    padding: "0px 8px"
}))

function paginateArray(total) {
    let arr = [];
    for (let i = 1; i <= total; i++) {
        arr.push(i);
    }
    return arr;
}

function ReviewCard({ item }) {

    let date = new Date(item.createdAt);
    const stars = [
        [<StarOutlineOutlinedIcon sx={{ fontSize: "small" }} />, <StarOutlinedIcon sx={{ fontSize: "small", color: "yellow" }} />],
        [<StarOutlineOutlinedIcon sx={{ fontSize: "small" }} />, <StarOutlinedIcon sx={{ fontSize: "small", color: "yellow" }} />],
        [<StarOutlineOutlinedIcon sx={{ fontSize: "small" }} />, <StarOutlinedIcon sx={{ fontSize: "small", color: "yellow" }} />],
        [<StarOutlineOutlinedIcon sx={{ fontSize: "small" }} />, <StarOutlinedIcon sx={{ fontSize: "small", color: "yellow" }} />],
        [<StarOutlineOutlinedIcon sx={{ fontSize: "small" }} />, <StarOutlinedIcon sx={{ fontSize: "small", color: "yellow" }} />]
    ];

    return (
        <div className='border border-solid border-black p-[16px]'>
            <p className='text-lg font-semibold'>{item.user_id?.firstname + " " + item.user_id?.lastname}</p>
            <p className='text-xs'>{date.toDateString()}</p>
            <p className='flex gap-[3px] my-[3px]'>
                {
                    stars.map((data, index) => {
                        return (
                            <>
                                {(index + 1 <= item.rating) ? data[1] : data[0]}
                            </>
                        )
                    })
                }
            </p>
            <p className='mt-[16px]'>{item.message}</p>
        </div>
    )
}

function Reviews({ productId, total }) {

    let user = useContext(UserContext);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);
    const [flag, setFlag] = useState(false);
    const [paginate, setPaginate] = useState({
        page: 1,
        total: 1
    });

    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [lock, setLock] = useState(false);
    let [totalReviews, setTotalReviews] = useState(0);

    useEffect(() => {
        setTotalReviews(total);
    }, [total]);

    const stars = [
        [<StarOutlineOutlinedIcon sx={{ "&:hover": { cursor: "pointer" } }} />, <StarOutlinedIcon sx={{ color: "yellow", "&:hover": { cursor: "pointer" } }} />],
        [<StarOutlineOutlinedIcon sx={{ "&:hover": { cursor: "pointer" } }} />, <StarOutlinedIcon sx={{ color: "yellow", "&:hover": { cursor: "pointer" } }} />],
        [<StarOutlineOutlinedIcon sx={{ "&:hover": { cursor: "pointer" } }} />, <StarOutlinedIcon sx={{ color: "yellow", "&:hover": { cursor: "pointer" } }} />],
        [<StarOutlineOutlinedIcon sx={{ "&:hover": { cursor: "pointer" } }} />, <StarOutlinedIcon sx={{ color: "yellow", "&:hover": { cursor: "pointer" } }} />],
        [<StarOutlineOutlinedIcon sx={{ "&:hover": { cursor: "pointer" } }} />, <StarOutlinedIcon sx={{ color: "yellow", "&:hover": { cursor: "pointer" } }} />]
    ]

    const handleAdd = async () => {
        if (user.user) {
            let token = await getIdToken(user.user);
            setLoader(true);
            if (productId && message !== "" && rating !== 0) {
                publicApi.post("/review/create", {
                    message: message,
                    rating: rating,
                    productId
                }, {
                    headers: {
                        authorization: token
                    }
                }).then(() => {
                    toast.success("Rating added!");
                    setTotalReviews(++totalReviews);
                    setFlag(true);
                    setLoader(false);
                }).catch((err) => {
                    if (err.response.data.message) {
                        toast.error(err.response.data.message);
                    } else {
                        toast.error("Error occured, Pleaset try again later!");
                    }
                    setLoader(false);
                });
                setMessage("");
                setRating(0);
            }
        } else {
            toast.error("User not signed in");
        }
    }

    async function fetchReviews() {
        if (productId) {
            setLoader2(true);
            publicApi.post("/review/get", {
                productId: productId,
                page: paginate.page
            }).then((res) => {
                if (res.data) {
                    setReviews(res.data.details);
                    setPaginate((prevdata) => ({ ...prevdata, total: res.data.count }));
                }
                setLoader2(false);
            }).catch(() => {
                toast.error("Server error occured");
                setLoader2(false);
            });
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [productId]);

    if (flag) {
        fetchReviews();
        setFlag(false);
    }

    return (
        <div className='flex flex-col p-[16px] sm:p-[32px]'>
            <div className='py-[32px]'>
                <p className='font-bold text-[36px]'>Product Reviews</p>
                <p className='font-semibold text-lg'>Reviews: {totalReviews}</p>
            </div>
            <div className='w-[100%] sm:w-[80%] md:w-[65%]'>
                <div className='w-[100%] flex flex-col gap-[16px]'>
                    <div className='flex flex-col sm:flex-row gap-[8px]'>
                        <p>Rating:</p>
                        <div onMouseLeave={() => {
                            if (!lock) {
                                setRating(0);
                            }
                        }} className='flex gap-[6px]'>
                            {
                                stars.map((item, index) => {
                                    return (
                                        <span onMouseEnter={() => {
                                            if (!lock) {
                                                setRating(index + 1);
                                            }
                                        }} onMouseLeave={() => {
                                            if (!lock) {
                                                setRating(index + 1);
                                            }
                                        }} onClick={() => {
                                            setRating(index + 1);
                                            setLock(true);
                                        }} key={index}>
                                            {
                                                (index + 1 <= rating) ? item[1] : item[0]
                                            }
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <textarea placeholder='Add Comment' value={message} onChange={(e) => {
                        setMessage(e.target.value);
                    }} className='border border-solid border-black focus:outline-0 bg-[transparent] p-[16px] w-[100%] h-[180px]' />
                    <button onClick={() => {
                        if (!loader) {
                            handleAdd();
                        }
                    }} className='w-[max-content] bg-[#8B5F4D] text-white py-[8px] px-[10px] rounded-[20px]'>Add Comment</button>
                </div>
                <div className='pr-[6px] my-[32px] flex flex-col gap-[16px] max-h-[500px] overflow-scroll reviews'>
                    {
                        reviews.map((item) => {
                            return (
                                <ReviewCard key={item._id} item={item} />
                            )
                        })
                    }
                </div>
            </div>
            <div className='flex justify-end gap-[8px] w-[100%] sm:w-[80%] md:w-[65%]'>
                <IconButton onClick={() => {
                    if (!loader2) {
                        if (paginate.page > 1) {
                            setPaginate((prevdata) => ({ ...prevdata, page: --paginate.page }));
                            setFlag(true);
                        }
                    }
                }}><ArrowBackIosNewIcon /></IconButton>
                <Box sx={{
                    display: "flex",
                    alignItems: "center"
                }}>
                    <PageBtn>
                        {paginate.page}
                    </PageBtn>
                </Box>
                <IconButton onClick={() => {
                    if (!loader2) {
                        if (paginate.page < paginate.total / 10) {
                            setPaginate((prevdata) => ({ ...prevdata, page: ++paginate.page }));
                            setFlag(true);
                        } else {
                            toast.error("No more reviews ahead");
                        }
                    }
                }}><ArrowForwardIosIcon /></IconButton>
            </div>
        </div>
    )
}

export default Reviews;

import React, { useContext, useState } from 'react';
import { CategoryContext } from '../../../Context/AllContext/CategoryContext';
import gsap from 'gsap';

function Hero2() {

    const { category } = useContext(CategoryContext);

    const getFields = (input, field) => {
        var cat_name = [];
        for (var i = 0; i < input.length; ++i)
            cat_name.push(input[i][field]);
        return cat_name;
    }

    const catImgArr = getFields(category, "image");
    const carUrlarr = getFields(catImgArr, "url");
    const categoryName = getFields(category, "name");
    const [caro, setcaro] = useState(0);

    const pre = () => {
        gsap.fromTo('.caroImg', { opacity: 0 }, { opacity: 1, duration: 2 })
        gsap.fromTo('.cath2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 2 })
        if (caro === 0) {
            setcaro(category.length - 1);
        }
        else {
            setcaro(caro - 1);
        }
    }
    const nex = () => {
        gsap.fromTo('.caroImg', { opacity: 0 }, { opacity: 1, duration: 2 })
        gsap.fromTo('.cath2', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 2 })
        if (caro === category.length - 1) {
            setcaro(0);
        }
        else {
            setcaro(caro + 1);
        }
    }

    return (
        <div className='w-full overflow-hidden bg-black flex'>
            <div className='min-h-[100vh] w-full absolute caroImg z-10' style={{ backgroundImage: `url(${carUrlarr[caro]})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
            </div>
            <div className='w-full min-h-[100vh] flex flex-col sm:p-[16px] md:p-[32px] justify-center items-center z-20 bg-[rgb(0,0,0,0.2)]'>
                <div className='md:w-[80%] lg:w-[70%] xl:w-[70%] 2xl:w-[70%] sm:w-[100%] mt-[32px]'>
                    <div className='p-[32px]'>
                        <p className='text-white font-cookie leading-[100%] text-[64px] pb-[16px] cath2'>{categoryName[caro]}</p>
                        <div className='text-white cath2'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae aliquid reiciendis, recusandae nesciunt sit magnam expedita quas, dolorem numquam tenetur et, ab tempora commodi consequuntur! Perferendis voluptatibus deserunt cum est, dolores voluptates!
                        </div>
                    </div>
                    <div className='flex gap-7 p-[32px]'>
                        <button onClick={pre}>
                            <img
                                className="w-16"
                                src={require("../../../Assets/leftArr.png")}
                                alt=""
                            />
                        </button>
                        <button onClick={nex}>
                            <img
                                className="w-16"
                                src={require("../../../Assets/rightArr.png")}
                                alt=""
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero2;
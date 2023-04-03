import React from 'react';

export default function AccountInfo() {
    return (
        <div className='h-[160vh] bg-[#fff8ef] flex justify-center items-center flex-col gap-[5%]'>
            <div className='h-[40%] w-[80%] bg-[#fae0bf] rounded-[100px] overflow-hidden flex '>
                <div className=' h-full w-[30%] flex justify-center items-center'><img className='w-[50%] rounded-[50%] mr-[-60%]' alt="" /></div>
                <div className='w-[70%]  flex justify-center items-center flex-col gap-[6%]'>
                    <div className='flex items-start w-[70%]'><div className='bg-balck text-[#6a2b00] text-[2rem] border-b-[#773d15] border-b-[2.8px] border-solid '>Hello , Madhav</div></div>
                    <div className='w-[70%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aut doloremque debitis, sunt exercitationem adipisci vero. Cumque mollitia harum commodi suscipit quasi delectus cum? Esse placeat nesciunt minus atque reprehenderit dolorem, obcaecati natus quos maiores, velit sed aspernatur, praesentium ducimus!</div>
                    <div className='flex items-start w-[70%]'><button className="w-[50%] bg-white h-[100%] mt-[5%] rounded-[15px] text-[#6a2b00] font-[500] shadow-[0_6px_6px_-6px_black]">Select Shipping address</button></div>
                </div>
            </div>
        </div>
    )
}

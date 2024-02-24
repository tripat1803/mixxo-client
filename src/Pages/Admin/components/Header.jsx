import React from 'react';

const Header = ({ category, title, buttons=[] }) => (
  <div className="mb-10 flex justify-between">
    <div>
      <p className="text-lg text-gray-400">{category}</p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
    </div>
    <div className='flex gap-[12px] items-end'>
      {
        buttons.map((item, index) => {
          return(
            <div key={index}>
              {item}
            </div>
          )
        })
      }
    </div>
  </div>
);

export default Header;

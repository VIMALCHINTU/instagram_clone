import React from 'react';

const Postupperpart = ({username ,caption,rightElem,profileImg}) => {
    return (
        <div className='flex justify-between items-center  pr-4'>
            <div className='flex gap-4  items-center'>
               { profileImg ? <img className=' w-[60px] rounded-full h-[60px]' src={profileImg}/>:<img className=' w-[60px] rounded-full h-[60px]' src="https://th.bing.com/th?q=Profile+Photo+Tik+Tok&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247"/>}
                <div className='' >
                    

                    <h1 className='font-bold text-white'>{username||"user not"}</h1>
                    <h3 className='text-sm text-gray-500 mr-1 text'>{caption}</h3>
                </div>
            </div>
            <div className=' text-3xl'>{rightElem}</div>

        </div>
       
    );
}

export default Postupperpart;

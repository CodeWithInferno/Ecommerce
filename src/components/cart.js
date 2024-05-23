// import React, { useEffect } from 'react';
// import { AiOutlineClose } from 'react-icons/ai';

// const Cart = ({ cartItems, setIsOpen }) => {
//     useEffect(() => {
//         const closeOnEscape = (e) => {
//             if (e.key === 'Escape') {
//                 setIsOpen(false);
//             }
//         };

//         const closeOnClickOutside = (e) => {
//             if (e.target.className.includes('opacity-50')) {
//                 setIsOpen(false);
//             }
//         };

//         window.addEventListener('keydown', closeOnEscape);
//         window.addEventListener('mousedown', closeOnClickOutside);

//         return () => {
//             window.removeEventListener('keydown', closeOnEscape);
//             window.removeEventListener('mousedown', closeOnClickOutside);
//         };
//     }, [setIsOpen]);

//     return (
//         <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center z-50">
//             <div className="absolute inset-0 bg-black opacity-50"></div>
//             <div className="fixed right-0 top-0 h-full w-2/5 bg-white text-4xl font-mono pt-5 overflow-auto z-50">
//             <AiOutlineClose className="absolute top-2 mt-5 font-light right-2 cursor-pointer" onClick={() => {
//                 console.log('Cross button clicked');
//                 setIsOpen(false);
//             }} />
//                 <h1 className='text-left ml-5'>BAG</h1>
//                 <hr className="border-t border-gray-300 mx-5 mt-7 top-0" />
//                 {cartItems && cartItems.length > 0 ? (
//                     cartItems.map((item, index) => (
//                         <div key={index}>
//                             <h2>{item.title}</h2>
//                             <p>{item.price}</p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className='font-thin text-base text-left ml-5 mt-5 '>Your cart is currently empty.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Cart;





// Cart.js
// Cart.js
import React, { useState } from 'react';
import { AiOutlineClose } from "react-icons/ai";

const Cart = ({ setIsOpen, cartItems }) => {
    const [isClosed, setIsClosed] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        setIsClosed(true);
    };

    return (
        <div className={`fixed right-0 top-0 ${isClosed ? 'h-0 w-0' : 'h-full w-2/5'} bg-white text-4xl font-mono pt-5 overflow-auto z-50`}>
            <AiOutlineClose className="absolute top-2 mt-5 font-light right-2 cursor-pointer" onClick={handleClose} />
            <h1 className='text-left ml-5'>BAG</h1>
            <hr className="border-t border-gray-300 mx-5 mt-7 top-0" />
            {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 mt-5 ml-5">
                        <img src={item.imageUrls[0]} alt={item.title} className="w-24 h-auto object-cover" />
                        <div>
                            <h2 className="font-mono text-xl">{item.title}</h2>
                            <p className="font-thin text-base">Rs. {item.price}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p className='font-thin text-base text-left ml-5 mt-5 '>Your cart is currently empty.</p>
            )}
        </div>
    );
};

export default Cart;
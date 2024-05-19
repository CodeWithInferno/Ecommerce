'use client';





import React, { useState } from 'react';
import { Button } from './ui/button';
import { RegisterLink, LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import {  FaShoppingCart } from 'react-icons/fa';
import { CiSearch } from 'react-icons/ci';
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { LuUser } from "react-icons/lu";
import { CiHeart } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
    const {
        permissions,
        isLoading,
        user,
    } = useKindeBrowserClient();



// ...

return (
    <div>
    <div>
        <div className='pt-7 flex justify-between items-center w-full bg-white '>
            <Button className="bg-transparent text-black text-4xl hover:bg-transparent rounded-lg"><HiOutlineBars3CenterLeft /></Button>
            <h1 className='font-semibold tracking-widest text-4xl'>Snitch</h1>
            <div className='right mr-10 flex space-x-2 bg-transparent'>
                {user ? (
                    user.picture ? (
                        <Avatar>
                            <AvatarImage src={user.picture} />
                        </Avatar>
                    ) : (
                        <Avatar>
                            <LuUser size={32} />
                        </Avatar>
                    )
                ) : (
                    <RegisterLink className="bg-transparent mt-2 mr-2 text-black text-2xl hover:bg-transparent rounded-lg"><LuUser /></RegisterLink>
                )}
                <Button className="bg-transparent text-black text-2xl hover:bg-transparent rounded-lg"><CiSearch /></Button>
                <Button className="bg-transparent text-black text-2xl hover:bg-transparent rounded-lg"><CiHeart /></Button>
                <Button className="bg-transparent text-black text-xl hover:bg-transparent rounded-lg"><IoBagOutline /></Button>
            </div>
        </div>
        <hr className="border-t border-gray-300 mt-7 top-0" />
    </div>
    </div>
);

// ...


};

export default Header;
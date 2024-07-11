import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../session";

const Main = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }
    }, [navigate]);
    
    return (
        <div className="bg-pink">
            <div className="md:container md:mx-auto">
                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <Outlet />
                </div>
            </div >
        </div >
    );
};

export default Main;
import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaRegChartBar,
    FaUserShield,
    FaAd,
    FaRoute
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Sidebar.css'

const Sidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaTh />
        },
        {
            path: "/add-product",
            name: "Add Product",
            icon: <FaAd />
        },
        {
            path: "/products",
            name: "Products",
            icon: <FaRegChartBar />
        },
        {
            path: "/user",
            name: "User",
            icon: <FaUserShield />
        },
        {
            path: "/login",
            name: "Login",
            icon: <FaUserAlt />
        },





    ]
    return (
        <div className="Sidebar_container">
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px", cursor: 'pointer' }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className="link"
                            activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }

                <NavLink
                    onClick={localStorage.clear()}
                    to={'../log-out'}
                    className="link"
                    activeclassName="active">
                    <div className="icon"><FaRoute /></div>
                    <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Log Out</div>
                </NavLink>


            </div>
            <main>{children}</main>
        </div >
    );
};

export default Sidebar;

import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const linkClass = ({ isActive }) =>
        `px-5 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
            isActive
                ? 'bg-white text-indigo-700 shadow-md'
                : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
        }`;

    return (
        <nav className="bg-indigo-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-white tracking-tight">🛒 Cartify</span>
                    <span className="text-indigo-200 text-sm font-medium hidden md:inline">Admin Panel</span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-2">
                    <NavLink to="/" end className={linkClass}>
                        📊 Reports
                    </NavLink>
                    <NavLink to="/customers" className={linkClass}>
                        👥 Customers
                    </NavLink>
                    <NavLink to="/products" className={linkClass}>
                        📦 Products
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;

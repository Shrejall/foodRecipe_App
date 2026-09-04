import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("token") ? false : true
    );

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLogin(token ? false : true);
    }, []);

    const checkLogin = () => {
        const token = localStorage.getItem("token");

        if (token) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setIsLogin(true);
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <header className="navbar">

                <h2 className="navbar-logo">
                    <NavLink to="/">
                        Food Blog
                    </NavLink>
                </h2>

                <nav className="navbar-links">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to={isLogin ? "/" : "/myRecipe"}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={(e) => {
                            if (isLogin) {
                                e.preventDefault();
                                setIsOpen(true);
                            }
                        }}
                    >
                        My Recipe
                    </NavLink>

                    <NavLink
                        to={isLogin ? "/" : "/favRecipe"}
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                        onClick={(e) => {
                            if (isLogin) {
                                e.preventDefault();
                                setIsOpen(true);
                            }
                        }}
                    >
                        Favourites
                    </NavLink>

                    <NavLink
                        to="/ai-recipe"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        AI Recipe
                    </NavLink>

                </nav>

                <button
                    type="button"
                    className="login-button"
                    onClick={checkLogin}
                >
                    {isLogin ? "Login" : "Logout"}
                </button>

            </header>

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>
                    <InputForm setIsOpen={() => setIsOpen(false)} />
                </Modal>
            )}
        </>
    );
}
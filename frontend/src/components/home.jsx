import React from "react";
import { useNavigate } from "react-router";
import "../css/home.css";
import Navbar from "./navbar";
const HomeContent = () => {
    const navigate = useNavigate();

    const NavigatetoSignup = () => {
        navigate("/signup");
    };
    const NavigatetoLogin = () => {
        navigate("/login");
    };
    return (
        <div>
            <Navbar />
            <h1 className="headingHome">
                <span className="pay">Pay</span> &{" "}
                <span className="rest">Rest</span>
            </h1>
            <p className="details">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias,
                expedita ex? Praesentium aut laborum eum adipisci ipsum
                laudantium aliquam at, molestiae quae similique molestias?
                Debitis nostrum consequuntur, voluptas eius atque cumque ex
                molestias perferendis aliquid possimus iste magnam suscipit. Ab
                error nobis explicabo atque consequatur. Officiis, eaque.
                Debitis modi placeat esse, eligendi doloribus, eaque similique
                amet tenetur deserunt ea neque repellendus nobis adipisci itaque
                nostrum, laborum vitae fuga unde? At unde, voluptates soluta
                voluptatum praesentium quasi quae repellendus, perspiciatis,
                sunt sapiente quaerat nam rerum sequi facere? Quos odit
                perferendis cumque sed maxime? Rem doloremque dolorem non nam
                nihil magnam ut.
            </p>
            <div className="buttonsignup">
                <button className="signupOwner" onClick={NavigatetoSignup}>
                    Sign up
                </button>
                <button className="signupSeeker" onClick={NavigatetoLogin}>
                    Log in
                </button>
            </div>
        </div>
    );
};

export default HomeContent;

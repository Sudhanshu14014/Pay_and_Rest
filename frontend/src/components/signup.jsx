import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/signup.css";
const Signup = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [fullname, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [popup, setPopup] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    //future implementation
    // validation implementation can be added
    // password strength meter
    const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const contactValid = /^(\+)?([ 0-9]){10,16}$/;
    const emailValid =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordValid = /^(?=.*\d)(?=.*[A-Z])(.{6,50})$/;

    const dataSubmittedForSignup = async () => {
        if (role === null || role === "") {
            alert("Please select a role!");
        } else if (!regName.test(fullname)) {
            alert("Please enter valid Full name!");
        } else if (!contactValid.test(contact)) {
            alert("Please enter valid Contact number!");
        } else if (!emailValid.test(email)) {
            alert("Please enter valid email address!");
        } else if (!passwordValid.test(password)) {
            alert("Please enter strong password!");
        } else if (password !== repassword) {
            alert("Both passwords should be same!");
        } else if (isChecked !== true) {
            alert("Please read the terms & conditions!");
        } else {
            const response = await axios.post(
                "http://localhost:8080/api/signup",
                {
                    role: role,
                    fullname: fullname,
                    contact: contact,
                    email: email,
                    password: password,
                }
            );
            const status = await response.status;
            const data = await response.data;
            console.log(response);
            if (status === 200) {
                setFullName("");
                setContact("");
                setEmail("");
                setPassword("");
                setRole("");
                setRePassword("");
                setPopup(true);
            } else if (status === 209) {
                console.log("error");
                alert(`Error: ${data}`);
            }
        }
    };

    const NavigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div className="gradient-box">
            <div className="mainframe">
                {popup === true ? (
                    <div className="pop-up-box">
                        <h2 className="pop-up-heading">Signup Completed!</h2>
                        <button
                            className="pop-up-login"
                            onClick={NavigateToLogin}
                        >
                            Log in
                        </button>
                    </div>
                ) : (
                    <div className="input-box">
                        <h2 className="input-heading">Sign up</h2>
                        <div className="role-box">
                            <button
                                className={
                                    role === "owner"
                                        ? "chooserole owner-btn clicked-btn"
                                        : "chooserole owner-btn"
                                }
                                onClick={() => {
                                    setRole("owner");
                                }}
                            >
                                Owner
                            </button>
                            <button
                                className={
                                    role === "seeker"
                                        ? "chooserole seeker-btn clicked-btn"
                                        : "chooserole seeker-btn"
                                }
                                onClick={() => {
                                    setRole("seeker");
                                }}
                            >
                                Seeker
                            </button>
                        </div>
                        <label className="inputlabels" htmlFor="fullname">
                            Full Name
                        </label>
                        <input
                            className="ownerinput"
                            type="text"
                            name="fullname"
                            value={fullname}
                            onChange={(e) => {
                                setFullName(e.target.value);
                            }}
                            required
                        />
                        <label className="inputlabels" htmlFor="mobileno">
                            Contact Number
                        </label>
                        <input
                            className="ownerinput"
                            type="text"
                            name="mobileno"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                        />
                        <label className="inputlabels" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="ownerinput"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="inputlabels" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="ownerinput"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="inputlabels" htmlFor="repassword">
                            Re-Password
                        </label>
                        <input
                            className="ownerinput"
                            type="password"
                            name="repassword"
                            value={repassword}
                            onChange={(e) => setRePassword(e.target.value)}
                        />
                        <br />
                        <span className="terms">
                            <input
                                className="checkbox"
                                type="checkbox"
                                name="iagree"
                                checked={isChecked}
                                onChange={() => setIsChecked(!isChecked)}
                            />
                            <label className="inputlabels" htmlFor="iagree">
                                By clicking here, I state that I have read and
                                understood the terms and conditions.
                            </label>
                        </span>
                        <input
                            className="ownersubmit"
                            type="submit"
                            value="Submit"
                            onClick={() => dataSubmittedForSignup()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Signup;

import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "../css/signup.css";
const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const email = useRef("");
    const password = useRef("");
    const [isChecked, setIsChecked] = useState(false);

    const emailValid =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordValid = /^(?=.*\d)(?=.*[A-Z])(.{6,50})$/;

    const handleSubmitLogin = async () => {
        const data = {
            role: role,
            email: email.current?.value,
            password: password.current?.value,
        };

        if (data.role === null || data.role === "") {
            alert("Please select a role!");
        } else if (!emailValid.test(data.email)) {
            alert("Please enter valid email address!");
        } else if (!passwordValid.test(data.password)) {
            alert("Please enter strong password!");
        } else if (isChecked !== true) {
            alert("Please read the terms & conditions!");
        } else {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                data
            );
            const reply = await response.status;

            if (reply === 209) {
                alert("Invalid Credentials!");
            } else if (reply === 200 && role === "owner") {
                navigate("/ownerdashboard");
            } else if (reply === 200 && role === "seeker") {
                navigate("/seekercontent");
            }
        }
    };

    return (
        <div className="mainframe">
            <h2 className="input-heading">Log in</h2>
            <div className="input-box">
                <div className="role-box">
                    <button
                        className={
                            role === "owner"
                                ? "chooserole owner-btn clicked-btn"
                                : "chooserole owner-btn"
                        }
                        onClick={() => setRole("owner")}
                    >
                        Owner
                    </button>
                    <button
                        className={
                            role === "seeker"
                                ? "chooserole seeker-btn clicked-btn"
                                : "chooserole seeker-btn"
                        }
                        onClick={() => setRole("seeker")}
                    >
                        Seeker
                    </button>
                </div>
                <label className="inputlabels" htmlFor="email">
                    Email Address:
                </label>
                <input
                    className="ownerinput"
                    type="email"
                    name="email"
                    ref={email}
                />
                <label className="inputlabels" htmlFor="password">
                    Password:
                </label>
                <input
                    className="ownerinput"
                    type="password"
                    name="password"
                    ref={password}
                />
                <span className="terms">
                    <input
                        type="checkbox"
                        name="iagree"
                        className="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="iagree" className="inputlabels">
                        By clicking here, I state that I have read and
                        understood the terms and conditions.
                    </label>
                </span>
                <input
                    className="ownersubmit"
                    id="login-btn"
                    type="submit"
                    value="Submit"
                    onClick={() => handleSubmitLogin()}
                />
            </div>
        </div>
    );
};

export default Login;

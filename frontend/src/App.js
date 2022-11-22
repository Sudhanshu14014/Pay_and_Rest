import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeContent from "./components/home";
import Signup from "./components/signup";
import Login from "./components/login";
import SeekerContent from "./components/seekercontent";
import OwnerDashboard from "./components/ownerdashboard";

function App() {
    const [data, setData] = useState(null);

    const fetchData = async () => {
        const res = await fetch("http://localhost:8080/api");
        console.log(res);
        const temp = await res.json();
        console.log(temp);
        const msg = temp.message;
        setData(msg);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomeContent />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/seekercontent" element={<SeekerContent />} />
                <Route path="/ownerdashboard" element={<OwnerDashboard />} />
            </Routes>
            <p>{!data ? "loading..." : data}</p>
        </Router>
    );
}

export default App;

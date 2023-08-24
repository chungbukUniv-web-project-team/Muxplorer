import React, { useState, useEffect } from 'react';

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Check if user is logged in by checking the accessToken in local storage
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLoggedIn(true);
            const payload = parseJwt(accessToken); // Decoding JWT payload
            if (payload && payload.username) {
                setUsername(payload.username);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUsername("");
    };

    // Function to decode JWT payload
    const parseJwt = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error decoding JWT payload:", error);
            return null;
        }
    };

    return (
        <nav style={{ backgroundColor: "#444", padding: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            {isLoggedIn ? (
                <>
                    <p style={{ color: "#fff", marginRight: "1rem" }}>{`${username} 님 환영합니다`}</p>
                    <button onClick={handleLogout} style={{ color: "#fff", border: "none", background: "transparent", cursor: "pointer" }}>로그아웃</button>
                </>
            ) : (
                <>
                    <a href="/login" style={{ color: "#fff", marginRight: "1rem" }}>로그인</a>
                    <a href="/signup" style={{ color: "#fff" }}>회원가입</a>
                </>
            )}
        </nav>
    );
}

export default Nav;

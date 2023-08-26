import React, { useState, useEffect } from 'react';

function Nav() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState(""); // 변경: username -> nickname

    useEffect(() => {
        // Check if user is logged in by checking the accessToken in local storage
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setIsLoggedIn(true);

            // Get nickname from local storage
            const storedNickname = localStorage.getItem("nickname");
            if (storedNickname) {
                setNickname(storedNickname);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Remove nickname from local storage
        setIsLoggedIn(false);
        alert("로그아웃 되었습니다.");
        window.location.reload(); // 새로고침 실행
        setNickname(""); // 변경: setUsername -> setNickname
    };

    return (
        <nav style={{ padding: "1rem", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            {isLoggedIn ? (
                <>
                    <p style={{ color: "#444", marginRight: "14px",marginTop: "0",marginBottom: "0", fontSize: "16px", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                        {`${nickname} 님 환영합니다`}
                    </p>
                    <button onClick={handleLogout} style={{ color: "#080808", border: "none", background: "transparent", cursor: "pointer",textOverflow: "ellipsis",fontSize: "16px", // 버튼 폰트 크기 키우기
        textDecoration: "underline"}}>로그아웃</button>
                </>
            ) : (
                <>
                    <a href="/login" style={{ color: "#444", marginRight: "1rem" }}>로그인</a>
                    <a href="/signup" style={{ color: "#444" }}>회원가입</a>
                </>
            )}
        </nav>
    );
}

export default Nav;

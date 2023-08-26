
// export default LoginForm;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginFormCss.css';
import axios from "axios";

function LoginForm() {
    const navigate = useNavigate();
    const apiUrl = "http://220.125.53.144:8000/user-service/api/login";

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (event) => {
        event.preventDefault();

        axios.post(apiUrl, {
            username: formData.username,
            password: formData.password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                localStorage.setItem("accessToken",response.data["accessToken"]);
                localStorage.setItem("refreshToken",response.data["refreshToken"])
                localStorage.setItem("username",response.data["username"]);
                localStorage.setItem("id",response.data["id"]);
                localStorage.setItem("nickname",response.data["nickname"]);
                setIsLoggedIn(true);
                
                setLoginMessage("로그인에 성공하셨습니다.");
                setTimeout(() => {
                    setLoginMessage("");
                    navigate('/');
                    window.location.reload();
                }, 2000);
            })
            .catch(error => setLoginMessage("유저 정보가 올바르지 않습니다."));
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
    };

    return (
        <div className="login-form-container">
            <div className="login-box">
                <h1>로그인</h1>
                <form onSubmit={isLoggedIn ? handleLogout : handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">아이디</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-button">로그인</button>
                </form>
                {loginMessage && <p className="login-message">{loginMessage}</p>}
                {!isLoggedIn && (
                    <p className="signup-link">
                        아이디가 없으신가요? <a href="/signup">회원가입 하기</a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default LoginForm;

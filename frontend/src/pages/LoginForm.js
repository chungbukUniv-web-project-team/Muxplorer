import React, { useState } from 'react';

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [loginMessage, setLoginMessage] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = (event) => {
        event.preventDefault();

        fetch("http://localhost:8000/user-service/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.accessToken) {
                    setLoginMessage("로그인이 되었습니다");
                } else {
                    setLoginMessage("유저 정보가 올바르지 않습니다");
                }
            })
            .catch(error => console.error("Error:", error));
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                /><br /><br />

                <button type="submit">로그인</button>
            </form>
            {loginMessage && <p style={{ color: "green" }}>{loginMessage}</p>}
        </div>
    );
}

export default LoginForm;

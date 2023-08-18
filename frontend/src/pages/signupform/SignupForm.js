import React, { useState } from 'react';
import './SignupFormCss.css';

function SignupForm() {
    const apiUrl = "http://localhost:8000/user-service/api/signup";

    const [formData, setFormData] = useState({
        username: '',
        password1: '',
        password2: '',
        university: '충북대학교', // 기본 선택
        email: '',
        nickname: '',
        // university: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // 여기서 data를 기반으로 원하는 처리를 수행할 수 있습니다.
            })
            .catch(error => console.error("Error:", error));
    };

    return (
        <div class="signup-form-container">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="password1">Password:</label>
                <input
                    type="password"
                    id="password1"
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="password2">Confirm Password:</label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    /><br /><br />

                <label htmlFor="nickname">Nickname:</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                /><br /><br />

                <label htmlFor="university">University:</label>
                <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                >
                    <option value="서울대학교">서울대학교</option>
                    <option value="충북대학교">충북대학교</option>
                    {/* 추가적인 대학교 옵션 추가 */}
                </select>
                <br /><br />

                <button type="submit">가입하기</button>
            </form>
        </div>
    );
}

export default SignupForm;

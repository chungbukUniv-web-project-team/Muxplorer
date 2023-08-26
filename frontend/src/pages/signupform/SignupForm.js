import React, { useState } from 'react';
import './SignupFormCss.css';

function SignupForm() {
    // const apiUrl = "http://localhost:8000/user-service/api/signup";
    // const apiUrl = "http://localhost:11679/api/signup";
    const apiUrl = "http://220.125.53.144:8000/user-service/api/signup";


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
            if (data.status === 200) { // 성공
                alert("회원가입에 성공하셨습니다");
                window.location.href = "/"; // 루트 페이지로 리디렉션
            } else { // 실패
                alert("회원가입에 실패하셨습니다. 사유: " + data.message);
            }
        })
        .catch(error => console.error("Error:", error));
    };

    return (
        <div class="signup-form-container">
            <div class="signup-box">
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">아이디: </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                /><br /><br />
            </div>
            <div className="input-group">
                <label htmlFor="password1">비밀번호: </label>
                <input
                    type="password"
                    id="password1"
                    name="password1"
                    value={formData.password1}
                    onChange={handleChange}
                    required
                /><br /><br />
            </div>
            <div className="input-group">
                <label htmlFor="password2">비밀번호 확인: </label>
                <input
                    type="password"
                    id="password2"
                    name="password2"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                /><br /><br />
            </div>
            <div className="input-group">
                <label htmlFor="email">이메일: </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    /><br /><br />
            </div>
            <div className="input-group">
                <label htmlFor="nickname">닉네임: </label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    required
                /><br /><br />
            </div>
            <div className="input-group">
                <label htmlFor="university">대학교: </label>
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
            </div>
                <button type="submit" className="signup-button">가입하기</button>
            </form>
            </div>
        </div>
    );
}

export default SignupForm;

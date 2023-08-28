import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Token from "../../components/Token";

function WriteProposal() {

    const navigator = useNavigate();
    const [Title, setTitle] = useState("");
    const [Content, setContent] = useState("");
    const onTitleHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const onContentHandler = (event) => {
        setContent(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let data = {
            userId: localStorage.getItem("id"),
            title: Title,
            content: Content
        }

        axios.post("http://220.125.53.144:8000/suggestion-service/api/send/proposal", data, Token(localStorage.getItem("accessToken")))
            .then(response => {
                console.log(response)
                alert("건의사항 전송을 성공했습니다");
                navigator("/proposal/list");
            })
            .catch(error => {
                console.error(error);
                alert("건의사항 전송에 실패했습니다. 로그인을 다시 해주시길 바랍니다")
            })
    }

    return (
        <div>
            <div style={{display: "flex"}}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",  // 수정된 부분
                    paddingTop: "60px",
                    paddingLeft: "135px"
                }}>
                    <h1 style={{color: "rgb(189, 189, 189)", marginBottom: "0px"}}>메뉴</h1>
                    <h1 style={{margin: "0px"}}>건의사항 작성</h1>
                </div>
            </div>
            <div style={{
                paddingTop: "50px",
                paddingLeft: "400px",
                width: "700px",
                borderRadius: "10px",  // 둥글게 처리할 부분
            }}>
                <div style={{
                    background: "#eeeeee",
                    borderRadius: "10px",  // 둥글게 처리할 부분
                    height: "500px",
                    padding: "20px"
                }}>
                    <form onSubmit={onSubmitHandler}>
                        <label style={{marginBottom: "5px", display: "block", fontSize: "25px"}}>건의 제목</label>
                        <input
                            value={Title}
                            type="text"
                            onChange={onTitleHandler}
                            placeholder="제목"
                            style={{
                                width: "400px",
                                padding: "8px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <label style={{marginBottom: "5px", display: "block",fontSize: "25px"}}>건의 내용</label>
                        <textarea
                            value={Content}
                            onChange={onContentHandler}
                            placeholder="내용"
                            style={{
                                width: "600px",
                                height: "300px",
                                padding: "8px",
                                marginBottom: "10px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                resize: "none",
                                fontSize: "16px"

                            }}
                        />
                        <button type="submit" style={{
                            paddingTop:"20px",
                            paddingLeft: "580px",
                            border: "none",
                            background: "none",
                            fontSize: "20px",
                            color:"#7d7f7d"

                        }}>제출</button>
                    </form>
                </div>
                <div style={{
                    paddingTop:"20px",
                    paddingBottom:"30px"
                }}>
                    <Link to={"/proposal/list"} style={{
                        textDecoration: "none",
                        color: "#4a4b4a",
                        paddingLeft: "580px",
                        border: "none",
                        background: "none",
                        fontSize: "20px"
                    }}>
                        뒤로 가기
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default WriteProposal;
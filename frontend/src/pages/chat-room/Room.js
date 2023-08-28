import {redirect, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Token from "../../components/Token";

function Room() {
    const roomId = useParams().id;
    const location = useLocation();
    const userId = location.state.userId;
    const participantId = parseInt(localStorage.getItem("id"));
    const [Suggestion, setSuggestion] = useState([]);
    const [Comment, setComment] = useState("");

    const onCommentHandler = (event) => {
        setComment(event.currentTarget.value);
    }

    useEffect(() => {
        axios.get(`http://220.125.53.144:8000/suggestion-service/api/find/suggestion/${roomId}`)
            .then(response => {
                setSuggestion(response.data);
            })
            .catch(error => console.error(error));
    }, [])

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let data;
        if (participantId === userId) {
            data = {
                toId: 1,
                fromId: participantId,
                message: Comment
            }
        } else {
            data = {
                toId: userId,
                fromId: 1,
                message: Comment
            }
        }

        console.log(data);
        axios.post(`http://220.125.53.144:8000/suggestion-service/api/send/suggestion/${roomId}`, data, Token(localStorage.getItem("accessToken")))
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                alert("문의사항 전송에 실패했습니다. 로그인을 다시 해주시길 바랍니다")
                redirect("/")
            })
    }


    return (
        <div>
            <div style={{
                paddingTop: "20px",
                paddingBottom: "30px",

            }}>
                <table>
                    <tbody>
                    {Suggestion.map((suggestion) => (
                        <div style={{
                            paddingTop: "30px",
                            paddingLeft: "135px"
                        }}>
                            <div style={participantId === suggestion.fromId ? {
                                border: "3px solid red",
                                paddingTop: "20px",
                                background: "#eff3f7",
                                width: "1170px",
                                height: "60px",
                                borderRadius: "10px",  // 둥글게 처리할 부분
                            } : {
                                border: "3px solid blue",
                                paddingTop: "20px",
                                background: "#eff3f7",
                                width: "1170px",
                                height: "60px",
                                borderRadius: "10px",  // 둥글게 처리할 부분
                            }}>
                                <div style={{
                                    width: "1000px",
                                    height: "30px",
                                    color: "#9b9d9f",
                                    fontSize: "18px",
                                    paddingLeft: "30px",
                                }}>{participantId === suggestion.fromId ? "보낸 내용 : " : "받은 내용 : "}{suggestion.message}</div>
                                <div style={{
                                    width: "1000px",
                                    height: "30px",
                                    color: "#9b9d9f",
                                    fontSize: "15px",
                                    paddingLeft: "30px",
                                    margin: "0px",

                                }}>
                                    {new Date(suggestion.createdAt).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </div>
                            </div>
                        </div>

                    ))}
                    </tbody>
                </table>
            </div>

            <form onSubmit={onSubmitHandler}>
                <div style={{
                    paddingLeft: "500px"
                }}>
                    <textarea
                        value={Comment}
                        onChange={onCommentHandler}
                        placeholder="답장"
                        style={{
                            width: "600px",
                            height: "80px",
                            padding: "8px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            resize: "none",
                            fontSize: "16px",
                            background:"#e1e8e1"
                        }}
                    />
                    <button type="submit" style={{
                        paddingTop: "20px",
                        paddingLeft: "580px",
                        border: "none",
                        background: "none",
                        fontSize: "20px",
                        color: "#7d7f7d",
                        paddingBottom:"30px"

                    }}>보내기
                    </button>
                </div>

            </form>
        </div>
    )
}

export default Room;
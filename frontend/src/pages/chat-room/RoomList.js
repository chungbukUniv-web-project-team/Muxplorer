import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, redirect, useNavigate} from "react-router-dom";
import Token from "../../components/Token";

function RoomList() {
    const [Room, setRoom] = useState([]);
    const userId = localStorage.getItem("id");
    const username = localStorage.getItem("nickname");
    const navigator = useNavigate();
    useEffect(() => {
        axios.get("http://220.125.53.144:8000/suggestion-service/api/find/room", Token(localStorage.getItem("accessToken")))
            .then(response => {
                console.log(response.data);
                setRoom(response.data);
            })
            .catch(error => {
                axios.get(`http://220.125.53.144:8000/suggestion-service/api/find/room/${userId}`)
                    .then(response => {
                        console.log(response.data)
                        if (response.data.code === "NotFoundRoomByUserIdException") {
                            axios.post(`http://220.125.53.144:8000/suggestion-service/api/create/room/${userId}`, {
                                spaceName: username + "님의 문의입니다",
                            }, Token(localStorage.getItem("accessToken")))
                                .then(response => {
                                    alert("문의 방이 생성되었습니다. 다시 접속해주시길 바랍니다.");
                                    redirect("/");
                                });
                        } else {
                            const roomId = response.data.id;
                            navigator(`/room/${roomId}`,{state:{userId:response.data.userId}})
                        }
                    })
            })
    }, [])
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
                    <h1 style={{color: "rgb(189, 189, 189)", marginBottom: "0px"}}>문의사항</h1>
                    <h1 style={{margin: "0px"}}>채팅방 리스트</h1>
                </div>
            </div>
            <div>
                <div style={{
                    paddingBottom:"30px"
                }}>
                    <table>
                        <tbody>
                        {Room.map((room) => (

                            <div style={{
                                paddingTop: "30px",
                                paddingLeft: "135px"
                            }}>
                                <div style={{
                                    paddingTop: "20px",
                                    background: "#eff3f7",
                                    width: "1170px",
                                    height: "130px",
                                    borderRadius: "10px",  // 둥글게 처리할 부분
                                }}>
                                    <div style={{
                                        width: "400px",
                                        height: "30px",
                                        color: "#9b9d9f",
                                        fontSize: "25px",
                                        paddingLeft: "30px",
                                    }}><Link to={`/room/${room.id}`} style={{
                                        textDecoration: "none",
                                        color: "#9b9d9f",
                                    }} state={{userId:room.userId}}>
                                        {room.spaceName}</Link></div>
                                    <div style={{
                                        paddingTop: "30px",
                                        width: "1000px",
                                        height: "30px",
                                        color: "#9b9d9f",
                                        fontSize: "20px",
                                        paddingLeft: "900px",
                                        margin: "0px",

                                    }}>
                                        {new Date(room.lastedAt).toLocaleString('ko-KR', {
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
            </div>
        </div>
    )
}

export default RoomList;
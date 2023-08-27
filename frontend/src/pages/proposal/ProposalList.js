import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, redirect} from "react-router-dom";
import Token from "../../components/Token";

function ProposalList() {
    const [Proposal, setProposal] = useState([]);
    const [ProposalId, setProposalId] = useState(0);

    useEffect(() => {
        axios.get("http://220.125.53.144:8000/suggestion-service/api/get/proposal/list", Token(localStorage.getItem("accessToken")))
            .then((response) => {
                console.log(response.data);
                setProposal(response.data);
            })
            .catch((error) => console.error(error));
    }, [])

    const onDeleteProposalHandler = (event) => {
        event.preventDefault();
        const proposalId = parseInt(event.target.id.value);
        axios.delete(`http://220.125.53.144:8000/suggestion-service/api/delete/proposal/${proposalId}`, Token(localStorage.getItem("accessToken")))
            .then(response => {
                console.log(response)
                alert("건의사항 삭제에 성공했습니다");
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
                alert("관리자만 삭제가 가능합니다")
            });

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
                    <h1 style={{margin: "0px"}}>건의사항</h1>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    paddingLeft: "950px",
                    paddingRight: "104px",
                    paddingTop: "143px",
                }}>
                    <h2 style={{
                        paddingTop: "15px",
                        width: "130px",
                        height: "40px",
                        margin: "auto",
                        background: "#333333",
                        color: "rgb(255, 255, 255)",
                        textAlign: "center",  // 변경된 부분
                        borderRadius: "10px",  // 둥글게 처리할 부분
                    }}>
                        <Link to={"/write/proposal"} style={{
                            textDecoration: "none",
                            color: "rgb(255, 255, 255)",
                        }}>
                            건의하기
                        </Link>
                    </h2>
                </div>
            </div>


            <div style={{
                paddingTop: "20px",
                paddingBottom: "30px",

            }}>
                <table>
                    <tbody>
                    {Proposal.map((proposal) => (
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
                                }}>제목 : {proposal.title}</div>
                                <div style={{
                                    paddingTop: "10px",
                                    width: "1000px",
                                    height: "30px",
                                    color: "#9b9d9f",
                                    fontSize: "17px",
                                    paddingLeft: "30px",
                                    margin: "0px",

                                }}>내용 : {proposal.content}</div>
                                <div style={{
                                    width: "1000px",
                                    height: "30px",
                                    color: "#9b9d9f",
                                    fontSize: "20px",
                                    paddingLeft: "30px",
                                    margin: "0px",

                                }}>
                                    {new Date(proposal.createdAt).toLocaleString('ko-KR', {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false
                                    })}
                                </div>
                                <form onSubmit={onDeleteProposalHandler} ㄴ>
                                    <div style={{
                                        width: "1000px",
                                        height: "30px",
                                        paddingLeft: "1000px",
                                    }}>
                                        <input type={"hidden"} name="id" value={proposal.id}/>

                                        <button type={"submit"} style={{
                                            border: "none",
                                            background: "none",
                                            color: "#9b9d9f",
                                            fontSize: "20px",
                                        }}>삭제하기
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>

                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProposalList;
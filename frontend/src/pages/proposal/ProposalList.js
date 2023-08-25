import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function ProposalList() {
    const [Proposal, setProposal] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/suggestion-service/api/get/proposal-list")
            .then((response) => {
                console.log(response.data);
                setProposal(response.data);
            })
            .catch((error) => console.error(error));
    }, [])

    const obj = {
        header: ["번호", "제목", "게시일"],
    };
    return (
        <div>
            <div>
                <table>
                    <thead>
                    <tr>
                        {obj.header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {Proposal.map((proposal) => (
                        <tr key={proposal.id}>
                            <td>
                                {proposal.id}
                            </td>
                            <td><Link to={`/proposal/${proposal.id}`}>{proposal.title}</Link></td>
                            <td>{proposal.content}</td>
                            {new Date(proposal.createdAt).toLocaleString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Link to={"/write/proposal"}>
                    <button>글쓰기</button>
                </Link>
            </div>
        </div>
    )
}

export default ProposalList;
import {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

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

    const onSubmitHandler = (event) =>{
        event.preventDefault();

        let data = {
            userId:1,
            title:Title,
            content:Content
        }

        axios.post("http://localhost:8000/suggestion-service/api/send/proposal", data)
            .then(response => {
                navigator("/");
            });

    }

    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                <label>제목</label>
                <input
                    value={Title}
                    type="text"
                    onChange={onTitleHandler}
                    placeholder="제목"
                />
                <label>내용</label>
                <textarea
                    value={Content}
                    onChange={onContentHandler}
                    placeholder="내용"
                />
                <button type="submit">제출하기</button>
            </form>
            <Link to={"/"}>
                <button type={"submit"}>뒤로 가기</button>
            </Link>
        </div>
    )
}

export default WriteProposal;
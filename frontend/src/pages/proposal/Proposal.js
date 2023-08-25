import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Proposal() {

    const params = useParams().id;
    console.log(params);
    const [Prop, setProp] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8000/suggestion-service/api/get/proposal/${params}`)
            .then((response) => {
                console.log(response.data);
                setProp(response.data);
            })
    }, [])

    return (
        <div>
            <input value={Prop.id}/>
            <br/>
            <input value={Prop.createdAt}/>
            <br/>
            <input value={Prop.title}/>
            <br/>
            <input value={Prop.content}/>
            <br/>
            <Link to={"/proposal/list"}>
                <button>뒤로 가기</button>
            </Link>
        </div>
    )
}

export default Proposal;
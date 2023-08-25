import {useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

function Room() {
    const id = useParams().id;
    let location = useLocation().state.userId;
    console.log(location);
    const [Suggestion, setSuggestion] = useState([]);
    const [Room, setRoom] = useState({});
    useEffect(()=>{

        axios.get(`http://localhost:8000/suggestion-service/api/find/room/pk/${id}`)
            .then(response=>{
                console.log(response.data);
                setRoom(response.data);
            })

        axios.get(`http://localhost:8000/suggestion-service/api/find/suggestion/${id}`)
            .then(response => {
                console.log(response.data);
                setSuggestion(response.data);
            })
            .catch(error => console.error(error));
    },[])
    return (
        <div>
            <h1>test</h1>
        </div>
    )
}

export default Room;
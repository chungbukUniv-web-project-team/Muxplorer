import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function RoomList() {
    const [Room, setRoom] = useState([]);


    useEffect(() => {
        axios.get("http://localhost:8000/suggestion-service/api/find/room")
            .then(response => {
                console.log(response.data);
                setRoom(response.data);
            })
            .catch(error => console.error(error))
    }, [])
    const obj = {
        header: ["번호", "제목", "게시일"],
    };
    return (
        <div>
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
                        {Room.map((room) => (
                            <tr key={room.id}>
                                <td>
                                    {room.id}
                                </td>
                                <td><Link to={`/room/${room.id}`} state={{userId: room.userId}}> {room.spaceName}</Link>
                                </td>
                                {new Date(room.lastedAt).toLocaleString('ko-KR', {
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
                </div>
            </div>
        </div>
    )
}

export default RoomList;
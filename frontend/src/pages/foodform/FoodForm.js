import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './FoodFormCss.css';
const RestImages = ["/images/rest1.png", "/images/rest2.png", "/images/rest3.png"];

function FoodForm() {


    const [Foods, setFoods] = useState([]);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % RestImages.length);
    };


    const prevImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex - 1 + RestImages.length) % RestImages.length
        );
    };
    useEffect(() => {
        axios.get('http://220.125.53.144:8000/crawling-service/api/find/food-list')
            .then(response => {
                setFoods(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error fetching food data:', error);
            });
    }, []);

    const filteredFoods = Foods.filter(food => {

        if (currentImageIndex === 0) {
            return food.time === "한빛";
        } else if (currentImageIndex === 1) {
            return food.time === "별빛";
        } else {
            return food.time === "은하수";// && food.rest === "점심";
        }
    });

    const menuByRest = {
        아점: {
            월: [],
            화: [],
            수: [],
            목: [],
            금: []
        },
        점심: {
            월: [],
            화: [],
            수: [],
            목: [],
            금: []
        },
        석식: {
            월: [],
            화: [],
            수: [],
            목: [],
            금: []
        },
        저녁: {
            월: [],
            화: [],
            수: [],
            목: [],
            금: []
        }
    };


    filteredFoods.forEach(food => {
        const day = food.day; // 요일 값 (월, 화, 수, 목, 금)
        const rest = food.rest; // 식사 종류 (아점, 점심, 석식)
        const menu = food.menu; // 메뉴 값
        const date = food.date; // 날짜 값

        if (!menuByRest[rest][day]) {
            menuByRest[rest][day] = []; // 배열을 초기화하고 메뉴 추가
        } else {
            menuByRest[rest][day].push(menu); // 해당 요일 배열에 메뉴 추가
            menuByRest[rest][day].date = date; // 날짜 정보 추가
        }
    });

    const filteredMenuByDay = menuByRest;

    return (
        <div style={{display: "flex", alignItems: "flex-start", justifyContent: "space-between"}}>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center",
                justifyContent: "center", marginLeft: "150px", marginTop: "150px", marginBottom:"150px"}}>
                <img
                    src={RestImages[currentImageIndex]}
                    alt="식당"
                    style={{width: "100px", maxWidth: "100px"}}
                />
                <div style={{display: "flex", alignItems: "center"}}>
                    <button style={{ border: "none", background: "none", fontSize: "16px", cursor: "pointer" }} onClick={prevImage}> ◀</button>
                    <button style={{ border: "none", background: "none", fontSize: "16px", cursor: "pointer" }} onClick={nextImage}> ▶</button>
                </div>
            </div>

            <div>
                {currentImageIndex === 0 && (
                    <table className="meal-table">
                        <thead>
                        <tr>
                            <th colSpan="5" style={{ textAlign: 'center' }}>아점코너 (오전 10:00 ~ 오후 1:00)</th>
                        </tr>
                        <tr>
                            <th>월[{filteredMenuByDay['아점']['월'].date}]</th>
                            <th>화[{filteredMenuByDay['아점']['화'].date}]</th>
                            <th>수[{filteredMenuByDay['아점']['수'].date}]</th>
                            <th>목[{filteredMenuByDay['아점']['목'].date}]</th>
                            <th>금[{filteredMenuByDay['아점']['금'].date}]</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{filteredMenuByDay['아점']['월']}</td>
                            <td>{filteredMenuByDay['아점']['화']}</td>
                            <td>{filteredMenuByDay['아점']['수']}</td>
                            <td>{filteredMenuByDay['아점']['목']}</td>
                            <td>{filteredMenuByDay['아점']['금']}</td>
                        </tr>
                        </tbody>
                    </table>
                )}

                {(currentImageIndex === 0 || currentImageIndex === 1 || currentImageIndex === 2) && (
                    <table className="meal-table">
                        <thead>
                        <tr>
                            <th colSpan="5" style={{ textAlign: 'center' }}>점심식사 (오전 11:00 ~ 오후 2:00)</th>
                        </tr>
                        <tr>
                            <th>월[{filteredMenuByDay['점심']['월'].date}]</th>
                            <th>화[{filteredMenuByDay['점심']['화'].date}]</th>
                            <th>수[{filteredMenuByDay['점심']['수'].date}]</th>
                            <th>목[{filteredMenuByDay['점심']['목'].date}]</th>
                            <th>금[{filteredMenuByDay['점심']['금'].date}]</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{filteredMenuByDay['점심']['월']}</td>
                            <td>{filteredMenuByDay['점심']['화']}</td>
                            <td>{filteredMenuByDay['점심']['수']}</td>
                            <td>{filteredMenuByDay['점심']['목']}</td>
                            <td>{filteredMenuByDay['점심']['금']}</td>
                        </tr>
                        </tbody>
                    </table>
                )}

                {(currentImageIndex === 0 ) && (
                    <table className="meal-table">
                        <thead>
                        <tr>
                            <th colSpan="5" style={{ textAlign: 'center' }}>석식코너 (오후 4:30 ~ 오후 5:30)</th>
                        </tr>
                        <tr>
                            <th>월[{filteredMenuByDay['석식']['월'].date}]</th>
                            <th>화[{filteredMenuByDay['석식']['화'].date}]</th>
                            <th>수[{filteredMenuByDay['석식']['수'].date}]</th>
                            <th>목[{filteredMenuByDay['석식']['목'].date}]</th>
                            <th>금[{filteredMenuByDay['석식']['금'].date}]</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{filteredMenuByDay['석식']['월']}</td>
                            <td>{filteredMenuByDay['석식']['화']}</td>
                            <td>{filteredMenuByDay['석식']['수']}</td>
                            <td>{filteredMenuByDay['석식']['목']}</td>
                            <td>{filteredMenuByDay['석식']['금']}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
                {(currentImageIndex === 2 ) && (
                    <table className="meal-table">
                        <thead>
                        <tr>
                            <th colSpan="5" style={{ textAlign: 'center' }}>석식코너 (오후 4:30 ~ 오후 5:30)</th>
                        </tr>
                        <tr>
                            <th>월[{filteredMenuByDay['저녁']['월'].date}]</th>
                            <th>화[{filteredMenuByDay['저녁']['화'].date}]</th>
                            <th>수[{filteredMenuByDay['저녁']['수'].date}]</th>
                            <th>목[{filteredMenuByDay['저녁']['목'].date}]</th>
                            <th>금[{filteredMenuByDay['저녁']['금'].date}]</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{filteredMenuByDay['저녁']['월']}</td>
                            <td>{filteredMenuByDay['저녁']['화']}</td>
                            <td>{filteredMenuByDay['저녁']['수']}</td>
                            <td>{filteredMenuByDay['저녁']['목']}</td>
                            <td>{filteredMenuByDay['저녁']['금']}</td>
                        </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default FoodForm;

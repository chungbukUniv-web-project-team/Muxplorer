import React, { useState, useEffect } from "react";
import FoodForm from "../foodform/FoodForm";

const NoticeImages = [
    { src: "/images/notice1.png", link: "https://www.cbnucoop.com/6981/" },
    { src: "/images/notice2.png", link: "hhttps://www.cbnucoop.com/6979/" },
    { src: "/images/notice3.png", link: "https://www.cbnucoop.com/6974/" },
];

const handleAdminButtonClick = () => {
    // 여기에 API 요청 전송 코드 추가
    fetch("http://220.125.53.144:8000/crawling-service/api/create/foods", {
        method: "POST",
        // 추가적인 옵션을 설정할 수 있습니다.
    })
        .then(response => response.json())
        .then(data => {
            // API 요청에 대한 응답을 처리하는 코드
        })
        .catch(error => {
            // 에러 처리 코드
        });
};

function Home() {
    const [currentNoticeIndex, setCurrentNoticeIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNoticeIndex((prevIndex) => (prevIndex + 1) % NoticeImages.length);
        }, 3000); // 3초마다 이미지 변경

        return () => {
            clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
        };
    }, []);

    return (
        <div>
            <div style={{ marginTop: "100px", marginLeft:"20px",marginBottom:"100px", display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                    <h1 style={{ color: "rgb(189,189,189)" }}>주간</h1>
                    <h1>식당 메뉴</h1>
                </div>
                <div style={{ flex: 1 }}>
                    <a
                        href={NoticeImages[currentNoticeIndex].link}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src={NoticeImages[currentNoticeIndex].src}
                            alt="공지사항"
                            style={{ width: "90%", maxWidth: "770px", cursor: "pointer" }}
                        />
                    </a>
                </div>
            </div>
            <FoodForm />

            <button style={{ border: "none", background:"rgb(189,189,189)", color:"white" ,ontSize: "16px", cursor: "pointer" }} onClick={handleAdminButtonClick}>관리자</button>
        </div>
    );
}

export default Home;

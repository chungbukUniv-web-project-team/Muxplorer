import React, { useState, useEffect } from "react";
import FoodForm from "../foodform/FoodForm";

const NoticeImages = [
    { src: "/images/notice1.png", link: "https://www.cbnucoop.com/6981/" },
    { src: "/images/notice2.png", link: "hhttps://www.cbnucoop.com/6979/" },
    { src: "/images/notice3.png", link: "https://www.cbnucoop.com/6974/" },
];

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
        </div>
    );
}

export default Home;

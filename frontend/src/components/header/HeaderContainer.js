import React, { Component } from 'react';
import Header from './Header';
import Nav from "../nav/Nav";

class HeaderContainer extends Component {
    render() {

        return (
            <Header>
                <nav style ={{padding: "1rem", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <a href="/" className="nav-link" style={{color: "#444", margin : "5rem" , textDecoration: "none" }}>홈</a>
                    <a href="/foods" className="nav-link" style={{color: "#444", margin: " 5rem", textDecoration: "none"}}>음식/리뷰</a>
                    <a href="/proposal/list" className="nav-link" style={{color: "#444", margin: "5rem", textDecoration: "none"}}>건의사항</a>
                    <a href="room/list" className="nav-link" style={{color: "#444", margin: "5rem", textDecoration: "none"}}>1대1문의</a>
                </nav>
                <Nav/>
            </Header>
        );
    }
}

export default HeaderContainer;
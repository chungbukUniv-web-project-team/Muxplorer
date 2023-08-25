import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/Home';
import LoginForm from './pages/loginform/LoginForm';
import SignupForm from './pages/signupform/SignupForm';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Nav from './components/nav/Nav';


function App() {
    return (
        <div>
            <Header/>
            <Nav/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginForm/>}/> {/* 추가 */}
                <Route path="/signup" element={<SignupForm/>}/> {/* 추가 */}
                <Route exact path={"/proposal/list"} element={<ProposalList/>}/>
                <Route exact path={"/proposal/:id"} element={<Proposal/>}/>
                <Route exact path={"/proposal/send"} element={<WriteProposal/>}/>
                <Route exact path={"/room/list"} element={<RoomList/>}/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;

import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Home from './pages/home/Home';
import LoginForm from './pages/loginform/LoginForm';
import SignupForm from './pages/signupform/SignupForm';

import Footer from './components/footer/Footer';

import FoodListPage from './pages/foodList/FoodListPage';

import ProposalList from './pages/proposal/ProposalList';
import WriteProposal from './pages/proposal/WriteProposal';
import RoomList from './pages/chat-room/RoomList';
import ReviewPage from './pages/review/ReviewPage';

import HeaderContainer from "./components/header/HeaderContainer";
import FoodForm from "./pages/foodform/FoodForm";


function App() {
    return (
        <div>
            <HeaderContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/signup" element={<SignupForm/>}/>

                <Route exact path={"/proposal/list"} element={<ProposalList/>}/>
                <Route exact path={"/write/proposal"} element={<WriteProposal/>}/>
                <Route exact path={"/room/list"} element={<RoomList/>}/>
                <Route path='/foods' element={<FoodListPage />} />
                <Route path='/review/:id' element={<ReviewPage />} />
                <Route path="/food" element={<FoodForm />} />

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
import './App.css';
import React, {useState} from "react";
import {Routes,BrowserRouter, Route} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import Toolbar from "./components/Toolbar";
import ProfilePage from "./pages/ProfilePage";
import ChangeProfilePicturePage from "./pages/ChangeProfilePicturePage";
import ChangeUsernamePage from "./pages/ChangeUsernamePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import AllUsersPage from "./pages/AllUsersPage";
import SingleUserProfilePage from "./pages/SingleUserProfilePage";
import ConversationsPage from "./pages/ConversationsPage";
import ChatPage from "./pages/ChatPage";
import FadingScreen from "./components/FadingScreen";
import ChatifyPage from "./pages/ChatifyPage";
function App() {

    const [showFadingScreen, setShowFadingScreen] = useState(true);
    const handleSplashFinish = () => {
        setShowFadingScreen(false)
    };
  return (
    <div className="backFade">
        <BrowserRouter>
            {showFadingScreen ? (
                <FadingScreen onFinish={handleSplashFinish}/>
            ) : (
            <div className="back">
                <Toolbar/>
                <Routes>
                    <Route path="/" element={<ChatifyPage/>}/>
                    <Route path="/registration" element={<RegistrationPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/changeProfilePicture" element={<ChangeProfilePicturePage/>}/>
                    <Route path="/changeUsername" element={<ChangeUsernamePage/>}/>
                    <Route path="/changePassword" element={<ChangePasswordPage/>}/>
                    <Route path="/users" element={<AllUsersPage/>}/>
                    <Route path="/user/:username" element={<SingleUserProfilePage/>}/>
                    <Route path="/conversations" element={<ConversationsPage/>}/>
                    <Route path="/conversations/chat/:conversationId" element={<ChatPage/>}/>

                </Routes>
            </div> )}
        </BrowserRouter>
    </div>
  );
}

export default App;

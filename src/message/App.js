import React from "react";
import "./App.css";
import ChatBody from "./components/chatBody/ChatBody";

function App({ deviceKey }) {
    return (
        <div className='__main'>
            <ChatBody deviceKey={deviceKey} />
        </div>
    );
}

export default App;

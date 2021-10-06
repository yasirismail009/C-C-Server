import React, { useEffect, useState } from "react";
import ChatListItems from "./ChatListItems";
import axios from "axios";
import "./chatList.css";
import { useDispatch } from "react-redux";
import { changeDeviceKey, changeUserAddress } from "../../../store";

const allChatUsers = [
    {
        image: "dummy_profile.png",
        id: 1,
        name: "Tim Hover",
        active: true,
        isOnline: true,
    },
    {
        image:
            "https://pbs.twimg.com/profile_images/1055263632861343745/vIqzOHXj.jpg",
        id: 2,
        name: "Ayub Rossi",
        active: false,
        isOnline: false,
    },
    {
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQEZrATmgHOi5ls0YCCQBTkocia_atSw0X-Q&usqp=CAU",
        id: 3,
        name: "Hamaad Dejesus",
        active: false,
        isOnline: false,
    },
    {
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZ6tM7Nj72bWjr_8IQ37Apr2lJup_pxX_uZA&usqp=CAU",
        id: 4,
        name: "Eleni Hobbs",
        active: false,
        isOnline: true,
    },
    {
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRJo1MiPQp3IIdp54vvRDXlhbqlhXW9v1v6kw&usqp=CAU",
        id: 5,
        name: "Elsa Black",
        active: false,
        isOnline: false,
    },
    {
        image:
            "https://huber.ghostpool.com/wp-content/uploads/avatars/3/596dfc2058143-bpfull.png",
        id: 6,
        name: "Kayley Mellor",
        active: false,
        isOnline: true,
    },
    {
        image:
            "https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png",
        id: 7,
        name: "Hasan Mcculloch",
        active: false,
        isOnline: true,
    },
    {
        image:
            "https://auraqatar.com/projects/Anakalabel/media//vesbrand/designer4.jpg",
        id: 8,
        name: "Autumn Mckee",
        active: false,
        isOnline: false,
    },
    {
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSM6p4C6imkewkCDW-9QrpV-MMAhOC7GnJcIQ&usqp=CAU",
        id: 9,
        name: "Allen Woodley",
        active: false,
        isOnline: true,
    },
    {
        image: "https://pbs.twimg.com/profile_images/770394499/female.png",
        id: 10,
        name: "Manpreet David",
        active: false,
        isOnline: true,
    },
];

export default function ChatList({ deviceKey }) {
    const [chatUsers, setChatUsers] = useState(allChatUsers);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(true);
        async function getAllUsers() {
            const res = await axios.get("/sms/conversations/", {
                headers: { "x-api-key": deviceKey },
            });
            const data = res.data.data;
            dispatch(changeUserAddress({ userAddress: data[0].address }));
            setChatUsers(data);
        }
        getAllUsers();
        setLoading(false);
    }, [deviceKey]);

    return (
        <div className='main__chatlist'>
            <div className='chatlist__heading'>
                <h2>Chats</h2>
            </div>
            <div className='chatList__search'>
                <div className='search_wrap'>
                    <input type='text' placeholder='Search Here' required />
                    <button className='search-btn'>
                        <i className='fa fa-search' />
                    </button>
                </div>
            </div>
            <div className='chatlist__items'>
                {loading ||
                    chatUsers.map((user, index) => {
                        return (
                            <ChatListItems
                                deviceKey={deviceKey}
                                name={user.address}
                                key={user.id}
                                animationDelay={index + 1}
                                active={user.active ? "active" : ""}
                                isOnline={user.isOnline ? "active" : ""}
                                image='https://www.paintingcontest.org/components/com_djclassifieds/assets/images/default_profile.png'
                            />
                        );
                    })}
            </div>
        </div>
    );
}

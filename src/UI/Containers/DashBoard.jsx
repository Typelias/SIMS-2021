import React from 'react';
import SideBar from '../Components/SideBar';
import Main from '../Main/Main';
import BottomBar from '../Components/BottomBar';


const DashBoard = ({
                       users,
                       messages,
                       videoList,
                       muteCallback,
                       videoCallback,
                       submitCallback,
                       messageChangeCallback,
                       place,
                       children,
                       currentMessage
                   }) => {
    return (
        <div>
            <SideBar
                users={users}
                messages={messages}
                messageChangeCallback={messageChangeCallback}
                submitCallback={submitCallback}
                currentMessage={currentMessage}
            />
            <Main place={place} list={videoList}>
                {children}
            </Main>
            <BottomBar
                mute={muteCallback}
                video={videoCallback}
            />
        </div>
    )
}

export default DashBoard

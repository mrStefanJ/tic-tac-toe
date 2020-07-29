import { observer } from 'mobx-react-lite';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './style/style.scss';

const Home = observer(() => {
    const history = useHistory();

    function goToGameRoom(){
        history.push('/room/RoomOne')
    }
    function goToCreateRoom(){
        history.push('/createroom')
    }

    function goToRegister(){
        history.push('/register')
    }
        return (
            <div className="home h-center">
                    <div className="home-header">
                        <h1>Welcome to Tic-Tac-Toe Game</h1>
                        <div className="h-center">
                            <button className="btn" onClick={goToGameRoom}>Go to game room</button>
                            <button className="btn" onClick={goToCreateRoom}>Create Room</button>
                            <button className="btn" onClick={goToRegister}>Register</button>
                        </div>
                    </div>
            </div>
        )
    }
)

export default Home
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Store } from '../store/Store';
import '../pages/style/style.scss';

const CreateRoom = observer((props: {store:Store}) => {
    const history = useHistory();
    const [boards, setBoards] = useState(props.store.allBoards);

    const getAllBoards = async () =>
    await fetch('http://178.128.206.150:7000/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        apikey: props.store.apikeyValue
      })
    }).then(response => response.json())
      .then((data) => {
        setBoards(data)
        props.store.addBoard(data);
      });

    function goBack() {
        history.push('/')
    }

   console.log(props.store)
    return (
        <div className="home h-center">
            <div className="home-header">
                <h1>Rooms</h1>
                <div className="h-center">
                    <button type="button" className="btn" onClick={async () => {
                         const apiURL = 'http://178.128.206.150:7000/create_board';
                         await fetch(apiURL, {
                             method: 'POST',
                             headers: {
                                 'Content-Type': 'application/json'
                             },
                             body: JSON.stringify({
                                 apikey: props.store.apikeyValue
                             })
                         })
                             .then(resp => resp.json())
                             .then(data => {
                                getAllBoards();
                             })
                             .catch(error => {
                                 console.error('Error', error);
                             })
                     }}>Register</button><br/>
                    <button className="btn" onClick={goBack}>Back to Home Page</button>
                </div>
                <div className="all-boards">
                <p>Id {''} Number of Players</p>
                {boards.map((board) =>
                     <p>{board.id} {' '} {board.players} <button className="btn">Enter Room</button></p>
                )}
                </div>
            </div>
        </div>
    )
}
)

export default CreateRoom

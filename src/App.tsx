import React, { lazy, Suspense, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Store } from "./store/Store";
import { observer } from "mobx-react-lite";


const Home = lazy(() => import('./pages/home'))
const Room = lazy(() => import('./pages/room'))
const CreateRoom = lazy(() => import('./room/createRoom'))
const Register = lazy(() => import('./pages/register/index'))

export const App = observer(() => {
  const [apikey, setApiKey] = useState('');
  const store = new Store();
  const getApiKey = async () => {
    return await fetch('http://178.128.206.150:7000/register_candidate', {
      method: 'POST'
    }).then(response => response.json())
      .then((data) => {
        setApiKey(data.apikey)
      });
  };

  useEffect(() => {
    if (apikey) {
      return;
    }
    getApiKey();
  }, [apikey])
  store.setApikey(apikey);

  return (
    <div>
      <Switch>
        <Suspense fallback={
          <div>
            <h1>Loading...</h1>
          </div>
        }>
          <Route path="/room" render={() => <Room apikey={store.apikeyValue} />} />
          <Route path="/createroom" render={() => <CreateRoom store={store} />} />
          <Route path="/register" render={() => <Register store={store} />} />
          <Route exact path="/" component={Home} />
        </Suspense>
      </Switch>
    </div>
  );
})

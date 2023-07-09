
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotsDetails from "./components/spotsDetails";
import CreateSpot from "./components/CreateSpot";
import { Route } from "react-router-dom";
import CurrentSpots from "./components/CurrentSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotsDetails />
        </Route>
        <Route exact path="/spots">
          <CreateSpot />
        </Route>
        <Route exact path="/current">
          <CurrentSpots />
        </Route>
      </Switch>)}
    </>
  );
}

export default App;

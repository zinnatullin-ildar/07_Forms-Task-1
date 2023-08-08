import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navBar";
import Users from "./layouts/users";
import MainPage from "./layouts/main";
import Login from "./layouts/login";

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/users/:userId?" component={Users} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;

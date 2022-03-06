import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Buttons from "./pages/Ui/buttons"
const Router = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/" render={() =>
                        <Admin>
                            <Route path="/ui/buttons" component={Buttons} />
                        </Admin>
                    } />
                </Switch>
            </App>
        </BrowserRouter>
    );
}

export default Router;
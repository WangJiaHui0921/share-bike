import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Buttons from "./pages/Ui/buttons";
import Modals from "./pages/Ui/modals";
import Loadings from './pages/Ui/loadings';
import Notifications from './pages/Ui/notifications';
const Router = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/" render={() =>
                        <Admin>
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loadings} />
                            <Route path="/ui/notification" component={Notifications} />
                        </Admin>
                    } />
                </Switch>
            </App>
        </BrowserRouter>
    );
}

export default Router;
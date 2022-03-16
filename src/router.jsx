import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Buttons from "./pages/Ui/buttons";
import Modals from "./pages/Ui/modals";
import Loadings from './pages/Ui/loadings';
import Notifications from './pages/Ui/notifications';
import Messages from "./pages/Ui/messages";
import Tabs from "./pages/Ui/tabs";
import Gallery from './pages/Ui/gallerys';
import Carousel from './pages/Ui/carousels';
import Login from "./pages/Form/login";
import Register from "./pages/Form/reg";
import Basic from "./pages/Table/basic";
import High from "./pages/Table/high";
import City from "./pages/City";
import Order from "./pages/Order";
import Common from "./common";
import Detail from "./pages/Order/detail";
import User from "./pages/User";
import BikeMap from "./pages/BikeMap";
import Bar from "./pages/ECharts/bar";
import Pie from "./pages/ECharts/pie";
import Line from "./pages/ECharts/line";
import Rich from "./pages/rich";
const Router = () => {
    return (
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/common" render={() =>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={Detail} />
                        </Common>
                    }>
                    </Route>
                    <Route path="/" render={() =>
                        <Admin>
                            <Route path="/ui/buttons" component={Buttons} />
                            <Route path="/ui/modals" component={Modals} />
                            <Route path="/ui/loadings" component={Loadings} />
                            <Route path="/ui/notification" component={Notifications} />
                            <Route path="/ui/messages" component={Messages} />
                            <Route path="/ui/tabs" component={Tabs} />
                            <Route path="/ui/gallery" component={Gallery} />
                            <Route path="/ui/carousel" component={Carousel} />
                            <Route path="/form/login" component={Login} />
                            <Route path="/form/reg" component={Register} />
                            <Route path="/table/basic" component={Basic} />
                            <Route path="/table/high" component={High} />
                            <Route path="/city" component={City} />
                            <Route path="/order" component={Order} />
                            <Route path="/user" component={User} />
                            <Route path="/bikeMap" component={BikeMap} />
                            <Route path="/charts/bar" component={Bar} />
                            <Route path="/charts/pie" component={Pie} />
                            <Route path="/charts/line" component={Line} />
                            <Route path="/rich" component={Rich} />
                        </Admin>
                    } />
                </Switch>
            </App>
        </BrowserRouter>
    );
}

export default Router;
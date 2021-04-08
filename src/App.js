import FirstScreen from "./Components/FirstScreen";
import "./App.css";
import CartPage from "./Components/CartPage";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={FirstScreen} />
        <Route path="/cartpage" exact component={CartPage} />
      </Switch>
    </div>
  );
}

export default App;

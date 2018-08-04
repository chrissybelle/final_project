import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import YourRecipes from "./pages/YourRecipes";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";
import EdamamSearch from "./pages/Edamam";
import Nav from "./components/Nav";
import AppProvider from "./components/AppProvider"
// import Jumbotron from "./components/Jumbotron";
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons'
// library.add(faHeart, faBookmark)


const App = () =>
<AppProvider>
    <React.Fragment>
    <Router>
      <div>
        <Nav />
        {/* <Jumbotron /> */}
        <Switch>

          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          {/* Can we certain paths only show if person is logged in? */}
          <Route exact path="/your-recipes" component={YourRecipes} />
          <Route exact path="/recipes/:id" component={Detail} />
          <Route exact path="/edamamrecipes" component={EdamamSearch} />
          <Route component={NoMatch} />

        </Switch>
      </div>
    </Router>
    </React.Fragment>
    </AppProvider>


export default App;



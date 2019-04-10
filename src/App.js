import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("{{{ga-code}}}");

function App() {
  return (
    <Router>
      <div>
        <Header />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}

function Home() {
  ReactGA.pageview("/");
  return <h2>Home</h2>;
}

function About() {
  ReactGA.pageview("/about");
  return <h2>About</h2>;
}

function Topic({ match }) {
  ReactGA.pageview(`/topics/${match.params.id}`);
  return <h3>Requested Param: {match.params.id}</h3>;
}

function Topics({ match }) {
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      <Route path={`${match.path}/:id`} component={Topic} />
      <Route
        exact
        path={match.path}
        render={() => {
          ReactGA.pageview("/topics");
          return <h3>Please select a topic.</h3>;
        }}
      />
    </div>
  );
}

function Header() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/topics">Topics</Link>
      </li>
    </ul>
  );
}

export default App;

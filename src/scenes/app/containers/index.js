import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { css } from "react-emotion";
import Home from "../../home/containers";
import Cart from "../../cart/containers";
import Top from "../../top/containers";
import Header from "../components/Header";
import NoMatch from "../components/NoMatch";

const styles = {
  container: css`
    max-width: 960px;
    margin: 0 auto;
    padding: 60px 10px;
    display: grid;
    grid-gap: 15px;
    label: container;
  `
};

const App = ({ cart }) => (
  <div>
    <Header cartItems={Object.keys(cart).length} />
    <main className={styles.container}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/top-5" component={Top} />
        <Route component={NoMatch} />
      </Switch>
    </main>
  </div>
);

const mapStateToProps = state => ({
  cart: state.cart
});

export default withRouter(connect(mapStateToProps)(App));

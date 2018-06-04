import React from "react";
import { NavLink } from "react-router-dom";

import { css, cx } from "react-emotion";

const styles = {
  header: css`
    background: #2296f3;
    height: 50px;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
    position: fixed;
    width: 100%;
    z-index: 9;
    label: header;
  `,
  nav: css`
    max-width: 960px;
    height: inherit;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 100px 150px auto 100px;
    grid-gap: 5px;
    align-items: center;
    label: nav;
    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
  `,
  link: css`
    height: inherit;
    line-height: 50px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    font-size: 1.3rem;
    background: #1c80d0;
    transition: 0.3s all ease;
    position: relative;
    overflow: hidden;
    label: link;
    &:hover {
      background: #1a6daf;
    }
  `,
  card: css`
    grid-column: 4;
    @media (max-width: 768px) {
      grid-column: 3;
    }
    label: card;
  `,
  badge: css`
    min-width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 8px;
    border-radius: 10px;
    background: #ffda26;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1c80d0;
    transition: 0.3s all ease;
    label: badge;
  `,
  adding: css`
    background: #65ff26;
    transform: scale(1.2);
  `,
  activeLink: css`
    && {
      background: #1a6daf;
    }
  `
};
class Header extends React.Component {
  state = { adding: false };
  componentWillReceiveProps(props) {
    if (this.props.cartItems !== props.cartItems) {
      this.setState({
        adding: true
      });
      window.setTimeout(() => {
        this.setState({
          adding: false
        });
      }, 300);
    }
  }
  render() {
    const badgeClass = this.state.adding
      ? cx(styles.badge, styles.adding)
      : styles.badge;
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink
            activeClassName={styles.activeLink}
            exact
            className={styles.link}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            activeClassName={styles.activeLink}
            exact
            className={styles.link}
            to="/top-5"
          >
            Top-5 Products
          </NavLink>
          <NavLink
            activeClassName={styles.activeLink}
            exact
            className={cx(styles.card, styles.link)}
            to="/cart"
          >
            Cart
            {this.props.cartItems > 0 && (
              <span className={badgeClass}>{this.props.cartItems}</span>
            )}
          </NavLink>
        </nav>
      </header>
    );
  }
}

export default Header;

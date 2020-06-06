import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <header id="header">
        <h1>
          {" "}
          <a href="/" style={{ textDecoration: "none" }}>
            {" "}
            Rx.js v6 Playground{" "}
          </a>{" "}
        </h1>
        <p>
          <a
            className="github-button"
            href="https://github.com/tell-y/rxjs-playground.github.io"
            data-size="large"
            aria-label="View tell-y/rxjs-playground.github.io on GitHub"
          >
            View on GitHub
          </a>
        </p>
      </header>
    );
  }
}

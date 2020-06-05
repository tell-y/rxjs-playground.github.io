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
            data-icon="octicon-star"
            data-style="mega"
            data-count-href="/rxjs-playground/rxjs-playground.github.io/stargazers"
            data-count-api="/repos/rxjs-playground/rxjs-playground.github.io#stargazers_count"
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star rxjs-playground/rxjs-playground.github.io on GitHub"
          >
            Github
          </a>
        </p>
      </header>
    );
  }
}

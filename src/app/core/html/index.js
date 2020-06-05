import React, { Component } from "react";
import PropTypes from "prop-types";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import Codemirror from "codemirror";

export default class HTML extends Component {
  static contextTypes = {
    output: PropTypes.string,
    setHtml: PropTypes.func.isRequired,
    html: PropTypes.string,
  };
  componentDidMount() {
    const input = Codemirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      mode: {
        name: "htmlmixed",
      },
      theme: "dracula",
      lineNumbers: true,
      extraKeys: {
        Tab: "autocomplete",
      },
      autoCloseBrackets: true,
      historyEventDelay: 2000,
    });

    fromEvent(input, "change")
      .pipe(
        debounceTime(500),
        map((e) => input.getValue())
      )
      .subscribe((html) => this.context.setHtml(html));
  }
  handleKeydown = (e) => {
    console.log(e);
  };

  render() {
    return (
      <div id="html">
        <h3>Html</h3>
        <div id="htmleditor-container">
          <textarea
            id="htmlinput"
            defaultValue={this.context.html}
            onKeyDown={this.handleKeydown}
            ref={(n) => (this.textarea = n)}
          ></textarea>
        </div>
      </div>
    );
  }
}

import React, { Component } from "react";
import PropTypes from "prop-types";
import Codemirror from "codemirror";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

export default class Editor extends Component {
  static contextTypes = {
    setSource: PropTypes.func.isRequired,
    source: PropTypes.string,
  };
  componentDidMount() {
    console.log(this.textarea);
    const input = Codemirror.fromTextArea(this.textarea, {
      lineNumbers: true,
      mode: {
        name: "javascript",
        json: true,
        globalVars: true,
      },
      theme: "dracula",
      lineNumbers: true,
      extraKeys: {
        Tab: "autocomplete",
      },
      autoCloseBrackets: true,
    });

    this.subscription = fromEvent(input, "change")
      .pipe(
        debounceTime(500),
        map((e) => input.getValue())
      )
      .subscribe((source) => this.context.setSource(source));
  }
  componentWillUnmount() {
    this.subscription.unsubscribe();
  }
  shouldComponentUpdate() {
    return false;
  }

  render() {
    console.log("render");
    return (
      <div id="editor">
        <h3>Javascript</h3>
        <div>
          <textarea
            id="editorinput"
            defaultValue={this.context.source}
            ref={(n) => (this.textarea = n)}
          ></textarea>
        </div>
      </div>
    );
  }
}

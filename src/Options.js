import React from "react";
import "./Options.css";
import $ from "jquery";

class Options extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      useregex:false,
      windowActive:false
    };

    this.checkboxChange=this.checkboxChange.bind(this);
    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.showArrow=this.showArrow.bind(this);
    this.onArrowClick=this.onArrowClick.bind(this);
  }

  componentDidMount() {
    this.props.onchange(this.state);
    this.option.style.display="none";
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState !== this.state) {
      //propagate change
      //console.log(this.state);
      this.props.onchange(this.state);
    }
  }

  checkboxChange(e) {
    //console.log(e.target.checked);
    this.setState({useregex:e.target.checked});
  }

  arrowUp() {
    return (<svg viewBox="10 40 310 200" className="arrow" onClick={this.onArrowClick}>
      <path fill="currentColor" d="M279 224H41c-21.4 0-32.1-25.9-17-41L143
        64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"></path>
    </svg>);
  }

  arrowDown() {
    return (<svg viewBox="10 265 310 200" className="arrow" onClick={this.onArrowClick}>
      <path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177
        448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path>
    </svg>);
  }

  onArrowClick() {
    this.setState({windowActive:!this.state.windowActive});
    $(this.option).slideToggle();
  }

  showArrow() {
    if(this.state.windowActive === true) {
      return this.arrowDown();
    } else {
      return this.arrowUp();
    }
  }

  render() {
    return (
      <div className="optionContainer">
        <div id="optionswrapper">
          {this.showArrow()}
          <div id="option" ref={e=>this.option=e}>
            <label>use regex search</label>
            <input type="checkbox" className="Optionscheckbox" onChange={this.checkboxChange} />
          </div>
        </div>
      </div>
    );
  }
}

export default Options;

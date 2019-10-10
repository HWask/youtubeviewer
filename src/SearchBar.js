import React from "react";
import Popup from "./Popup";
import ReactDOM from "react-dom";
import "./SearchBar.css"

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      first:true,
      visible:false,
      value:""
    };

    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.onchange=this.onchange.bind(this);
    this.onBtnClick=this.onBtnClick.bind(this);
    this.visible=this.visible.bind(this);
    this.keyPress=this.keyPress.bind(this);
    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.onSearchClick=this.onSearchClick.bind(this);
    this.onClick=this.onClick.bind(this);
  }

  componentDidMount() {
    this.input.disabled=true;
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.images.size !== prevProps.images.size) {
      if(this.props.images.size) {
        this.input.disabled=false;
        this.props.callback("",this.props.options);
      }

      this.setState({visible:false,
                    value:""
                  });
    }

    //todo: search on the fly?
  }


  onchange(e) {
    this.setState({value:e.target.value});

    if(e.target.value.length) {
      this.setState({visible:true});
    } else {
      this.setState({visible:false});
    }
  }

  onBtnClick(e) {
    this.setState({visible:false,
                  value:""
                });
    this.input.focus();
  }

  visible() {
    if(this.state.visible) {
      return {visibility:"visible"};
    } else {
      return {visibility:"hidden"};
    }
  }

  keyPress(e) {
    if(e.which === 13 && this.props.images.size) { //Enter
      this.props.callback(this.state.value,this.props.options);
    }
  }

  onSearchClick() {
    this.props.callback(this.state.value,this.props.options);
  }

  onClick() {
    if(this.input.disabled === true) {
      this.popup.show("Please import a file");
    }
  }

  searchIcon() {
    return (
      <svg viewBox="0 0 512 512" className="searchIcon" onClick={this.onSearchClick}>
        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3
          44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0
          92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9
          0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7
          57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
      </svg>
    );
  }

  cancelIcon() {
    return (
      <svg viewBox="0 0 512 512" className="clear" onClick={this.onBtnClick} style={this.visible()}>
        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111
          248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3
          4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3
          0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65
          65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
      </svg>
    );
  }

  render() {
    return (
      <div className="searchbarCont">
        <div className="searchBarContWrapper">
          <input className="searchbar" ref={ele=>this.input=ele} placeholder="Search..." value={this.state.value}
            onChange={this.onchange} onKeyPress={this.keyPress} onClick={this.onClick} type="text" />
          {this.cancelIcon()}
          {this.searchIcon()}
        </div>
        {
        ReactDOM.createPortal(
          <Popup ref={e=>this.popup=e} />,
          document.body)
        }
      </div>
    );
  }
}

export default SearchBar;

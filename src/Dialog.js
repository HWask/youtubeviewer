import React from "react";
import ReactDOM from 'react-dom';
import "./Dialog.css";

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state={active:false};

    this.onclick=this.onclick.bind(this);
    this.componentDidMount=this.componentDidMount.bind(this);
    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.onClose=this.onClose.bind(this);
    this.keyPress=this.keyPress.bind(this);
    this.onOpen=this.onOpen.bind(this);
  }

  onclick() {
    this.setState({active:false});
    this.onClose();
  }

  componentDidMount() {
    this.setState({active:this.props.show});
    if(this.props.show === true) {
      this.onOpen();
    }

    //addEventListener ist hier essentiell, damit mehrere verchiedene Instanzen
    //dieser Komponente einen eigenen Event Handler bekommen
    //document.onclick überschreibt den Event Handler
    document.addEventListener("mousedown",e=>{
      //click outside of dialog
      if(this.state.active && e.target === this.DOMdialog) {
        this.onclick();
      }
    });

    document.addEventListener("keydown",e=>{
      if(e.which === 27) {
        this.onclick();
      }
    });
  }

  componentWillUnmount() {
    //we should unmount the event handler here actually
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.show !== this.props.show) {
      this.setState({active:this.props.show});
      if(this.props.show === false) {
        this.onClose();
      } else {
        this.onOpen();
      }
    }
  }

  onClose() {
    if(this.props.onClose) {
      this.props.onClose();
    }
  }

  onOpen() {
    if(this.props.onOpen) {
      this.props.onOpen();
    }
  }

  keyPress(e) {
    console.log("keypress");
    if(e.which === 36) { //Enter
      this.onclick();
    }
  }

  render() {
    if(!this.state.active) {
      return null;
    }

    return ReactDOM.createPortal(
      <div ref={e=>this.DOMdialog=e} className="modal-container">
        <div className="modal" style={{width:this.props.width}}>
          <div className="modal-header">
            <div onClick={this.onclick} className="modal-close">&times;</div>
            <h2>{this.props.title}</h2>
          </div>
          {
            this.props.aspect ?
            <div className="modal-content2" style={{paddingTop:this.props.aspect}}>
              <div className="video">
                {this.props.content()}
              </div>
            </div> :
            <div className="modal-content1">
              {this.props.content()}
            </div>
          }
        </div>
      </div>,
      document.body
    );
  }
}

export default Dialog;

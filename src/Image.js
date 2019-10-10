import React from "react";
import Dialog from "./Dialog";

class Image extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showDialog:false
    };

    this.componentDidMount=this.componentDidMount.bind(this);
    this.componentWillUnmount=this.componentWillUnmount.bind(this);
    this.onChange=this.onChange.bind(this);
    this.onClick=this.onClick.bind(this);
    this.onPlay=this.onPlay.bind(this);
    this.dialogClosed=this.dialogClosed.bind(this);
    this.dialogOpen=this.dialogOpen.bind(this);
    this.content=this.content.bind(this);
  }

  componentDidMount() {
    this.props.observer.observe(this.img);
  }

  componentWillUnmount() {
    this.props.observer.unobserve(this.img);
  }

  onChange(e) {
    this.props.onchange(e.target.checked,this.props.id);
  }

  onClick() {
    this.checkbox.checked=!this.checkbox.checked;
    this.props.onchange(this.checkbox.checked,this.props.id);
  }

  onPlay() {
    this.setState({showDialog:true});
  }

  dialogClosed() {
    this.setState({showDialog:false});
    this.props.showScrollbar();
  }

  dialogOpen() {
    this.props.hideScrollbar();
  }

  playIcon() {
    return (
      <svg onClick={this.onPlay} viewBox="0 0 512 512" className="playIcon">
        <path fill="currentColor" d="M371.7 238l-176-107c-15.8-8.8-35.7
          2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8
          0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111
          248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200
          200S56 366.5 56 256z"></path>
      </svg>
    );
  }

  embedLink() {
    return "https://www.youtube.com/embed/"+this.props.id+"?autoplay=1&rel=0";
  }

  //body render function for dialog
  content() {
    return <iframe className="iframe" title={this.props.id} src={this.embedLink()} allow="accelerometer;
            autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowFullScreen"></iframe>;
  }

  render() {
    return (
      <div className="imageContainer">
        <div className="checkboxContainer">
          <div className="imageAspect">
            <img className="image" onClick={this.onClick} ref={e=>this.img=e} alt={this.props.title} lazy={this.props.img} />
          </div>
          <div className="checkboxdiv" onClick={this.onClick}>
            {
              this.props.checked ? <input onClick={this.onClick} ref={e=>this.checkbox=e} className="checkbox" type="checkbox"
                                    onChange={this.onChange} checked /> :
                                    <input onClick={this.onClick} ref={e=>this.checkbox=e} className="checkbox" type="checkbox"
                                    onChange={this.onChange} />
            }
          </div>
        </div>
          <div className="imageTitle">
            {this.playIcon()}
            <a target="_blank" rel="noopener noreferrer"
            href={this.props.link}>{this.props.title}</a>
          </div>
          <Dialog onOpen={this.dialogOpen} onClose={this.dialogClosed}
            show={this.state.showDialog} title="Video Player"
            content={this.content} width="70%" aspect="56%" />
      </div>
    );
  }
}

export default Image;

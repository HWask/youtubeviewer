import React from "react";
import Dialog from "./Dialog";
import "./ButtonBar.css"

class ButtonBar extends React.Component {
  constructor(props) {
    super(props);

    this.state={showDialog:false,
                dialogLinks:[]
              };

    this.fileHandler=this.fileHandler.bind(this);
    this.onClick=this.onClick.bind(this);
    this.btnExport=this.btnExport.bind(this);
    this.dialogClosed=this.dialogClosed.bind(this);
    this.content=this.content.bind(this);
    this.dialogOpen=this.dialogOpen.bind(this);
    this.fileOnLoad=this.fileOnLoad.bind(this);
  }

  onClick(e) {
    this.input.click();
  }

  dialogClosed() {
    this.setState({showDialog:false});
    this.props.showScrollbar();
  }

  dialogOpen() {
    this.props.hideScrollbar();
  }

  fileOnLoad(e) {
    let json=JSON.parse(e.target.result);
    for(let obj of json) {
      obj.render=true;
      obj.checked=false;
    }

    this.counter++;
    this.jsonALL=this.jsonALL.concat(json);
    if(this.counter === this.fileLength) {
      this.props.callback(this.jsonALL);
    }
  }

  fileHandler(e) {

    let files=e.target.files;
    this.jsonALL=[];
    this.counter=0;
    this.fileLength=files.length;

    for(let file of files) {
      let reader=new FileReader();
      reader.onload=this.fileOnLoad;
      reader.readAsText(file);
    }
  }

  btnExport(e) {
    let links=[];
    for(let ele of this.props.images.values()) {
      if(ele.checked) {
        links.push(ele.link);
      }
    }

    this.setState({showDialog:true,
                  dialogLinks:links
                });
  }

  //body render function for dialog
  content() {
    if(!this.state.dialogLinks.length) {
      return <div>You have not selected any videos :(</div>
    }

    let text=[];
    for(let link of this.state.dialogLinks) {
      text.push(link);
    }

    return (
      <>
        {
          this.state.dialogLinks.map(e=>{
            return <div>{e}</div>;
          })
        }
      </>
    );
  }

  render() {
    return (
      <div className="btnContainer">
        <button className="btn" onClick={this.onClick}>Import</button>
        <button className="btn" onClick={this.btnExport}>Export</button>
        <input ref={e=>this.input=e} onChange={this.fileHandler} accept=".json" type="file" style={{display:"none"}} multiple />
        <Dialog show={this.state.showDialog} onOpen={this.dialogOpen} onClose={this.dialogClosed} title="Youtube Links"
          content={this.content} width="50%" />
      </div>
    );
  }
}

export default ButtonBar;

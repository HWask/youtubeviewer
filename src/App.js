import React from 'react';
import './App.css';
import ButtonBar from "./ButtonBar";
import ImageViewer from "./ImageViewer";
import SearchBar from "./SearchBar";
import Popup from "./Popup";
import Options from "./Options";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      images:new Map(),
      options:{}
    };

    this.ButtonBarCallback=this.ButtonBarCallback.bind(this);
    this.Search=this.Search.bind(this);
    this.onChange=this.onChange.bind(this);
    this.Search=this.Search.bind(this);
    this.updateOptions=this.updateOptions.bind(this);

    this.PopuprefCallback=this.PopuprefCallback.bind(this);
  }

  hideScrollbar() {
    document.body.style.overflowY="hidden";
  }

  showScrollbar() {
    document.body.style.overflowY="overlay";
  }

  ButtonBarCallback(json) {
    //shallow copy
    let shallowCopy=new Map(this.state.images);
    for(let video of json) {
      if(shallowCopy.has(video.id) === false) {
        shallowCopy.set(video.id,video);
      }
    }

    //console.log(shallowCopy.size);
    this.setState({images:shallowCopy});
  }

  Search(term,options) {
    //state needs to be set in an immutable way else update wont propagate
    //forceUpdate() is an alternative but not quite the "React" way
    const shallowCopy=new Map(this.state.images);
    let counter=0;
    let parseReg=/^\/(.*)\/([gmiusy]*)$/;

    for(let entry of this.state.images) {
      const [id,item]=entry;
      let title=item.title.trim();
      let copy={...item};

      if(!term.trim().length) {
        copy.render=true;
        counter++;
      } else {
        let render=false;
        if(options.useregex === true) {
          let parse=parseReg.exec(term.trim());
          if(!parse || parse.length !== 3) {
            this.popup.show("Regex is faulty");
            return;
          }
          let regex=new RegExp(parse[1],parse[2]);
          let m=regex.exec(title);
          if(m!=null) {
            render=true;
          }
        } else {
          if(title.toLowerCase().includes(term.trim().toLowerCase())) {
            render=true;
          }
        }

        copy.render=render;
        if(render) {counter++;}
      }

      shallowCopy.set(id,copy);
    }

    this.setState({images:shallowCopy
                  });
    window.scrollTo(0,0);
    this.popup.show("Search yielded "+counter+" results");
  }

  //checked event from image
  onChange(checked, id) {
    const shallowCopy=new Map(this.state.images);
    let copy={...shallowCopy.get(id)};
    copy.checked=checked;
    shallowCopy.set(id,copy);
    this.setState({images:shallowCopy});
  }

  PopuprefCallback(e) {
    this.popup=e;
  }

  updateOptions(opt) {
    //console.log(opt);
    this.setState({options:opt});
  }

  render() {
    return (
      <>
        <div id="nav">
          <SearchBar callback={this.Search} images={this.state.images} options={this.state.options}/>
          <ButtonBar showScrollbar={this.showScrollbar} hideScrollbar={this.hideScrollbar} images={this.state.images} callback={this.ButtonBarCallback} />
        </div>
        <ImageViewer showScrollbar={this.showScrollbar} hideScrollbar={this.hideScrollbar} onchange={this.onChange} images={this.state.images} />
        <Popup ref={this.PopuprefCallback} />
        <Options onchange={this.updateOptions} />
      </>
    );
  }
}

export default App;

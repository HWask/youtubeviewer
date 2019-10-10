import React from "react";
import Image from "./Image";
import "./ImageViewer.css"

class ImageViewer extends React.Component {
  constructor(props) {
    super(props);

    this.obs=new IntersectionObserver(this.observerCallback);
    this.ImageHTML=this.ImageHTML.bind(this);
  }

  //lazy loading images
  observerCallback(entries, observer) {
    for(let entry of entries) {
      if(entry.isIntersecting) {
        let image=entry.target;
        image.src=image.getAttribute("lazy");
        image.removeAttribute("lazy");
        observer.unobserve(image);
      }
    }
  }

  ImageHTML() {
    let html=[];
    for(let entry of this.props.images) {
      const [key,item]=entry;
      if(item.render) {
        html.push(<Image showScrollbar={this.props.showScrollbar} hideScrollbar={this.props.hideScrollbar}
                  key={key} checked={item.checked} link={item.link}
                  title={item.title} img={item.img} observer={this.obs}
                  onchange={this.props.onchange} id={key} />);
      }
    }
    return html;
  }

  render() {
    return (
      <div className="imageViewer">
        {this.ImageHTML()}
      </div>
    );
  }
}

export default ImageViewer;

import React from 'react';
import bgimage from '../assets/background.bluegreen.jpg';
import en from '../languages/en.json';
import de from '../languages/de.json';


class HomePage extends React.Component {



  constructor(props){
    super(props)
    this.state = {
      language: this.props.lang.getLang()
    }
  }

  setLang(lang) {
    this.props.lang.setLang(lang)
    //this.setState({language : this.props.lang.getLang()})
  }

  getSubHeader(){
    if(this.props.lang.getLang() === "en") {
      return <p>{en.home.sub_header}</p>
    } else {
      return <p>{de.home.sub_header}</p>
    }
  }
  getFPSubHeader(){
    if(this.state.language === "en") {
      return <p>{en.home.film_and_photo.title}</p>
    } else {
      return <p>{de.home.film_and_photo.title}</p>
    }
  }
  getFPText(){
    if(this.state.language === "en") {
      return <p>{en.home.film_and_photo.sub_text}</p>
    } else {
      return <p>{de.home.film_and_photo.sub_text}</p>
    }
  }
  getWritingSubHeader(){
    if(this.state.language === "en") {
      return <p>{en.home.writing.title}</p>
    } else {
      return <p>{de.home.writing.title}</p>
    }
  }
  getWritingText(){
    if(this.state.language === "en") {
      return <p>{en.home.writing.sub_text}</p>
    } else {
      return <p>{de.home.writing.sub_text}</p>
    }
  }
  getMusicSubHeader(){
    if(this.state.language === "en") {
      return <p>{en.home.music.title}</p>
    } else {
      return <p>{de.home.music.title}</p>
    }
  }
  getMusicText(){
    if(this.state.language === "en") {
      return <p>{en.home.music.sub_text}</p>
    } else {
      return <p>{de.home.music.sub_text}</p>
    }
  }

  render() {
    return (
    <main>
      <article className="bg-white">
        <div className="vh-75 cover bg-center mt8 mb4" style={{backgroundImage: `url(${bgimage})`}}></div>
          <div className="pv5 f4 f2-ns ph6-l measure-home center">
            <h1 className="fw6 f1 fl w-100 black-70 mt0 mb3 avenir tc">The Workshop On Forster.</h1>
            <p className="db lh-copy black-70 fw1 mv0 f4 f3-m f2-l measure avenir">
            {this.getSubHeader()}
            </p>
          </div>
          <div className="logo-green-bg center">
      <div className="measure-home f3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">{this.getMusicSubHeader()}</h1>
        <p className="lh-copy mt5 measure f4 f3-ns black-70 fw1 avenir">
          {this.getMusicText()}
      </p>
      </div>
      </div>
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">{this.getFPSubHeader()}</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          {this.getFPText()}
        </p>

      </div>
      <div className="logo-blue-bg pb3 center">
      <div className="measure-home f3 mt3 ph6-l center pv6 black-70">
        <h1 className="fw6 f3 avenir">{this.getWritingSubHeader()}</h1>
        <p className="lh-copy measure f4 f3-ns black-70 fw1 avenir">
          {this.getWritingText()}
            </p>

      </div>
      </div>

          </article>
          </main>
    );
  }
}

export default HomePage;

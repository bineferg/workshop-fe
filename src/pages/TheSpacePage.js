import React from 'react';
import history from '../components/history.js';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Measure from 'react-measure';
import wrk1 from '../assets/wrk1.jpg';
import wrk2 from '../assets/wrk2.jpg';
import wrk3 from '../assets/wrk3.jpg';
import wrk4 from '../assets/wrk4.jpg';
import wrk5 from '../assets/wrk5.jpg';
import wrk6 from '../assets/wrk6.jpg';
import wrk7 from '../assets/wrk7.jpg';
import wrk8 from '../assets/wrk8.jpg';
import wrk9 from '../assets/wrk9.jpg';
import wrk10 from '../assets/wrk10.jpg';
import wrk11 from '../assets/wrk11.jpg';
import wrk12 from '../assets/wrk12.jpg';
import wrk13 from '../assets/wrk13.jpg';
import wrk14 from '../assets/wrk14.jpg';
import wrk15 from '../assets/wrk15.jpg';
import wrk16 from '../assets/wrk16.jpg';
import wrk17 from '../assets/wrk17.jpg';
import wrk18 from '../assets/wrk18.jpg';
import wrk19 from '../assets/wrk19.jpg';

const photos = [
  { src: wrk8, width: 4, height: 3 },
  { src: wrk7, width: 1.25, height: 1 },
  { src: wrk14, width: 3, height: 4 },

  { src: wrk13, width: 3.5, height: 4 },
  { src: wrk11, width: 4, height: 3 },
  { src: wrk12, width: 3, height: 4 },

  { src: wrk4, width: 2, height: 3 },
  { src: wrk19, width: 5, height: 3 },
  { src: wrk18, width: 3, height: 3 },


  { src: wrk2, width: 1.5, height: 2 },
  { src: wrk5, width: 3, height: 2 },
  { src: wrk6, width: 3, height: 2 },


  { src: wrk3, width: 4, height: 3 },
  { src: wrk1, width: 0, height: 3 }, /*reuse*/
  { src: wrk10, width: 4, height: 3 },

  { src: wrk17, width: 2, height: 2.5 },
  { src: wrk15, width: 2, height: 2.5 },
  { src: wrk16, width: 2, height: 2.5 },
  /*{ src: wrk9, width: 0, height: 0 } reuse*/




];

class TheSpacePage extends React.Component {
  constructor() {
    super();
    this.state = { currentImage: 0 };
    this.state = { width: -1 };
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    history.push('/space');
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }


  render() {
    const width = this.state.width;
	  return (
      <div className="mt7">
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
        ({measureRef}) => {
          if (width < 1 ){
            return <div ref={measureRef}></div>;
          }
          let columns = 1;
          if (width >= 480){
            columns = 2;
          }
          if (width >= 1024){
            columns = 3;
          }
          if (width >= 1824){
            columns = 4;
          }
          console.log(columns);
          return <div ref={measureRef}><Gallery photos={photos} margin="3" columns={columns} onClick={this.openLightbox} />
          <Lightbox images={photos}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
          /></div>

        }
      }
      </Measure>

      </div>

		 );
  }
}

export default TheSpacePage;

import React from 'react';
import hands from '../assets/logo-black-white.jpg';

class ReadMePage extends React.Component {
  render(){
    return(
      <div className="mt5 ph4-l pb3">
        <center>
          <h1 className="fw6 avenir">A Few Quick Notes</h1>
            <p className="lh-copy dib mt2 pb3 measure w-80 f5 f3-ns black-70 fw4 avenir">
              Hey Mary! So I wrote this pretty quickly, but this janky 'Admin Center' should allow you to
              manage the events and the workshops on the site yourself.
            </p>
        </center>

        <div class="dt-ns dt--fixed-ns">
          <div class="dtc-ns tc pv4 bg-black-10">
          <h1 className="fw6 f3 avenir">Writing Descriptions</h1>
          <p class="f5 lh-copy pl3 measure-narrow">
            When writing the descriptions, to indicate a new paragraph write [p]
            in between two paragraphs.
            This will then be properly formatted on the live site.
          </p>
          </div>
          <div class="dtc-ns tc pv4 bg-black-05">
          <h1 className="fw6 f3 avenir">Uploading Images</h1>
          <p class="f5 lh-copy pl3 measure-narrow">
            I dont have exact size suggestions but so far the images you
            have been putting up on facebook are working fine. Images that
            are not super HQ are better because they take less time to load
            on the site.
          </p>
          <p class="f5 lh-copy pl3 measure-narrow">
            The admin center will allow you to upload multiple photos
            for an event or workshop but please only upload one for now.
          </p>
          </div>
          <div class="dtc-ns tc pv4 bg-black-10">
          <h1 className="fw6 f3 avenir">General Warning :)</h1>
          <p class="f5 lh-copy pl3 measure-narrow">
            There is no input validation here, since often the times and
            descriptions dont always follow a set format. Everything you
            input here after clicking submit in the Create Event/Workshop page,
            or the update and delete buttons, will go live on the site immediately!
          </p>
          </div>
        </div>
        <div className="mt5">
        <center>
          <p className="lh-copy dib mt2 measure w-80 f5 f3-ns black-70 fw4 avenir">
            I can make improvements to this over time, and just lmk if
            necessary is missing or something is broken.
          </p>

        </center>

        </div>
        <center>
        <img src={hands}/>
        </center>
      </div>
    );

  }

}
export default ReadMePage;

import React from 'react';

const workshopURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/workshops"
const signupsURL = "http://ec2-18-217-98-55.us-east-2.compute.amazonaws.com:8000/signup"

class SignUpsList extends React.Component {
    constructor(){
      this.setState({
        sMap: {},
      });
    }

    componentDidMount() {
  	fetch(workshopURL, {
  		headers: {
       			'Accept': 'application/json',
  			'Content-Type': 'application/json'
       		},
       		method : 'GET'})
  		.then(d => d.json())
  		.then(d => {
  			this.setState({
  				workshopData: d
  			})
  		}).catch(error => this.setState({ err: true}));
      var workshops = this.state.workshopData.workshops
      for (var i=0; i<workshops.length; i++){
        fetch(signupsURL + '/' + workshops[i].WorkshopID, {
        method: 'GET',

        .then(d => d.json())
        .then(d => {
          if (response.ok) {
          this.setState({
            registerSuccess: true,
            sMap: {workshops[i].WorkshopID : d.sign_ups}
          });
          console.log(this.state.sMap);
          }
        })
        .catch(function(error){
          console.log('Request failed', error);
          return;
        });
      }
     }



    render(){
      return(
        <div className="dtc tc ph3 ph4-l">
          <h1 className="f3 f2-m f1-l fw2 black-90 mt10">
            Page Not Found
          </h1>
        </div>
      );
    }

}
export default SignUpsList;

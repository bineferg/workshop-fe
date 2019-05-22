import React from 'react';


class SignUpsList extends React.Component {
    constructor(props){
      super(props);
      this.renderSignUp = this.renderSignUp.bind(this);

    }

    renderSignUp(item){
      return (
        <tr class="stripe-dark">
          <td class="pa3">{item.FirstName}</td>
          <td class="pa3">{item.LastName}</td>
          <td class="pa3">{item.Email}</td>
          <td class="pa3">{item.Message}</td>
        </tr>
      );

    }
    renderItem(item) {
      if(!item.SignUps){
        return;
      }
      return(
        <div className="mw7 pb5 center avenir">
          <h3 className="fw6 f3 tc avenir">{item.WorkshopName}</h3>
          <div class="pa2 b--black-05">
            <div class="overflow-auto">
            <table class="f6 w-100 mw8 center" cellspacing="0">
              <thead>
                <tr class="stripe-dark">
                  <th class="fw6 tl pa3 bg-white">First Name</th>
                  <th class="fw6 tl pa3 bg-white">Last Name</th>
                  <th class="fw6 tl pa3 bg-white">Email</th>
                  <th class="fw6 tl pa3 bg-white">Mesage</th>
                </tr>
              </thead>
            <tbody class="lh-copy">
            {item.SignUps.map((item) => this.renderSignUp(item))}
            </tbody>
            </table>
          </div>
          </div>
        </div>
      );

    }



    render(){
      return(
        <div className="mt10">
            {this.props.data.map((item) => this.renderItem(item))}
        </div>
      );
    }

}
export default SignUpsList;

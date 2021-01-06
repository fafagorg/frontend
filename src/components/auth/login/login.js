import React from "react";

export default class Login extends React.Component {
  render() {
    return (
      <form class='form-group'> 
        <fieldset>
          <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
          </div>
              <input type="text" class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
          </div>
        </fieldset>
      </form>
    );
  }
}


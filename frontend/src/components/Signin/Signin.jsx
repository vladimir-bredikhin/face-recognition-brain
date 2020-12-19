import React, { useState } from "react";
import { HOME_ROUTE, REGISTER_ROUTE, SIGNIN_ENDPOINT } from "../../constants";
import { request } from "../../util.js";

const Signin = ({ onRouteChange }) => {
  const [email, setEmail] = useState("ann@gmail.com");
  const [password, setPassword] = useState("apples");

  const onSignIn = async (event) => {
    event.preventDefault();

    try {
      const result = await request(SIGNIN_ENDPOINT, "POST", {
        email,
        password,
      });
      if (result?.id) {
        onRouteChange(HOME_ROUTE, result);
      } else {
        throw new Error(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center pa4">
      <form className="measure" onSubmit={onSignIn}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Sign In</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email
            </label>
            <input
              required
              className="br2 pa2 b--black-30 input-reset ba bg-transparent hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Password
            </label>
            <input
              required
              className="br2 b pa2 b--black-30 input-reset ba bg-transparent hover-white w-100"
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
        </fieldset>
        <div className="">
          <input
            required
            className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Sign in"
          />
        </div>
        <div className="lh-copy mt3">
          <p
            onClick={() => onRouteChange(REGISTER_ROUTE)}
            className="f6 link dim black db pointer"
          >
            Register
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;

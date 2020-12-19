import React, { useState } from "react";
import { HOME_ROUTE, REGISTER_ENDPOINT, SIGN_IN_ROUTE } from "../../constants";
import { request } from "../../util.js";

const Register = ({ onRouteChange }) => {
  const [name, setName] = useState("Ann");
  const [email, setEmail] = useState("ann@gmail.com");
  const [password, setPassword] = useState("apples");

  const onRegister = async (event) => {
    event.preventDefault();

    try {
      const result = await request(REGISTER_ENDPOINT, "POST", {
        name,
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
      <form className="measure" onSubmit={onRegister}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f1 fw6 ph0 mh0">Register</legend>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="name">
              Name
            </label>
            <input
              required
              className="br2 pa2 b--black-30 input-reset ba bg-transparent hover-white w-100"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
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
            className="br2 b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Register"
          />
        </div>
        <div className="lh-copy mt3">
          <p
            onClick={() => onRouteChange(SIGN_IN_ROUTE)}
            className="f6 link dim black db pointer"
          >
            Sign in
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;

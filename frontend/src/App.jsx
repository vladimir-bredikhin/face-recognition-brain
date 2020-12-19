import React, { useEffect, useRef, useState } from "react";
import Particles from "react-particles-js";
import "./App.css";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Logo from "./components/Logo/Logo";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import Register from "./components/Register/Register";
import Signin from "./components/Signin/Signin";
import {
  DETECT_ENDPOINT,
  PING_ENDPOINT,
  REGISTER_ROUTE,
  SIGN_IN_ROUTE
} from "./constants";
import { request } from "./util.js";

const particlesParams = {
  width: "100%",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 650,
      },
    },
  },
};

function App() {
  const [input, setInput] = useState();
  const [faceBoxes, setFaceBoxes] = useState();
  const [route, setRoute] = useState(SIGN_IN_ROUTE);
  const [user, setUser] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const ping = async () => {
      try {
        console.log(await request(PING_ENDPOINT));
      } catch (err) {
        console.log(err);
      }
    };

    ping();
  }, []);

  const reset = () => {
    setFaceBoxes(null);
  };

  const onInputChange = ({ target }) => {
    setInput(target.value);
    reset();
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    reset();

    try {
      const { user: updatedUser, data } = await request(
        DETECT_ENDPOINT,
        "POST",
        {
          userId: user.id,
          imageUrl: input,
        }
      );

      calculateFacesLocation(data);

      if (updatedUser.id) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateFacesLocation = ({ regions }) => {
    const { width = 0, height = 0 } = imgRef.current;

    const faceBoxes = regions.map(({ region_info: { bounding_box } }) => {
      const { top_row, right_col, bottom_row, left_col } = bounding_box;

      return {
        top: height * top_row,
        right: width - width * right_col,
        bottom: height - height * bottom_row,
        left: width * left_col,
      };
    });

    setFaceBoxes(faceBoxes);
  };

  const onRouteChange = (route, user) => {
    setInput(null);
    reset();

    setUser(user);
    setRoute(route);
  };

  let componentToRender;
  switch (route) {
    case SIGN_IN_ROUTE:
      componentToRender = <Signin {...{ onRouteChange }} />;
      break;

    case REGISTER_ROUTE:
      componentToRender = <Register {...{ onRouteChange }} />;
      break;

    default:
      componentToRender = (
        <>
          <Logo />
          <Rank {...{ user }} />
          <ImageLinkForm {...{ onInputChange, onFormSubmit }} />
          <FaceRecognition imgSrc={input} {...{ imgRef, faceBoxes }} />
        </>
      );
  }

  return (
    <div className="App">
      <Particles className="particles" params={particlesParams} />
      <Navigation {...{ onRouteChange, isSignedIn: !!user }} />
      {componentToRender}
    </div>
  );
}

export default App;

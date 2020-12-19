import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onFormSubmit }) => {
  return (
    <>
      <div className="center f3 pa3">
        {'This Magic Brain will detect faces in yout pictures. Give it a try.'}
      </div>
      <form className="form center pa4 br3 shadow-5" onSubmit={onFormSubmit}>
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
        >
          Detect
        </button>
      </form>
    </>
  );
};

export default ImageLinkForm;

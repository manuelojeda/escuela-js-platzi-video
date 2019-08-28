/* eslint-disable react/self-closing-comp */
import React from 'react';
import '../assets/styles/components/NotFound.scss';

const NotFound = () => (
  <>
    <div className='container'>
      <div className='copy-container center-xy'>
        <p>
            404, página no encontrada.
        </p>
        <span className='handle'></span>
      </div>
    </div>
  </>
);

export default NotFound;

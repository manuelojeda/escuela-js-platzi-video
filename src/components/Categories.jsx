import React from 'react';
import '../assets/styles/components/Categories.scss';

const Categories = ({ children }) => {
  return (
    <div className='categories'>
      <h3 className='categories__title'>Mi Lista</h3>
      {children}
    </div>
  );
};

export default Categories;

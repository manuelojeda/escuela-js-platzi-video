/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';
// import useInicialState from '../hooks/useInitialState';

// const API = 'http://localhost:3000/initialState';

const Home = ({ mylist, trends, originals }) => {
  return (
    <div className='App'>
      <Header />
      <Search isHome />

      {mylist.length > 0 &&
        <Categories title='Mi lista'>
          <Carousel>
            {mylist.map((item, index) =>
              <CarouselItem key={index} isListBand={true} {...item} />
            )}
          </Carousel>
        </Categories>}

      <Categories title='Tendencias'>
        <Carousel>
          {trends.map((item, index) =>
            <CarouselItem key={index} {...item} />
          )}
        </Carousel>
      </Categories>

      <Categories title='Originales de PlatziVideo'>
        <Carousel>
          {originals.map((item, index) =>
            <CarouselItem key={index} {...item} />
          )}
        </Carousel>
      </Categories>

      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    mylist: state.mylist,
    trends: state.trends,
    originals: state.originals,
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Home);

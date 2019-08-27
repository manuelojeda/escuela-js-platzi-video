/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import '../assets/styles/App.scss';
import Header from '../components/Header';
import Search from '../components/Search';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';
import useInicialState from '../hooks/useInitialState';

const API = 'http://localhost:3000/initialState';

const App = () => {
  const initialState = useInicialState(API);
  return (
    <div className='App'>
      <Header />
      <Search />

      {initialState.mylist.length > 0 &&
        <Categories title='Mi lista'>
          <Carousel>
            {initialState.mylist.map((item) =>
              <CarouselItem key={item.id} {...item} />
            )}
          </Carousel>
        </Categories>}

      <Categories title='Tendencias'>
        <Carousel>
          {initialState.trends.map((item) =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Categories title='Originales de PlatziVideo'>
        <Carousel>
          {initialState.originals.map((item) =>
            <CarouselItem key={item.id} {...item} />
          )}
        </Carousel>
      </Categories>

      <Footer />
    </div>
  );
};

export default App;

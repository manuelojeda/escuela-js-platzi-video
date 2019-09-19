import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setUserFavorite, unsetUserFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import Play from '../assets/images/play-icon.png';
import Plus from '../assets/images/plus-icon.png';
import Remove from '../assets/images/remove-icon.png';

const CarouselItem = (props) => {
  const { cover, title, year, contentRating, duration, id, isListBand, _id } = props;

  const handleSetFavorite = () => {
    props.setUserFavorite({
      cover, title, year, contentRating, duration, id,
    });
  };

  const handleUnsetFavorite = (itemId) => {
    props.unsetUserFavorite(itemId);
  };

  return (
    <div className='carousel-item'>
      <img className='carousel-item__img' src={cover} alt={title} />
      <div className='carousel-item__details'>
        <div>
          <Link to={`/player/${id}`}>
            <img
              className='carousel-item__details--img'
              src={Play}
              alt='Play Icon'
            />
          </Link>
          {!isListBand && (
            <img
              className='carousel-item__details--img'
              src={Plus}
              alt='Plus Icon'
              onClick={handleSetFavorite}
            />
          )}
          {isListBand && (
            <img
              className='carousel-item__details--img'
              src={Remove}
              alt='Remove Icon'
              onClick={() => handleUnsetFavorite(_id)}
            />
          )}
        </div>
        <p className='carousel-item__details--title'>{title}</p>
        <p className='carousel-item__details--subtitle'>
          {`${year} ${contentRating} ${duration} minutos`}
        </p>
      </div>
    </div>
  );
};

CarouselItem.propTypes = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.string,
  duration: PropTypes.number,
};

const mapDispatchToProps = {
  setUserFavorite,
  unsetUserFavorite
};

export default connect(null, mapDispatchToProps)(CarouselItem);

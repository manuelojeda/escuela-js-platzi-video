import React from 'react'
import { create } from 'react-test-renderer'
import ProviderMock from '../../__mocks__/ProviderMock'
import CarouselItem from '../CarouselItem'

describe('CarouselItem testing', () => {
    test('Match snapshot', () => {
      const carrousel = create(
        <ProviderMock>
          <CarouselItem />
        </ProviderMock>
      )

      expect(carrousel.toJSON()).toMatchSnapshot();
    })
})

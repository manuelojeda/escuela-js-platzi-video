import React from 'react'
import { create } from 'react-test-renderer'
import ProviderMock from '../../__mocks__/ProviderMock'
import Header from '../Header'

describe('Header testing', () => {
    test('Match snapshot', () => {
      const header = create(
        <ProviderMock>
          <Header />
        </ProviderMock>
      )

      expect(header.toJSON()).toMatchSnapshot();
    })
})

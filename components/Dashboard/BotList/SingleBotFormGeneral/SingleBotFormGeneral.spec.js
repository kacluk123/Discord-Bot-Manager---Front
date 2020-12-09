import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from './SingleBotFormGeneral'
import { IUIResponseBot } from '../../../../services/api/bots/bots.types'
import { setupServer } from 'msw/node'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';
// import { withTestRouter } from '../../../testUtils/withTestRouter'
import '@testing-library/jest-dom/extend-expect'
import { botsResponse } from '../../../../testUtils/payloads/botsList'
import { withTestRouter } from '../../../../testUtils/withTestRouter'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const singleBot = botsResponse.bots[0]

test('Should FormGeneralWork', async () => {
  const general = withTestRouter(
    <SingleBotFormGeneral bot={singleBot} />
  )
  
  render(general)

  const name = screen.getByTestId('generalName')
  const token = screen.getByTestId('generalToken')
  const isActive = screen.getByTestId('generalIsActive')

  const isActiveValue = isActive[Object.keys(isActive)[0]].pendingProps['aria-checked']

  expect(name.value).toBe(singleBot.name)
  expect(token.value).toBe(singleBot.token)
  expect(isActiveValue).toBe(singleBot.isActive)
})
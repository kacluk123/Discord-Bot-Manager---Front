import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from '../../SingleBotFormGeneral'

import { setupServer } from 'msw/node'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';
import { botsResponse } from '../../../../../testUtils/payloads/botsList'
import { userResponse } from '../../../../../testUtils/payloads/user'
import { withTestRouter } from '../../../../../testUtils/withTestRouter'
import BotFormPicker from './botFormPicker'

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

test('Should display proper form', async () => {
  withTestRouter(<BotFormPicker bot={singleBot} />)
  await waitFor(() => screen.getByTestId('adBot'))
  const adBot = screen.getByTestId('adBot')
  expect(adBot).toBeTruthy()
})
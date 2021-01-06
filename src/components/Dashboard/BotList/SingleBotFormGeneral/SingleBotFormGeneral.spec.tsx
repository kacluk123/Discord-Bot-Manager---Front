import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from './SingleBotFormGeneral'

import { setupServer } from 'msw/node'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';
// import { withTestRouter } from '../../../testUtils/withTestRouter'
import '@testing-library/jest-dom/extend-expect'
import { botsResponse } from '../../../../testUtils/payloads/botsList'
import { userResponse } from '../../../../testUtils/payloads/user'
import { withTestRouter } from '../../../../testUtils/withTestRouter'
import { api } from '../../../../services/api'
import useBots from '../../../../remote/bots'
import useSWR from 'swr'

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

const newBotData = {
  token: 'new token',
  name: 'new name',
  type: "ad",
  userId: "testUserId",
  id: 2,
  isActive: true,
  "config":{
    "ads":[
       {
          "message":"dsadsa",
          "day":"7",
          "time":"02:02:03",
          "id":"299f0428-ebcc-45d3-bd4d-743066ace196"
       },
       {
          "message":"HELLO",
          "day":"5",
          "time":"15:34:20",
          "id":"5eb2ac5d-c7b7-41f2-89ec-0c16d86b79ea"
       }
    ]
 }
}

const server = setupServer(
  rest.get('http://localhost:3000/bots/get-bots', (req, res, ctx) => {
    return res(ctx.json(botsResponse))
  }),
  rest.patch('http://localhost:3000/bots/bot/1', (req, res, ctx) => {
    return res(ctx.json(newBotData))
  }),
  rest.get('http://localhost:3000/user/authorize', (req, res, ctx) => {
    return res(ctx.json(userResponse))
  }),
)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  cache.clear()
  server.resetHandlers()
})
afterAll(() => server.close())

const successNotificationText = 'Bot data saved sucesfully!'

test('Should FormGeneralWork', async () => {
  const general = withTestRouter(
    <SWRConfig value={{
      onError: (error, key) => {
        cogoToast.error(error.response.data.message)
      },
      dedupingInterval: 0,
      shouldRetryOnError: false,
    }}>
      <SingleBotFormGeneral bot={singleBot} />

    </SWRConfig>
  )
  
  render(general)

  const name = screen.getByTestId('generalName') as HTMLInputElement
  const token = screen.getByTestId('generalToken') as HTMLInputElement
  const isActive = screen.getByTestId('generalIsActive')
  const submitButton = screen.getByTestId('saveGeneralBot')
  const isActiveValue = isActive[Object.keys(isActive)[0]].pendingProps['aria-checked']

  expect(name.value).toBe(singleBot.name)
  expect(token.value).toBe(singleBot.token)
  expect(isActiveValue).toBe(singleBot.isActive)
  act(() => {
    fireEvent.click(submitButton)
  })
  

  await waitFor(() => screen.getByRole('status'))
  const notification = screen.getByRole('status')

  expect(notification).toHaveTextContent(successNotificationText)
})
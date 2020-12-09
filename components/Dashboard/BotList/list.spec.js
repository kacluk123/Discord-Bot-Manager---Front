import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import List from './list'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from './SingleBotFormGeneral'
import { setupServer } from 'msw/node'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';
import { withTestRouter } from '../../../testUtils/withTestRouter'
import '@testing-library/jest-dom/extend-expect'
import { botsResponse } from '../../../testUtils/payloads/botsList'
import { userResponse } from '../../../testUtils/payloads/user'

const server = setupServer(
  rest.get('http://localhost:3000/bots/get-bots', (req, res, ctx) => {
    return res(ctx.json(botsResponse))
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

const push = jest.fn((path) => {
  return new Promise((resolve, reject) => resolve());
});

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

test('Should render full bot list', async () => {
  const general = withTestRouter(
    <SWRConfig value={{
      // onError: (error, key) => {
      //   cogoToast.error(error.message)
      // },
      dedupingInterval: 0
    }}>
      <SingleBotFormGeneral botId='1' />
    </SWRConfig>, {
      push,
      pathname: "/dashboard/bot-list",
    }
  )
  render(general)
  await waitFor(() => screen.getAllByTestId('bot'))
  expect(screen.getAllByTestId('bot')).toHaveLength(5)
})

test('Should not render bot list and display error notification', async () => {
  server.use(
    rest.get('http://localhost:3000/bots/get-bots', async (req, res, ctx) => {
      return res(ctx.status(401), ctx.json({
        message: 'Im simple error'
      }))
    }),
  )

  const general = withTestRouter(
    <SWRConfig value={{
      onError: (error, key) => {
        cogoToast.error(error.response.data.message)
      },
      dedupingInterval: 0,
      shouldRetryOnError: false,
    }}>
      <SingleBotFormGeneral botId='1' />
    </SWRConfig>, {
      push,
      pathname: "/dashboard/bot-list",
    }
  )
  
  render(general)

  await waitFor(() => screen.getByRole('status'))
  const notification = screen.getAllByRole('status')[0]
  expect(notification).toHaveTextContent('Im simple error')
})

test('Should redirect to other page', async () => {
  const general = withTestRouter(
    <SWRConfig value={{
      onError: (error, key) => {
        cogoToast.error(error.response.data.message)
      },
      dedupingInterval: 0,
      shouldRetryOnError: false,
    }}>
      <SingleBotFormGeneral botId='1' />
    </SWRConfig>, {
      push,
      pathname: "/dashboard/bot-list",
    }
  )

  render(general)

  await waitFor(() => screen.getAllByTestId('bot'))
  fireEvent.click(screen.getAllByTestId('bot')[1])
  expect(push).toHaveBeenCalledWith("/dashboard/bot-list/2/general", "/dashboard/bot-list/2/general", {"shallow": undefined})
})
import React from 'react'
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react'
import List from './list'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from './SingleBotFormGeneral'
import { setupServer } from 'msw/node'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';

import '@testing-library/jest-dom/extend-expect'

const responseBots = {
  "bots":[
     {
        "id":1,
        "name":"SUPER BOTs",
        "type":"ad",
        "isActive":true,
        "token":"NzYwNTI3NjUwOTA0MzQyNTg4.X3NWkQ.m3_gYQ9yBBW08DxNRrKpWQV6A5U",
        "userId":"280433185068679168",
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
     },
     {
        "id":2,
        "name":"SUPER BOT",
        "type":"ad",
        "isActive":false,
        "token":"1234567890",
        "userId":"280433185068679168",
        "config":{
           "ads":[
              
           ]
        }
     },
     {
        "id":3,
        "name":"fsdfsdfsd",
        "type":"ad",
        "isActive":false,
        "token":"4523rasfsdfsa",
        "userId":"280433185068679168",
        "config":{
           "ads":[
              
           ]
        }
     },
     {
        "id":4,
        "name":"ffsdfds",
        "type":"ad",
        "isActive":false,
        "token":"fsdfsds",
        "userId":"280433185068679168",
        "config":{
           "ads":[
              
           ]
        }
     },
     {
        "id":5,
        "name":"dasdas",
        "type":"ad",
        "isActive":false,
        "token":"dadasdas",
        "userId":"280433185068679168",
        "config":{
           "ads":[
              
           ]
        }
     }
  ]
}

const userResponse = {
  "id":"280433185068679168",
  "username":"Sakuy",
  "discriminator":"8561",
  "avatar":"834ad55151a31c8f5fdf2b3292bb2f96",
  "mfaEnabled":false,
  "locale":"pl",
  "verified":true,
  "email":"kacper245@amorki.pl",
  "flags":0,
  "publicFlags":0
}

const server = setupServer(
  rest.get('http://localhost:3000/bots/get-bots', (req, res, ctx) => {
    return res(ctx.json(responseBots))
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

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: () => {}
    };
  },
}));

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
  render(
    <SWRConfig value={{
      // onError: (error, key) => {
      //   cogoToast.error(error.message)
      // },
      dedupingInterval: 0
    }}>
      <SingleBotFormGeneral botId='1' />
    </SWRConfig>
  )
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
  
  render(
    <SWRConfig value={{
      onError: (error, key) => {
        cogoToast.error(error.response.data.message)
      },
      dedupingInterval: 0,
      shouldRetryOnError: false,
    }}>
      <SingleBotFormGeneral botId='1' />
    </SWRConfig>
  )

  await waitFor(() => screen.getByRole('status'))
  const notification = screen.getAllByRole('status')[0]
  expect(notification).toHaveTextContent('Im simple error')
})
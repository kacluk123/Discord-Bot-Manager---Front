import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import List from './list'
import { rest, setupWorker } from 'msw'
import SingleBotFormGeneral from './SingleBotFormGeneral'
import { setupServer } from 'msw/node'
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

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
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

test('loads and displays greeting', async () => {
  render(<SingleBotFormGeneral botId='1' />)
  await waitFor(() => screen.getAllByText('SUPER BOTs'))
  // expect(screen.getAllByTestId('bot')).toHaveLength(5)

})
import { render, fireEvent, waitFor, screen, act, getByText} from '@testing-library/react'
import { rest, setupWorker } from 'msw'
import { withTestRouter } from '../../../../../../../testUtils/withTestRouter'
import AdBot from './index'
import { botsResponse } from '../../../../../../../testUtils/payloads/botsList'
import { setupServer } from 'msw/node'
import { userResponse } from '../../../../../../../testUtils/payloads/user'
import { SWRConfig, cache } from 'swr'
import cogoToast from 'cogo-toast';

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
  server.resetHandlers()
  cache.clear()
})
afterAll(() => server.close())

const adBot = withTestRouter(
  <SWRConfig value={{
    onError: (error, key) => {
      cogoToast.error(error.response.data.message)
    },
    dedupingInterval: 0,
    shouldRetryOnError: false,
  }}>
    <AdBot config={botsResponse.bots[0].config} />
  </SWRConfig>
)

const successNotificationText = 'Bot data saved sucesfully!'

describe('Should ad bot form work', () => {
  it('should render ad infos', () => {
    render(adBot)
    const adInfos = screen.getAllByTestId('adInfo')
    expect(adInfos.length).toBe(2)
  })
  it('Should adding ad info work', () => {
    render(adBot)
    const addAddButton = screen.getByTestId('addAdInfo')
    
    act(() => {
      fireEvent.click(addAddButton)
    })
  
    expect(screen.getAllByTestId('adInfo').length).toBe(3)
  })
  it('Should adding ad work, and form sending', async () => {
    render(adBot)
    const addAddButton = screen.getByTestId('addAdInfo')
    
    act(() => {
      fireEvent.click(addAddButton)
    })

    expect(screen.getAllByTestId('adInfo').length).toBe(3)

    act(() => {
      fireEvent.click(screen.getByTestId('saveAdFormButton'))
    })

    await waitFor(() => expect(screen.getByTestId('saveAdFormButton')).toBeDisabled())

    const adMessage = screen.getAllByTestId('adMessage')[2]
    const adDay = screen.getAllByTestId('adDay')[2]
    
    fireEvent.change(adMessage, {target: {
      value: 'Test123'
    }})

    fireEvent.mouseDown(adDay.firstElementChild)

    await waitFor(() => document.querySelector('.rc-virtual-list-holder-inner'))
    
    act(() => {
      fireEvent.click(document.querySelector('.rc-virtual-list-holder-inner').firstElementChild)
    })

    await waitFor(() => expect(screen.getByTestId('saveAdFormButton')).not.toBeDisabled())
    
    act(() => {
      fireEvent.click(screen.getByTestId('saveAdFormButton'))
    })
    await waitFor(() => screen.getByRole('status'))
    const notification = screen.getByRole('status')
    expect(notification).toHaveTextContent(successNotificationText)
  })
})
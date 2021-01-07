import { render, fireEvent, waitFor, screen, act} from '@testing-library/react'
import { rest, setupWorker } from 'msw'
import { withTestRouter } from '../../../../../../../testUtils/withTestRouter'
import AdBot from './index'
import { botsResponse } from '../../../../../../../testUtils/payloads/botsList'

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

const adBot = withTestRouter(
  <AdBot config={botsResponse.bots[0].config} />
)

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
  it('Should save button be disabled after adding empty and enabled after filling', () => {
    render(adBot)
    const addAddButton = screen.getByTestId('addAdInfo')
    
    act(() => {
      fireEvent.click(addAddButton)
    })

    expect(screen.getAllByTestId('adInfo').length).toBe(3)

    act(() => {
      fireEvent.click(screen.getByTestId('saveAdFormButton'))
    })

    setTimeout(() => {
      expect(screen.getByTestId('saveAdFormButton')).toBeDisabled()
    }, 50)

    const adMessage = screen.getAllByTestId('adMessage')[2]
    const adDay = screen.getAllByTestId('adDay')[2]

    fireEvent.change(adMessage, { target: { value: 'testAdName' }})
    fireEvent.click(adDay)
    const adMonday = screen.getByTitle('Monday')
    console.log(adDay.children)
    fireEvent.click(adMonday)

    setTimeout(() => {
      expect(screen.getByTestId('saveAdFormButton')).not.toBeDisabled()
    }, 50)
  })
})
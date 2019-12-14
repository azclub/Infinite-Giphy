import { shallow, mount } from 'enzyme'

jest.mock('../../libs/gifphy')
import { fetchGifs } from '../../libs/gifphy'

jest.mock('lodash')
import { debounce } from 'lodash';

import renderer from 'react-test-renderer'

import App from '../../pages/index'

describe('App', () => {
  let app;
  beforeEach(() => {
    fetchGifs.mockImplementation(() => [])
    debounce.mockImplementation(cb => cb)
    jest.spyOn(window, 'addEventListener')
    app = mount(<App />)
  })

  afterEach(() => {
    jest.resetAllMocks();
  })

  it('fetches GIF when mount', () => {  
    expect(fetchGifs).toHaveBeenCalled()
  })

  it('attaches scroll event handler on window', () => {  
    expect(window.addEventListener).toHaveBeenCalledWith(
      'scroll',
      app.instance().handelInfiniteScroll,
      { passive: true }
    );
  })

  it('has a button that toggles column type', () => {
    expect(app.state().column).toBe(3)
    app.find('.giphy__column-toggle').simulate('click')
    expect(app.state().column).toBe(1)
  })

  it('has a input field that search relevant GIFs', () => {
    expect(app.state().query).toBe('pun')
    app
      .find('.filter__input')
      .simulate('change', { target: { value: 'dogs' }});
    
    expect(debounce).toHaveBeenCalled()
    expect(fetchGifs).toHaveBeenCalled()
    expect(app.state().query).toBe('dogs')
  })

  describe('Snapshot Testing', () => {
    it('renders loading state', () => {
      const component = renderer.create(<App />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})


describe('#handelInfiniteScroll', () => {
  const defaultWindowInnerHeight = window.innerHeight
  const defaultWindowScrollY = window.scrollY
  let documentBodyOffsetHeight = 1000

  beforeEach(() => {
    fetchGifs.mockImplementation(() => [])
    debounce.mockImplementation(cb => cb)
    jest
      .spyOn(document.body, 'offsetHeight', 'get')
      .mockImplementation(() => documentBodyOffsetHeight);
  })

  afterEach(() => {
    jest.resetAllMocks();
    window.innerHeight = defaultWindowInnerHeight
    window.scrollY = defaultWindowScrollY
  })

  it('calls fetches GIFs when scroll to bottom', () => {
    window.innerHeight = 800
    window.scrollY = 0
    shallow(<App />).instance().handelInfiniteScroll()
    // First #fetchGifs is called when mount.
    expect(fetchGifs.mock.calls.length).toBe(2)
  })

  it('will not fetches GIFs when scroll did not reachbottom', () => {
    window.innerHeight = 0
    window.scrollY = 0
    shallow(<App />).instance().handelInfiniteScroll()
    // First #fetchGifs is called when mount.
    expect(fetchGifs.mock.calls.length).toBe(1)
  })
})

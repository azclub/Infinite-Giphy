import renderer from 'react-test-renderer'
import Panel from '../../components/panel'
import { shallow } from 'enzyme'

describe('Panel', () => {
  let defaultProps = {
    images: [], 
    error: false, 
    errorRetry: jest.fn(),
  }

  it('renders loading state', () => {
    const component = renderer.create(<Panel {...defaultProps} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders gif', () => {
    const props = {
      ...defaultProps,
      images: [
        {
          images: {
            original: {
              frames: "47",
              hash: "8f3c84492a4fb49270d16030f70d022e",
              height: "465",
              mp4: "https://media1.giphy.com/media/Qem49y6xGw57W/giphy.mp4?cid=18ba804ef5184d09da45836fd662f765ca0cd75cf97af788&rid=giphy.mp4",
              mp4_size: "1898566",
              size: "4444043",
              url: "https://media1.giphy.com/media/Qem49y6xGw57W/giphy.gif?cid=18ba804ef5184d09da45836fd662f765ca0cd75cf97af788&rid=giphy.gif",
              webp: "https://media1.giphy.com/media/Qem49y6xGw57W/giphy.webp?cid=18ba804ef5184d09da45836fd662f765ca0cd75cf97af788&rid=giphy.webp",
              webp_size: "1727274",
              width: "478"
            },
            downsized_medium: {
              height: "465",
              size: "2900161",
              url: "https://media1.giphy.com/media/Qem49y6xGw57W/giphy-downsized-medium.gif?cid=18ba804ef5184d09da45836fd662f765ca0cd75cf97af788&rid=giphy-downsized-medium.gif",
              width: "478"
            },
          },
        }
      ], 
    }
    const component = renderer.create(<Panel {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders general error', () => {
    const props = {
      ...defaultProps,
      error: true,
    }

    const component = renderer.create(<Panel {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has retry button in general error state', () => {
    const props = {
      ...defaultProps,
      error: true,
    }

    const app = shallow(<Panel {...props} />)
    app.find('.error__reload').simulate('click')
    expect(props.errorRetry).toHaveBeenCalled()
  })

  it('renders error for missing query param', () => {
    const props = {
      ...defaultProps,
      error: {
        message: 'QueryParamIsRequired'
      },
    }

    const component = renderer.create(<Panel {...props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

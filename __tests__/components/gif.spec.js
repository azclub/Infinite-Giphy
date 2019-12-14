import renderer from 'react-test-renderer'
import Gif from '../../components/gif'

describe('Gif', () => {
  it('renders component with image data', () => {
    const props = {
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
    const component = renderer.create(<Gif image={props} />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

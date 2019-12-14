import { fetchGifs } from '../../libs/gifphy'
jest.mock('axios')
import axios from 'axios';

describe('fetchGifs', () => {
  const defaultGifphyApiKey = process.env.GIFPHY_API_KEY
  let json = { data: {} }

  beforeEach(() => {
    axios.get.mockImplementation(() => {
      return {
        data: json
      }
    })
  })

  afterEach(() => {
    process.env.GIFPHY_API_KEY = defaultGifphyApiKey
  })

  it('send the request to Gifphy API', async () => {
    process.env.GIFPHY_API_KEY = 'TEST_GIFPHY_API_KEY'
    await fetchGifs({query: 'pun'})
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.giphy.com/v1/gifs/search', 
      { params: { 
        api_key: 'TEST_GIFPHY_API_KEY', 
        lang: 'en', 
        limit: 10, 
        offset: 0, 
        q: 'pun', 
        rating: 'G'
      }
    })
  })

  it('raises error when api key is not set', async () => {
    try {
      delete process.env.GIFPHY_API_KEY
      await fetchGifs({query: 'pun'})
    } catch(e) {
      expect(e.message).toBe('ApiKeyIsRequired')
    }
  })

  it('raises error when query param is not set', async () => {
    try {
      await fetchGifs()
    } catch(e) {
      expect(e.message).toBe('QueryParamIsRequired')
    }
  })
  
  it('raises error when request failed', async () => {
    axios.get.mockImplementation(() => {
      throw new Error('Time out')
    })

    try {
      await fetchGifs({query: 'pun'})
    } catch(e) {
      expect(e.message).toBe('RequestFailed: Time out')
    }
  })
})
import axios from 'axios';

export const fetchGifs = async ({query = '', offset = 0, limit = 10, signal} = {}) => {
  const api_key = process.env.GIFPHY_API_KEY

  if(typeof api_key !== 'string') {
    throw new Error('ApiKeyIsRequired')
  }
  
  if(query.length === 0) {
    throw new Error('QueryParamIsRequired')
  }

  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search',{
      params: {
        api_key,
        q: query,
        limit,
        offset,
        rating: 'G',
        lang:'en'
      },
    })
    return response.data.data
  } catch(e) {
    throw new Error(`RequestFailed: ${e.message}`)
  }
}
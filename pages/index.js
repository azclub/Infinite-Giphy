import React from 'react'
import Head from 'next/head'
import Panel from '../components/panel'
import { fetchGifs } from '../libs/gifphy'
import { debounce } from 'lodash';
import '../styles/main.scss'

class App extends React.Component {
  state = {
    images: [],
    query: 'pun',
    loading: false,
    error: false,
    column: 3,
  }

  handelInfiniteScroll = debounce(() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.8) {
      const { images, query } = this.state
      this.fetchGifs({ offset: images.length, query })
    }
  }, 500)

  fetchGifs = async (params = {}) => {
    this.setState({ error: false })

    const mergedParams = {
      query: this.state.query,
      ...params
    }
    
    this.setState({loading: true})
    try {
      const newImages = await fetchGifs(mergedParams)
      this.setState({ images: [...this.state.images, ...newImages]})
    } catch (e) {
      console.log(e)
      this.setState({ error: e })
    } finally {
      this.setState({ loading: false })
    }
  }

  resetAndFetchGifs = debounce((query) => {
    this.setState({ 
      images: [],
      query
    })

    this.fetchGifs({ query })
  }, 500)

  onChange = (e) => {
    e.persist()
    this.resetAndFetchGifs(e.target.value)
  }

  toggleColumns = () => {
    const { column } = this.state
    this.setState({ column: column == 3 ? 1 : 3 })
  }

  componentDidMount () {
    window.addEventListener('scroll', this.handelInfiniteScroll, { passive: true })
    this.fetchGifs()
  }

  render() {
    const { query, images, loading, error } = this.state
  
    return( <div>
      <Head>
        <title>Infinite GIFs!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <div className={`giphy ${this.state.column == 3 ? 'giphy--three-column' : ''}`}>
        <div className="giphy__filter">
          <h1 className="filter__title">
            {loading ? 'Loading...': 'Infinite GIFs!'}
          </h1>

          <input 
            tabIndex="0" type="text" className="filter__input" onChange={this.onChange} 
            placeholder="Search GIFs by Keywords (e.g puns, kittens, dogs, etc...)"/>

          <button className="giphy__column-toggle" onClick={this.toggleColumns}>
            Toggle Column
          </button>
        </div>

        <Panel 
          images={images} 
          error={error} 
          errorRetry={this.fetchGifs}
        />
      </div>
    </div>)
  }
}

export default App
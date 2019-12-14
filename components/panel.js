import React from 'react'
import Gif from './gif'

const Panel = ({images, error, errorRetry}) => {
  if(images.length > 0) {
    return(
      <div className="giphy__result">
        <div className="giphy__result--gifs">
        {
          images.map((image, index) => {
            if(!image['images']) { return }
            return <Gif key={index} image={image} />
          })
        }
        </div>
        <img className="gifs__loading" src='/images/loading.svg' alt='Loading' />
      </div>
    )
  }

  if(error) {
    if (error.message === 'QueryParamIsRequired') {
      return(
        <div className="giphy__result--error"> 
          <img className="giphy__gif" src='/images/error.gif' alt='kitten save them all GIF by Best Friends Animal Society' />
          You need to type something to search!
        </div>
      )
    } else {
      return(
        <div className="giphy__result--error"> 
          <img className="giphy__gif" src='/images/error.gif' alt='kitten save them all GIF by Best Friends Animal Society' />
          Oh no! Something went wrong when fetching the GIFs :(
          <button className="error__reload"onClick={errorRetry}>Click here to try again</button>
        </div>
      )
    }
  }

  return(
    <div className="giphy__result--loading">
      <img src='/images/loading.svg' alt='Loading' />
    </div>
  )
}

export default React.memo(Panel)
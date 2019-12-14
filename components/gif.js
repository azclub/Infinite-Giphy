import React from 'react'

const Gif = ({image}) => {
  return(
    <picture className="giphy__gif">
      <source type="image/webp" srcSet={image['images']['original']['webp']} />
      <source 
        media="(max-width: 680px)"
        srcSet={image['images']['downsized_medium']['url']} />
      <img height={image['images']['original']['height']} width={image['images']['original']['width']} src={image['images']['original']['url']} alt={image['title']} />
    </picture>
  )
}

export default React.memo(Gif)

import React, {useEffect, useState} from 'react'
import Image from './Image'

const ImageGallery = () => {
  const INITIAL_FETCH_URL = "https://images-api.nasa.gov/search?media_type=image"
  const KEYWORD_FETCH_URL = "https://images-api.nasa.gov/search?media_type=image&keywords="
  let [images, setImages] = useState([])

  const fetchImages = () => {
    fetch(INITIAL_FETCH_URL)
      .then(data => data.json())
      .then(json => {
        setImages(json.collection.items.slice(0, 30));
      })
  }

// SET UP ERROR HANDLING FOR KEYWORDS THAT DO NOT FETCH RESULTS
// ADDRESS ISSUE WHERE KEYWORDS ARE TOO SPECIFIC AND RETURN VERY FEW
// (SOMETIMES ONE) IMAGE

  const fetchImagesByKeyword = (e) => {
    let keywords = e.target.dataset.keywords
    fetch(KEYWORD_FETCH_URL + keywords)
      .then(data => data.json())
      .then(json => {
        setImages(json.collection.items.slice(0, 30));
      })
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="image-gallery">
      {images.map((img, index) => (
        <Image 
          key={index} 
          keywords={img.data[0].keywords}
          source={img.links[0].href} 
          onClick={fetchImagesByKeyword}>
        </Image>)
        )}
    </div>
  )

}

export default ImageGallery
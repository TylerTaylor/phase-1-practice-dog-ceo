document.addEventListener('DOMContentLoaded', function() {
  loadImages()
  loadBreeds()
})

const loadImages = () => {
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

  fetch(imgUrl)
    .then(res => res.json())
    .then(results => {
      results.message.forEach(image => addImageToDOM(image))
    })
}

const addImageToDOM = (dogPicUrl) => {
  let container = document.querySelector('#dog-image-container')
  let newImage = document.createElement('img')
  newImage.src = dogPicUrl
  container.appendChild(newImage)
}

const loadBreeds = () => {
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'

  fetch(breedUrl)
    .then(res => res.json())
    .then(results => {
      let breeds = Object.keys(results.message)
      updateBreedList(breeds)

      // add event listener here to detect dropdown changes
      // this should probably be its own function
      let breedDropdown = document.querySelector('#breed-dropdown')
      breedDropdown.addEventListener('change', function(e) {
        let filteredBreeds = breeds.filter(breed => breed.startsWith(e.target.value))

        updateBreedList(filteredBreeds)
      })
    })
}

const updateBreedList = (breeds) => {
  let ul = document.querySelector('#dog-breeds')
  ul.innerHTML = ''
  breeds.forEach(breed => addBreedToDOM(breed))
}

const addBreedToDOM = (breed) => {
  let ul = document.querySelector('#dog-breeds')
  let li = document.createElement('li')

  li.innerText = breed
  ul.appendChild(li)
  li.addEventListener('click', updateColor)
}

const updateColor = (event) => {
  event.target.style.color = 'hotpink'
}
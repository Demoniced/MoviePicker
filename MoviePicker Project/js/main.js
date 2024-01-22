
let queryParam = 0
let queryParamTwo = 0
let randomMovie = 0
//fetching the genre numbers, and cycling through them and storing them in a variable to be used to append the other API

document.querySelector('button').addEventListener('click', getFetch)
document.querySelector('button').addEventListener('click', getFetchTwo)
function getFetch(){
  const choiceTwo = document.querySelector('#sub-genre').value
  const choice = document.querySelector('#genre').value
  const url = 'https://api.watchmode.com/v1/genres/?apiKey=OlLSZZNvlMAWGKd58HN1zTL42Ud5zcs8jn14eH5o'
  console.log(choice)
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        data.forEach((x)=> {
          if(x.name.toLowerCase() === choice.toLowerCase()){
            queryParam = Number(x.id)
          }

          data.forEach((x)=>{
            if(x.name.toLowerCase() === choiceTwo.toLowerCase()){
              queryParamTwo = x.id
            }
          })
        })
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
      document.querySelector('.info-bar').style.display = "flex"
    }

    

   //Function that fetches the Genre API and fills in the queryparamater with the corresponding genre number.
    function getFetchTwo(){
    fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=OlLSZZNvlMAWGKd58HN1zTL42Ud5zcs8jn14eH5o&genres=${Number(queryParam)},${Number(queryParamTwo)}&types=movie`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      
      randomMovie = data.titles[Math.floor(Math.random()*250)]
  document.querySelector('h2').innerText = (randomMovie.title)
  getFetchThree(Number(randomMovie.id))
  
})
.catch(err => {
    console.log(`error ${err}`)
});


    }
    //This function gets the image into the DOM
    function getFetchThree(param){
      fetch(`https://api.watchmode.com/v1/title/${Number(param)}/details/?apiKey=OlLSZZNvlMAWGKd58HN1zTL42Ud5zcs8jn14eH5o`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        
      document.querySelector('img').src = data.poster 
      document.querySelector('h3').innerText = data.plot_overview
      document.querySelector('a').href = data.trailer
      // document.body.style.backgroundImage = "url(" + data.backdrop + ")";
    
  })
  .catch(err => {
      console.log(`error ${err}`)
  });
      }

  
      //Fetch API
      //Store ID and Name in variable
      
      
      
      document.querySelector('.main-button').addEventListener('click',activate)

      function activate(){
        let genreOne = document.querySelector('#genre').value
        fetch('https://api.watchmode.com/v1/genres/?apiKey=WxVcfEawNmYoJQ38uXs9h5E0mP9JEnM7skWPoUV8')
        .then(res => res.json())
        .then(data =>{
          console.log(data)
          //Variable that contains the entire object that matches the name selected with the main genre
            let genreObj = data.filter((x) => x.name.toLowerCase() == genreOne.toLowerCase())
            //Variable That contains just the ID of the Main Genre Selected
            console.log(genreObj)
            let genreId = genreObj[0].id
            console.log(genreId)
            //fetching the API that retrieves titles from the genre ID
            fetch(`https://api.watchmode.com/v1/list-titles/?apiKey=WxVcfEawNmYoJQ38uXs9h5E0mP9JEnM7skWPoUV8&genres=${genreId}&types=movie`)
              .then(res => res.json())
              .then(data => {
                console.log(data)
                
                let title = data.titles[Math.floor(Math.random()* data.titles.length)]
                
                console.log(title)
                //fetching API that returns details of the movie ID gotten from the previous API. Also appending details to DOM
                fetch(`https://api.watchmode.com/v1/title/${title.id}/details/?apiKey=WxVcfEawNmYoJQ38uXs9h5E0mP9JEnM7skWPoUV8`)
                .then(res=> res.json())
                .then(data=>{
                  document.querySelector('.info-bar').style.display = "flex"
                        document.querySelector('img').src = data.poster 
                        document.querySelector('h3').innerText = data.plot_overview
                        document.querySelector('a').href = data.trailer
                        document.querySelector('.user-rating').innerText = `IMDB Rating: ${data.user_rating}`
                        document.querySelector('h2').innerText = (data.title)
                        document.querySelector('.rating').innerText = `Rated ${data.us_rating}`

                        document.querySelector('.release-date').innerText = `Release Date : ${data.release_date}`

                        document.querySelector('.runtime').innerText = `Runtime: ${data.runtime_minutes} mins`
                  console.log(data)
                })

              })
            

        })
          
        .catch(err => console.log(err))


      }

      
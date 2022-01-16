// Loading images from nasa api   aka  SpaceStagram

const URL = "https://api.nasa.gov/planetary/apod?api_key="
const API_KEY = config.NASA_API_KEY

let nextImageBtn = document.getElementById("nextImageBtn") ;

 nextImageBtn.addEventListener("click", e => {
     console.log("button clicked :"  + e.target)
     getImageData()
 })

 // add likes listener after Dom is loaded .
 // document.addEventListener( "DOMContentLoaded", addLikes )

// Get image  Data from nasa
async function getImageData() {
    try {
        let response = await fetch(`${URL}${API_KEY}&count=6`)
        let data = await response.json()
        console.log('NASA APOD data', data)
       displayImage(data)

      } catch (error) {
        console.log(error)
      }
}

//console.log( ${API_KEY}  )

// console.log( {config.NASA_API_KEY})

// Display Image
function displayImage(data) {
//   const card = document.getElementById("cardImage") ;
//    card.src = data.url ;
//    card.alt = data.title ;
   creatCard(data)
   addLikes()
} 

//  builds out each Card component using bootstrap 

function creatCard(images) {
    
    const container = document.getElementById("container") ;
        //  container.classList.add("row row-cols-auto") ;
        
        //clear container
        container.innerHTML= "" ;

    images.forEach( (image , index ) =>{
        
        const card = document.createElement("div") ;
           card.className += ("col-6 card border-primary mb-4")
          card.style.width = "18rem"
        
         // create Media element 

       let typeOfMedia = image.media_type === "video" ? "video" : "img"   
        
       console.log("type of media : " + typeOfMedia )

       const mediaElm = createMediaElement( typeOfMedia ) ;
           //  picture.classList.add("card-img-top")
             mediaElem = `${image.media_type} : ${image.title}`
          mediaElm.src = image.url
          card.appendChild(mediaElm) 

          const like = document.createElement("div")
          like.classList.add("like", "dislike")
 
          card.appendChild(like)

        const cardBody = document.createElement("div") ;
        const title = document.createElement("h5") ;
            title.classList.add("card-title")
              title.innerHTML= image.title +" : " + image.date
              cardBody.appendChild(title)
          
        const cardText =  document.createElement("p") ;
              cardText.classList.add("card-text")
              cardText.innerHTML = image.explanation 

              cardBody.appendChild(cardText)

         card.appendChild(cardBody)

         const shareBtns = document.createElement("div") ;
                shareBtns.innerHTML = addShareBtns(image.url) 
         card.appendChild(shareBtns) ;

         container.appendChild(card) 


    })
  

}


//parse image objects

//Add Like event listener
function addLikes() {
   console.log("Entered addLikes")
  const likes = document.querySelectorAll(".like") ;
  
    likes.forEach(like => {
        like.addEventListener("click", (e) => {
            e.target.classList.toggle("liked");
            e.target.classList.toggle("dislike");

          })


  })
}

function addShareBtns( imageURL){
  let fbHtml = ` <hr> <a href= "https://www.facebook.com/sharer.php?u=${imageURL}"  class="fa fa-facebook" target="blank" alt="share on facebook"></a> `
  let twitterHtml = `<a href="https://twitter.com/share?url=${imageURL}" class="fa fa-twitter" target="blank" alt="share on twitter"></a>`  ;
  let linkedinHtml = `<a href="https://www.linkedin.com/shareArticle?url=${imageURL}" class="fa fa-linkedin" target="blank" alt="share on linkedIn"></a> ` ;
   
  shareHtml = fbHtml + twitterHtml + linkedinHtml
  
  return shareHtml

}

function createMediaElement(typeOfMedia) {
  
  if (typeOfMedia === "video") {

    const videoElm = document.createElement( "iframe" ) ;
            videoElm.classList.add("embed-responsive-item")
            videoElm.allowFullscreen = true;
          return  videoElm

   }else {
    const pictureElm = document.createElement( typeOfMedia ) ;
    pictureElm.classList.add("card-img-top")
    
     return pictureElm

   }

 
}

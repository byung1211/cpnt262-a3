"use strict";

// Initial gallery type
const default_show_type = "show-all-btn";

// Retreive data from the API server
function retreiveData(showType){
 
  console.log('index:retreiveData() - start');

  fetch('https://finalspaceapi.com/api/v0/character')
  .then(response => {

    console.log('index:retreiveData:fetch:response check');
    
    // Check the response
    if(!response.ok){
      throw new Error(response.status+": "+response.statusText);
    }
    
    return response;
  })
  .then(response => {
    
    console.log('index:retreiveData:fetch:extract data as json');

    // Turn the data into a json object
    return response.json()
  })
  .then(data => {

    console.log('index:retreiveData:fetch:data check and render the page');
    
    console.log("Total charactor number:"+data.length);
    console.log("RAW Data:"+data);

    // Check the data
    if(!Array.isArray(data) && !(data.length < 1))
      showType = 'no-data';  
    
    // Decide the type of the gallery
    if(showType === 'show-all-btn')
      renderAllChracters(data);
    else if(showType === 'show-random-btn')
      renderRadomChracter(data);
    else if(showType === 'no-data')
      renderNotFoundMessage();  
    else
      renderInvalidMessage();  
  })
  .catch((error) => {
    console.log('Error:', error);
    renderErrorMessage(error.message);
  });

  console.log('index:retreiveData()- end');
}

// Manipulate the html for all characters
function renderAllChracters(data){
 
  console.log('index:renderAllChracters()- start');

  let outputHtml = "";

  data.forEach(function(charactor) {

    outputHtml += 
          ` <a href="https://final-space.fandom.com/wiki/${charactor.name}">
            <figure id="champion-${charactor.id}">
              <img src="${charactor.img_url}" alt="${charactor.name}" width="120" height="120">
              <figcaption>${charactor.name}</figcaption>
            </figure>
            </a>
          `;
   });

   renderHtml(outputHtml);

   console.log('index:renderAllChracters()- end');
}

// Manipulate the html for a single random character
function renderRadomChracter(data){

  console.log('index:renderRadomChracter()- start');
  
  const charactor = data[Math.floor(Math.random() * data.length)];
  renderHtml(
          ` <a href="https://final-space.fandom.com/wiki/${charactor.name}">
            <figure id="champion-${charactor.id}">
              <img src="${charactor.img_url}" alt="${charactor.name}" width="120" height="120">
              <figcaption>${charactor.name}</figcaption>
            </figure>
            </a>
          `);

  console.log(
    `*** Random character picked ***
    Name: ${charactor.name}
    Img_url: ${charactor.img_url}
    Off_link: https://final-space.fandom.com/wiki/${charactor.name}
    `);


  console.log('index:renderRadomChracter()- end');
}

// Manipulate the html for No data from the server
function renderNotFoundMessage(){

  console.log('index:renderNotFoundMessage() - start');

  renderHtml(`<h3>NO CHARACTER FOUND !!!</h3>`);

  console.log('index:renderNotFoundMessage() - end');
}

// Manipulate the html for Invaild Data from the server
function renderInvalidMessage(){

  console.log('index:renderInvalidMessage() - start');

  renderHtml(`<h3>Invalid Data Format, Please Contact The Administrator !!!</h3>`);

  console.log('index:renderInvalidMessage() - end');
}

// Manipulate the html for Error situations
function renderErrorMessage(errMessage){

  console.log('index:renderErrorMessage()- start');

  renderHtml(`<h3 class='error'>Error occured !!!</h3>
              <p>Error Message: ${errMessage}</p>`);

  console.log('index:renderRadomChracter()- end');
}

// Show the output html in the page.
function renderHtml(outputHtml){

  console.log('index:renderHtml() - start');
  
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = outputHtml;

  console.log('index:renderHtml() - end');
}

// Initialize the page
function init(){

  console.log('index:init() - start');

  const showAllBtn = document.querySelector("#show-all-btn")
  const showRandomBtn = document.querySelector("#show-random-btn")

  showAllBtn.addEventListener("click", function(e){
    retreiveData(e.target.id);
  });

  showRandomBtn.addEventListener("click", function(e){
    retreiveData(e.target.id);
  });

  retreiveData(default_show_type);

  console.log('index:init() - end');
}

// Call the function to prepare the html page
init();



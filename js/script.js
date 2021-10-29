"use strict";

const default_show_type = "show-all-btn";

function retreiveData(showType){
 
  console.log('index:retreiveData() - start');

  fetch('https://finalspaceapi.com/api/v0/character')
  .then(response => {

    console.log('index:retreiveData:fetch:response check');
    
    if(!response.ok){
      throw new Error(response.status+": "+response.statusText);
    }
    
    return response;
  })
  .then(response => {
    
    console.log('index:retreiveData:fetch:extract data as json');

    return response.json()
  })
  .then(data => {

    console.log('index:retreiveData:fetch:data check and render the page');
    
    console.log("Total charactor number:"+data.length);
    console.log("RAW Data:"+data);

    // Todo: null check
    if(!Array.isArray(data) && !(data.length < 1))
      showType = 'no-data';  
    
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

function renderNotFoundMessage(){

  console.log('index:renderNotFoundMessage() - start');

  renderHtml(`<h3>NO CHARACTER FOUND !!!</h3>`);

  console.log('index:renderNotFoundMessage() - end');
}

function renderInvalidMessage(){

  console.log('index:renderInvalidMessage() - start');

  renderHtml(`<h3>Invalid Data Format, Please Contact The Administrator !!!</h3>`);

  console.log('index:renderInvalidMessage() - end');
}


function renderErrorMessage(errMessage){

  console.log('index:renderErrorMessage()- start');

  renderHtml(`<h3 class='error'>Error occured !!!</h3>
              <p>Error Message: ${errMessage}</p>`);

  console.log('index:renderRadomChracter()- end');
}

function renderHtml(outputHtml){

  console.log('index:renderHtml() - start');
  
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = outputHtml;

  console.log('index:renderHtml() - end');
}

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


init();



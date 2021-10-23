fetch('https://random.dog/woof.json')
  .then(function(response){
    if(!response.ok)
      throw new Error ('Not 200 Ok');

    return response.json();
  }).then(function(data){
    updateGallery(`
    <figure>
      <img src="${data.url}">
      <figcaption>${data.fileSizeBytes}</figcaption>
    </figure> `);    
  })
  .catch(function(error){
    console.warn(error);
  });
  
function updateGallery(output){
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = output;
}

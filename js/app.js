document.getElementById('search-btn').addEventListener('click', ()=>{
  const inputField = document.getElementById("input-field")
  const searchResult = inputField.value ;
  const api = `http://openlibrary.org/search.json?q=${searchResult}`
  fetch(api)
  .then(res => res.json())
  .then(data => loadData(data.docs))
  
})

const loadData =(dataList)=>{
  const bookResult = document.getElementById("book-result")
  // console.log(dataList);
  
  dataList.forEach(data =>{
    const div = document.createElement('div'); 
    console.log(data);
    div.innerHTML = `
    
    <div class="card m-2" style="width: 18rem;" >
    <img class="img=fluid" style="height:250px"; src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">Books Name : ${data.title}</h5>
      <p class="card-title">Author Name : ${data.author_name[0]}</p>
      <p class="card-title">Publisher : ${data.publisher}</p>
      <p class="card-title">Publish Date : ${data.publish_date}</p>
      </div>
    </div>
    
    `
    bookResult.innerHTML=''
    bookResult.appendChild(div);
    
    
  })
}
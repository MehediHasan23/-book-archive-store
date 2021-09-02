// selected all variables by id ==>
const inputField = document.getElementById("input-field")
const bookResult = document.getElementById("book-result")
const totalFoundResults = document.getElementById('total-results')
const emptyField = document.getElementById('empty-field');

// added EventListener ==>
document.getElementById('search-btn').addEventListener('click', ()=>{
  const searchResult = inputField.value ;
  inputField.value =''
  bookResult.innerHTML = ''
  totalFoundResults.innerHTML = ''

  // simple validation for empty search-result
  emptyField.innerText =`Please Write Something!!`;
  if(searchResult === ''){
    emptyField.style.display = 'block'
  }
  else{
    emptyField.style.display = 'none'
    const api = `https://openlibrary.org/search.json?q=${searchResult}`
    fetch(api)
    .then(res => res.json())
    .then(data => loadData(data))
  }
  
})

const loadData =(bookList)=>{
  // show all result 
  
  const totalResult = bookList.numFound;
  bookList = bookList.docs;
// trying to filtering undefined value ==>
  const books = bookList.filter(element=>element.author_name !== undefined && element.publisher !== undefined && element.first_publish_year !== undefined && element.cover_i !== undefined);

  // showing output and trying to simple validation ==>
  if(books.length === 0){
    bookResult.innerHTML = ''
    totalFoundResults.innerHTML = ''
    totalFoundResults.innerText = `No Results Found`
    // return;
  }else{
  totalFoundResults.innerText = `Total result ${totalResult} & total books found ${books.length}`;
  bookResult.innerHTML='';
  books.forEach(data =>{
    const div = document.createElement('div'); 
    console.log(data);
    div.innerHTML = `
    
    <div class="card m-2" style="width: 18rem; height:450px;" >
    <img class="img=fluid" style="height:250px"; src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">Books Name : ${data.title}</h5>
      <p class="card-title">Author Name : ${data.author_name[0]}</p>
      <p class="card-title">Publisher : ${data.publisher[0]}</p>
      <p class="card-title">Publish Year : ${data.first_publish_year}</p>
      </div>
    </div>
    
    `
    bookResult.appendChild(div);  
  })

  }  

}
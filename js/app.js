 const loadPhones = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data  = await res.json()
    displayPhones(data.data, dataLimit)
 }


 const displayPhones = (phones, dataLimit) => {
    const phoneElement = document.getElementById('phone-container');
    phoneElement.textContent = ''

    // display 10 phones only
    const showAllContainer = document.getElementById('showAll-container')
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10);
        showAllContainer.classList.remove('d-none')
    }

    else{
        showAllContainer.classList.add('d-none')
    }

    // display no phone found
    const noPhone = document.getElementById('no-phone')
    if(phones.length === 0){
        noPhone.classList.remove('d-none')
    }
    else{
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        const cardDiv = document.createElement('div')
        cardDiv.classList.add('col')
        cardDiv.innerHTML = `
        <div class="card h-100 p-4">
            <div class="d-flex justify-content-center">
                <img src="${phone.image}" class="card-img-top w-75" alt="...">
            </div>
            <div class="card-body">
                <h5 class="card-title">Name: ${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneElement.appendChild(cardDiv)
        
        // stop loader
        console.log(phone)
    })
    toggleSpinner(false)
 }

 const processSearch =  (dataLimit) => {
    // start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field').value
    loadPhones(searchField,dataLimit)
 }

 document.getElementById('btn-search').addEventListener('click', function(){
    processSearch(10);
 })

//  search with enter key
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10)
    }
})

 document.getElementById('btn-show').addEventListener('click', function(){
    processSearch()
 })

 const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
 }

 const loadPhoneDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data)

 }
//  loadPhones('p')
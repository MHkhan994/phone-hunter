 const loadPhones = async(searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url)
    const data  = await res.json()
    displayPhones(data.data)
 }


 const displayPhones = phones => {
    const phoneElement = document.getElementById('phone-container');
    phoneElement.textContent = ''
    phones = phones.slice(0, 20);

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
            </div>
        </div>
        `
        phoneElement.appendChild(cardDiv)
        
        // stop loader
        console.log(phone)
    })
    toggleSpinner(false)
 }

 document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    toggleSpinner(true)
    const searchField = document.getElementById('search-field').value
    loadPhones(searchField)
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
//  loadPhones('p')
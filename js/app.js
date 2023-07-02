const loadData = (notClicked) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayDataOnUI(data.data.tools, notClicked));
}

const displayDataOnUI = (datas, notClicked) => {
    toggleSpinner(true);
    // console.log(datas);
    // step-1: get the parent element
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';


    // show-all button
    const showAll = document.getElementById('show-all');
    if (notClicked && datas.length > 6) {
        // Display 6 cards
        datas = datas.slice(0, 6);
        // console.log(datas);
        showAll.classList.remove('d-none');
    } else {
        showAll.classList.add('d-none');
    }



    datas.forEach(data => {
        // console.log(data);
        // step-2: create html element
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('col');
        // step-3: set inner html
        dataDiv.innerHTML = `
                <div class="card h-100">
                    <img src="${data.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="fw-bold card-title">Features</h5>
                      <ol>
                      ${data.features ? `${data.features[0] ? `<li>${data.features[0]}</li>` : ''}` : 'No Data Found'}
                        ${data.features ? `${data.features[1] ? `<li>${data.features[1]}</li>` : ''}` : ''}
                        ${data.features ? `${data.features[2] ? `<li>${data.features[2]}</li>` : ''}` : ''}
                        ${data.features ? `${data.features[3] ? `<li>${data.features[3]}</li>` : ''}` : ''}
                        ${data.features ? `${data.features[4] ? `<li>${data.features[4]}</li>` : ''}` : ''}
                      </ol>
                    </div>
                    <div class="card-footer d-flex align-items-center justify-content-between">
                        <div>
                            <h5 class="fw-bold card-title">${data.name}</h5>
                            <div>
                                <i class="fa-regular fa-calendar"></i>
                                <span>${data.published_in}</span>
                            </div>
                        </div>
                        <div>
                            <button onclick="modalDetails(${data.id})" type="button" class="btn btn-success" data-bs-toggle="modal"  data-bs-target="#modalDetails"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                  </div>
        `;
        // step-4: append child in parent element
        dataContainer.appendChild(dataDiv);
    });
    toggleSpinner(false);


    
}

// spinner function
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

// show-all button function 
document.getElementById('show-all').addEventListener('click', function () {
    loadData();
});

// Modal
const modalDetails = (id) => {
    // console.log(id);
    if(id<10){
        fetch(`https://openapi.programming-hero.com/api/ai/tool/0${id}`)
        .then(res => res.json())
        .then(data => displayModalDetails(data.data));
    }else{
        fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => displayModalDetails(data.data));
    }  
}

const displayModalDetails = (data) => {
    // console.log(data)
    // step-1: get the parent element 
    const showModalDetails = document.getElementById('show-modal-details');
    showModalDetails.innerHTML = '';
    // step-2: create inner element
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('d-flex','gap-2','justify-content-center','flex-lg-row','flex-column');
    // step-3: set inner html
    detailsDiv.innerHTML = `
        <div class="card p-3" style="width: 100%;">
            <h5 class="card-title">${data.description}</h5>
            <div class="row row-cols-1 row-cols-md-3 g-4  mt-3">
                <div class="col">
                    <div class="card h-100 d-flex align-items-center justify-content-center">
                        <h5 class="card-title text-success text-center fs-6">${data.pricing ? data.pricing[0].price : ''}<br>${data.pricing ? data.pricing[0].plan : 'N/A'}</h5>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 d-flex align-items-center justify-content-center">
                        <h5 class="card-title text-warning text-center fs-6 ">${data.pricing ? data.pricing[1].price : ''}<br>${data.pricing ? data.pricing[1].plan : 'N/A'}</h5>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100 d-flex align-items-center justify-content-center">
                        <h5 class="card-title text-danger text-center fs-6 ">${data.pricing ? data.pricing[2].price : ''}<br>${data.pricing ? data.pricing[2].plan : 'N/A'}</h5>
                    </div>
                </div>
            </div>
            <div class="d-flex gap-3 mt-3">
                <div>
                    <h6  class="fw-bold">Features</h6>
                    <ul >
                    ${data.features ? `${data.features[1] ? `<li>${data.features[1].feature_name}</li>` : ''}` : 'No Data Found'}
                    ${data.features ? `${data.features[2] ? `<li>${data.features[2].feature_name}</li>` : ''}` : 'No Data Found'}
                    ${data.features ? `${data.features[3] ? `<li>${data.features[3].feature_name}</li>` : ''}` : 'No Data Found'}
                    ${data.features ? `${data.features[4] ? `<li>${data.features[4].feature_name}</li>` : ''}` : 'No Data Found'}
                    </ul>
                </div>
                <div>
                    <h6 class="fw-bold">Integrations</h6>
                    <ul id="integrationsLists">
                        ${data.integrations ? `${data.integrations[0] ? `<li>${data.integrations[0]}</li>` : ''}` : 'No Data Found'}
                        ${data.integrations ? `${data.integrations[1] ? `<li>${data.integrations[1]}</li>` : ''}` : ''}
                        ${data.integrations ? `${data.integrations[2] ? `<li>${data.integrations[2]}</li>` : ''}` : ''}
                        ${data.integrations ? `${data.integrations[3] ? `<li>${data.integrations[3]}</li>` : ''}` : ''}
                        ${data.integrations ? `${data.integrations[4] ? `<li>${data.integrations[4]}</li>` : ''}` : ''}
                    </ul>
                </div>
            </div>
        </div>

        <div class="card" style="width: 100%;">
            
            <img src="${data.image_link[0]}" class="card-img-top" alt="...">
            <span style="left: 80%; top: 5%" class="position-absolute translate-middle badge rounded-pill text-bg-danger">${data.accuracy.score ? `${(data.accuracy.score)*100}% accuracy` : ''}</span>
            <div class="card-body d-flex flex-column align-items-center">
                <h6 class="text-center card-title fw-bold">${data.input_output_examples ? data.input_output_examples[0].input : ''}</h6>
                <p class="text-center card-text">${data.input_output_examples ? data.input_output_examples[0].output : ''}</p>
            </div>
        </div>
    `
    // step-4: append on parent 
    showModalDetails.appendChild(detailsDiv);
}

// sort data by date
/* const loadDataForSort = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => sort(data.data.tools));
}

const sort = (datas) => {
    console.log(datas);
    const newDatas = datas.map(data => {
       return data.published_in;
    })
    console.log(newDatas);
    newDatas.sort(function(a,b){
        return new Date(b.date) - new Date(a.date);
    })
    console.log(newDatas);
}; */



loadData(1);
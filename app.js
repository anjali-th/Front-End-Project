//US colleges
let resultDataUs;

const $divUs=$('#us-search-div');
const $inputUs=$('#us-input');
const $btnClrUs=$('#us-clear');
const $btnUs=$('#us-search')


//ajax request
const getUs = function(){
    let apiKey= "&api_key=UNJxyTeSmB2pxVOaLOkXBon7vjjsKM6OT57LMfen"
    $.get(`https://api.data.gov/ed/collegescorecard/v1/schools?school.name=${$inputUs.val()}${apiKey}`, (data) => {
        resultDataUs = data;
        console.log(resultDataUs)
        createCard(resultDataUs);
    });
}

//calling ajax request 
$btnUs.on('click', () =>{
    getUs();
});

$inputUs.on('keypress', (e) =>{
    if (e.key === 'Enter'){
        getUs();
    }
});
   
// clear btn
$btnClrUs.on('click', () =>{ window.location.reload()});

//create university card
function createCard(){

    let info = resultDataUs.results;
    
    const $uniCard=$('<div></div>');
    $uniCard.addClass('usList');
    $uniCard.appendTo($divUs);
    
    for ( let indexUs = 0; indexUs < info.length; indexUs++){
        
        const $div=$('<div class="card"></div>');
        $div.addClass('list');
        $div.appendTo($uniCard);
        
        let acceptance= info[indexUs].latest.admissions.admission_rate.overall * 100 ;
        
        $div.html(
            `<div><h5><u>${info[indexUs].latest.school.name}</u></h5></div>
            <div></div>City: ${info[indexUs].latest.school.city}, ${info[indexUs].latest.school.state} ${info[indexUs].school.zip}</div>
            <div>Acceptance rate: ${acceptance}%</div>
            <div>In-state Tuition: $${info[indexUs].latest.cost.tuition.in_state}</div>
            <div>Out-of-State Tuition: $${info[indexUs].latest.cost.tuition.out_of_state}</div>
            <div>Accreditation: ${info[indexUs].latest.school.accreditor}</div>
            <div>Webite: <a href= ${info[indexUs].latest.school.school_url}>${info[indexUs].latest.school.school_url}</a> </div>
            <div>Price Calculator: <a href= ${info[indexUs].latest.school.price_calculator_url}>${info[indexUs].latest.school.price_calculator_url}</a></div>`
        );
    }
    


}

//Outside US
const $divWorld= $('#world-div');
const $inputWrld=$('#world-input');
const $btnWrld=$("#world-search");
const $btnClrWrld=$("#world-clear");

let resultData;

// ajax request
const get = function(){
    $.get(`http://universities.hipolabs.com/search`, (data) => {
        resultData = data;
        createList(resultData);
    });
}
// calling ajax request
$btnWrld.on('click', () =>{
    get();
})

$inputWrld.on('keypress', (e) =>{
    if (e.key === 'Enter'){
        get();
    }
})
    
// clear button
$btnClrWrld.on('click', () =>{ window.location.reload()});

// create list of Universities
function createList(){

    const $listContainer = $('<div></div>');
    $listContainer.addClass('container-xxl');
    $listContainer.appendTo($divWorld);

    for ( var index = 0; index<resultData.length; index++){
        if (resultData[index].country == $inputWrld.val()){
            $(`<div>${resultData[index].name}</div>`).appendTo($listContainer);
            $(`<div><a href= ${resultData[index].web_pages}>${resultData[index].web_pages}</a></div>`).appendTo($listContainer);
            $('a').on('click', () => { window.open($('a').prop('href'))});
        };
    };
};
    
   
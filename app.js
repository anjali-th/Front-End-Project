//US colleges









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
    
   

const $body=$('body');

const $divMain= $('<div></div>');
$divMain.addClass('main');
$divMain.html('<h1>University Search</h1><br><h5>Enter a country</h5>');
$body.append($divMain);

const $divInput = $('<div></div>');
$divInput.addClass('userInput');
$divInput.html("<input></input>")
$body.append($divInput);

const $btn=$('<button>Search</button>');
const $btnClr=$('<button>Clear</button>');
$divInput.append($btn);
$divInput.append($btnClr);

let resultData;

// ajax request
const get = function(){
    $.get(`http://universities.hipolabs.com/search?name=${$('input').val()}`, (data) => {
    resultData = data;
    createList(resultData);
    });
}

// calling ajax request
$btn.on('click', () =>{
    get();
})

$('input').on('keypress', (e) =>{
    if (e.key === 'Enter'){
        get();
    }
})
    
// clear button
$btnClr.on('click', () =>{ window.location.reload()});

// create list of Universities
function createList(){

    const $listContainer = $('<div></div>');
    $listContainer.insertAfter($btnClr);
   
    for ( var index = 0; index<resultData.length; index++){
    
        $(`<div>${resultData[index].name}</div>`).appendTo($listContainer);
        $(`<div><a href= ${resultData[index].web_pages}>${resultData[index].web_pages}</a></div>`).appendTo($listContainer);
        $('a').on('click', () => { window.open($('a').prop('href')) });
        
    };
};












 
   
    

    
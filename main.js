document.addEventListener('DOMContentLoaded', ()=> {

    const cards = document.querySelectorAll('.card');

    // const cardsPlace = document.querySelectorAll('.card_place');

    const cardWrapper = document.querySelector('.wrapper');

    const cardValues = document.querySelectorAll('.card_value');

    const btn = document.querySelector('.btn');

    let arr = [];

    let ara = [];

    let arrObj = [];

    let timerId = null;

    let isClick = true;


function openCard(card) {  

    card.classList.add('opacity');
}    

function closeCard(card) {  

    card.classList.remove('opacity');
    isClick = true;
}   


function shuffle(array) {

    //  Тасовка Фишареа - Йетса
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
        // поменять элементы местами
        // мы используем для этого синтаксис "деструктурирующее присваивание"
        // подробнее о нём - в следующих главах
        // то же самое можно записать как:
        // let t = array[i]; array[i] = array[j]; array[j] = t
        [array[i], array[j]] = [array[j], array[i]];
    }
    }

function createArr(){
    const helpArr = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    shuffle(helpArr);
    // console.log(helpArr);
    for (i=0; i<helpArr.length; i++) {
        arr[i] = helpArr[i];
        // console.log(arr[i]);
    }
}    

function createrCardValue(arr) {
    for (let i=0; i<cardValues.length; i++) {
        cardValues[i].textContent = arr[i];
    }
}

function win () {
    let count = 0;
    for (let i = 0; i<16; i++) {     
        if (cards[i].classList.contains('opacity_true')){
            count++;
        };

        if (count === 16) {
            btn.style.display = 'block';
        }
    }
    
   
}


for (let i = 0; i<16; i++) {
    cards[i].id = i;
}


function start() {
    createArr();
    createrCardValue(arr);
}

start();

btn.addEventListener('click', ()=> {
    btn.style.display = 'none';
    for (let i = 0; i<16; i++) {     
        cards[i].classList.remove('opacity_true')
        cards[i].classList.remove('opacity')
        }
    start();
})

cardWrapper.addEventListener('click', (event) => {

    let count = 0;
    
    
    if (event.target && event.target.classList.contains('card') && isClick) {
    
        const target = event.target;
    
        count++;
        if (count == 2) {
            return
        }
    
        openCard(target);
    
        arrObj.push(target);
    
        let cardVal = target.previousElementSibling.textContent;
        
        ara.push(cardVal);
    
        if (ara.length == 2) {
            if (ara[0] == ara[1]) {
                for (let i = 0; i<arrObj.length; i++) {
                    if (arrObj[0].id === arrObj[1].id) {
                        closeCard(arrObj[i]);
                        break;
                    }
                    arrObj[i].classList.add('opacity_true');
                }
                ara = [];
                arrObj = [];
                isClick = true;
                
                
            } else {
                
                for (obj of arrObj) {
                    isClick = false;
                    timerId = setTimeout(closeCard, 1500, obj);
                }
                ara = [];
                arrObj = [];
    
                
            }
            win();
        }
    
    
        }
    
    })

})
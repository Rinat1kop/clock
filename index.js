 

const date= new Date( )

const nametar=document.querySelector('.nametar')

const time= document.querySelector('.date'),
      week=document.querySelector('.week'),
      greeting=document.querySelector('.greeting'),
      username=document.querySelector('.name');

function showTime(){
    const today= new Date(),
          hour= today.getHours(),
          min=today.getMinutes(),
          sec=today.getSeconds();

          if(min===0 && sec===0)setTimeout(setBgImg(),1000)

   

    const weekly= new Date();
            
            
    const options ={ weekday:'long',day:'numeric',month:'long'},
          weekDayObject = new Intl.DateTimeFormat('ru-Ru',options).format(weekly);

    
    


    time.innerHTML=`${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    setTimeout(showTime,1000);
    week.innerHTML=`${weekDayObject}`
}


function addZero(n){
    return ((n<10)? '0':'')+n;
}

function setGreeting(){
    const today= new Date(),
          hour=today.getHours(),
          body=document.querySelector('body')


    if(hour<=11&&hour>=6){
        greeting.textContent='Доброе утро,';
    }else if(hour<=17&&hour>=12){
        greeting.textContent='Добрый день,';
    }else if(hour<=23&&hour>=18){
        greeting.textContent='Добрый вечер,';  
        body.style.color= `#fff`;
    }else{
      greeting.textContent='Доброй ночи,'
      body.style.color= `#fff`;
    }                
}


function setNameFocus(){
    username.textContent=''
}

function setTarFocus(){
    nametar.textContent=''
}

function setName(event){
    if(event.type==='keypress'){
        if(event.key==='Enter'){
            localStorage.setItem('name',event.target.textContent);
            username.blur();
    }
    }else{
        if(event.target.textContent===''){
            event.target.textContent=localStorage.getItem('name')
        } else{
            localStorage.setItem('name', event.target.textContent)
        }
    }
}

function setTar(event){
    if(event.type==='keypress'){
        if(event.key==='Enter'){
            localStorage.setItem('nametar',event.target.textContent);
            nametar.blur();
        }
    }else{
        if(event.target.textContent===''){
            event.target.textContent=localStorage.getItem('nametar')
        }else{
            localStorage.setItem('nametar',event.target.textContent)
        }
    }
}

function getName(){
    if(localStorage.getItem('name')===null){
        username.textContent='[Введите цель дня]';
    }else{
        username.textContent=localStorage.getItem('name');
    }
}

function getNameTar(){
    if(localStorage.getItem('nametar')===null){
        nametar.textContent='[Введите цель дня ]';
    }else{
        nametar.textContent=localStorage.getItem('nametar');
    }
}


//random

function getRandomImg(){
    let imgPath =Math.floor(Math.random()*(6-1+1)+1);
    return `${imgPath}.jpg`
}




//array of img

let imgArr=[]

function createImgArr(){
    const base=`assets/`;
    for (let i=0; i<24; i++){
        if(i<6) imgArr[i] = `${base}day/${getRandomImg()}`;
        else if (i<12) imgArr[i] = `${base}evenening/${getRandomImg()}`;
        else if (i<18) imgArr[i] = `${base}morning/${getRandomImg()}`;
        else  imgArr[i] = `${base}night/${getRandomImg()}`;
    }
}

function setBgImg(){
    const body =document.querySelector('body');
    let today= new Date(),
        hour=today.getHours();
    loadImages(imgArr[hour]);    

}

//кнопка смены изоб

const btn=document.querySelector('.all-images')


let index = new Date();
let imgNum=index.getHours();
function getImages(){
    if(imgNum<imgArr.length-1){
        imgNum++;
        loadImages(imgArr[imgNum]);
    }else{
        imgNum=0;
        imgNum++;
        loadImages(imgArr[imgNum])
    }
    btn.disabled=true;
    setTimeout(()=>btn.disabled=false,1000)
}

//функция для замены дубль кода load Images

function loadImages(data){
    const body=document.querySelector('body');
    let src=data;
    const img=new Image();
    img.src=src;
    img.onload=()=>body.style.backgroundImage =`url(${src})`
}

//city
const city=document.querySelector('.city');

function hideCity(){
    // localStorage.setItem('city',event.target.textContent);
    // cityStorage=localStorage.getItem('city')
        city.textContent=''
    
}

function setCity(event){
        if(event.key==='Enter'){
            localStorage.setItem('city',event.target.textContent);
            city.blur();
        } 
}

city.onblur = ()=> {
    if(city.textContent==''){
        city.textContent=localStorage.getItem('city');
    }else{
        localStorage.setItem('city',city.textContent);
        getWeather();
    }
}


    


function getCity(){
    if(localStorage.getItem('city')===null ||
      localStorage.getItem('city')==='[Введите свое местоположение]'){
        city.textContent='[Введите свое местополежение]'
    }else{
        city.textContent=localStorage.getItem('city')
        getWeather();
    }
}

//api  weather

const weatherIcon=document.querySelector('.weather-icon')
const temperature=document.querySelector('.temperature')
const windSpeed=document.querySelector('.wind-speed')
const humidity=document.querySelector('.humidity')
const weatherDescription=document.querySelector('.weather-description')

async function getWeather(){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&
    lang=ru&appid=3c1bd35d3f44c5e5063c6d67c1896d9a&units=metric`
    const res=await fetch(url);
    const data= await res.json();

    if(data.cod!=200){
        alert('Пожалуйста ,введите город правильно!');
        city.textContent='[Введите свое местополежение]';
        weatherIcon.className='weather-icon owf';
        temperature.textContent=''
        windSpeed.textContent=''
        humidity.textContent=''
        weatherDescription.textContent=''
    }else{
        weatherIcon.classList.add(`owf-${data.weather[0].id}`)
        temperature.textContent=`${data.main.temp}C`
        windSpeed.textContent=`скорость ветра ${data.wind.speed}`
        humidity.textContent=`Влажность ${data.main.humidity}%`
        weatherDescription.textContent=data.weather[0].description;
    }

}

//цитата quote

const btnQuote = document.querySelector('.btn-quote');
const quote=document.querySelector('blockquote');

function getRandomQuote(){
    let quoteNumber = Math.floor(Math.random() * (3 - 0 +1)+ 0);
    return quoteNumber;
}

async function getQuote(){
    const url='data.json';
    const res = await fetch(url);
    const data= await res.json();
    const quoteObj =data[getRandomQuote()];
    console.log(quoteObj)
    quote.textContent = quoteObj.text;

}

window.addEventListener('DOMContentLoaded',getQuote)
btnQuote.addEventListener('click',getQuote)

btn.addEventListener('click',getImages)

username.addEventListener('blur',setName)
username.addEventListener('keypress',setName)
username.addEventListener('click',setNameFocus)
nametar.addEventListener('click',setTarFocus)
nametar.addEventListener('blur',setTar)
nametar.addEventListener('keypress',setTar)
city.addEventListener('keypress',setCity)
// city.addEventListener('blur',setCity)
city.addEventListener('click', hideCity)
// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&
// appid=3c1bd35d3f44c5e5063c6d67c1896d9a=metric`//delete&


showTime();
setGreeting();
getName();  
createImgArr();
setBgImg();
getNameTar();
getCity();


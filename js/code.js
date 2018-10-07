let container = document.getElementsByClassName('container')[0];
let n = 1;
let i = 1;
let likes = 1;
let disLikes = 1;
let img;
let info;
let text = document.createTextNode("");

function fetchAPI(i){
    fetch('https://randomuser.me/api/')
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            addDataToLocalStorage(data.results[0], i);
        })
        .catch(function(error){
            console.error('Fail:', error);
        });
}
function start(){
    for(i=1;i<11;i++){
        fetchAPI(i);
        
    }
}
function showDataFromLocalStorage(profil){
    let x = localStorage.getItem(profil);
    x = JSON.parse(x); 
    return x;
}
function addDataToLocalStorage(profil, key){
    let person = {id: profil.login.uuid,name: profil.name.first, age: profil.dob.age, place: profil.location.state, url: profil.picture.medium}
        person = JSON.stringify(person);
    localStorage.setItem(key, person);
    if(localStorage.getItem(10) != null){
        addName(n);
        addImage(n);
        i=1;
    }
}
function addName(){
    console.log(n);
    text.nodeValue = "";
    text.nodeValue = showDataFromLocalStorage(n).name + ', ' + showDataFromLocalStorage(n).age;
    info.appendChild(text)
}
function addImage(){
    img.src = showDataFromLocalStorage(n).url;
}
function checkArray(){
    if(n==10){
        start();
        n=0;
    }
}
function rememberLike(){
    let like = localStorage.getItem(n);
    localStorage.setItem('like' + likes, like);
    likes++;
    
}
function rememberDisLike(){
    let disLike = localStorage.getItem(n);
    localStorage.setItem('dislike' + disLikes, disLike);
    disLikes++;
}
function checkProfil(){
    for(y=0;y<localStorage.length;y++){
        let checkLike = showDataFromLocalStorage('like' + y);
        console.log(checkLike);
        if(checkLike != null){
            if(checkLike.id == showDataFromLocalStorage(n).id){
                console.log('deleted: ' + showDataFromLocalStorage(n).name)
                localStorage.removeItem(n);
            }
        }
    }
}
function makeLayOut(){
    let h1 = document.createElement('H1');
    let title = document.createTextNode('Tinder');
    h1.appendChild(title);
    container.appendChild(h1);

    img = document.createElement('IMG');
    img.src = 'load.gif';
    container.appendChild(img);

    info = document.createElement('P');
    container.appendChild(info);

    let dislike = document.createElement('button');
    dislike.className = 'dislike'
    container.appendChild(dislike);
    dislike.addEventListener("click", function(){
        checkArray();
        n++;
        addName();
        addImage();
        rememberDisLike();
    });

    let like = document.createElement('button');
    like.className = 'like';
    container.appendChild(like);
    like.addEventListener("click", function(){
        checkArray();
        n++;
        addName();
        addImage();
        
        rememberLike();
        
    });
}
localStorage.clear();
makeLayOut();
start();



/*
    Milestone 1 -

    Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed, prendendo le informazioni che ci servono dall’array di oggetti che già trovate.
    
    Milestone 2 -
    
    Se clicchiamo sul tasto “Mi Piace” cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo. Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

    **BONUS
    
    Formattare le date in formato italiano (gg/mm/aaaa)

    Gestire l’assenza dell’immagine profilo con un elemento di fallback che contiene le iniziali dell’utente (es. Luca Formicola > LF).

    Al click su un pulsante “Mi Piace” di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

*/
    const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

/*
 Milestone 1 -

    Prendendo come riferimento il layout di esempio presente nell’html, stampiamo i post del nostro feed, prendendo le informazioni che ci servono dall’array di oggetti che già trovate.
*/

//definisco variabile container

let container = document.getElementById('container');
//ciclo gli elementi dell'array post e prendo le proprietà con il metodo deconstruct

posts.forEach(Element => {
   
    let {id, content, media, likes, created} = Element;
    let {author} = Element ;
// Assegno alla variabile myPost, i valori ottenuti dal deconstruct
    let myPost = `
        <div class="post">
            <div class="post__header">
                <div class="post-meta">
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${author.image}" alt="${author.name}">
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${author.name}</div>
                        <div class="post-meta__time">${italianDate(created)}</div>
                    </div>
                </div>
            </div>
            <div class="post__text">${content}</div>
            <div class="post__image">
                <img src="${media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" data-postid="${id}">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                    </div>
                </div>
            </div>
        </div>
        `;
        container.innerHTML += myPost;
})

// prendo tutti i bottoni
let likeButtons = document.querySelectorAll('.like-button');
console.log(likeButtons);
let likeArray = [];

likeButtons.forEach((Element) => {
    //dichiaro un contaotre che sarà ugaule al id elemento
    let contatore = Element.getAttribute('data-postid');
    // creo il conteggio che corrisponde all'id
    let questoContatore = document.getElementById(`like-counter-${contatore}`);
    //oggetto con proprietà id da aggiungere al like array ogni volta che si clicca su like
    let newObj = {id:contatore};

    //click sul like
    Element.addEventListener('click',
        function likeButtonAction(e){
            //previene il comportamento del caricamento della pagina
            e.preventDefault();
            //se fosse gia stato cliccato...
            if(Element.classList.contains('like-button--liked')) {
                Element.classList.remove('like-button--liked')
                //rimuovo il like al contatore
                questoContatore.innerHTML = parseInt(questoContatore.innerHTML) - 1;
                //tolgo id dal array
                likeArray = likeArray.filter(
                    function(object) {
                        return object.id !== contatore;
                    }
                );
            // se non è ancora cliccato sul like    
            } else {
                Element.classList.add('like-button--liked')
                //aggiungo al contatore
                questoContatore.innerHTML = parseInt(questoContatore.innerHTML) + 1;
                //aggiungo all'array
                likeArray.push(newObj);
            }
            console.log(likeArray);
        }
    )
});
//Funzioni
// Data formato italiano (gg-mm-aaaa)
function italianDate(date) {
    let splitDate = date.split("-");
    let reversedSplitDate = splitDate.reverse();
    let italianFormatDate = reversedSplitDate.join("-");

    return italianFormatDate;
}
// Genera Iniziali (prima lettera di ogni parola contenuta nella stringa fullString)
function userInitials(fullString) {
    let fullStringArr = fullString.split(" ");
    initialsArr = fullStringArr.map(element => {
        return element.substring(0, 1);// Seleziono la prima lettera di ogni stringa
    });

    return initialsArr.join("");
}




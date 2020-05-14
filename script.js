const zoneNote = document.getElementById("zone-note");
const myForm = document.getElementById("my-form");
const mustCom = document.getElementById("trending");

function addTouit(name, message,like,ts,idnote) {
    event.preventDefault();

    const note = document.createElement("div");
    note.className = "note";

    const pseudo = document.createElement("h2");
    pseudo.className = "pseudo";
    pseudo.textContent = name ;

    const notePara = document.createElement("p");
    notePara.className = "notepara";
    notePara.textContent =  message //myForm.elements["note-content"].value + "\n" + myForm.elements["note-content1"].value;

    const nbrlike = document.createElement("span");
    nbrlike.className = "nbrlike";
    nbrlike.textContent = like + "-" +"likes"


    const addlike = document.createElement("button");
    addlike.textContent = "❤";
    addlike.className = "likebtn";
    addlike.addEventListener ("click", function(e){
        console.log(idnote)
        liker(idnote)

    })

    const dislike = document.createElement("button");
    dislike.textContent = "🖤";
    dislike.className = "dislikebtn";
    dislike.addEventListener ("click", function(e){
        console.log(idnote)
        disliker(idnote)

    })

    const addcomment = document.createElement("button");
    // const nbrcom = document.createElement("span");
    addcomment.textContent =  "✉";
    addcomment.className = "addcombtn";
    addcomment.addEventListener ("click", function(e){
        console.log(idnote)
        addcom(idnote) 

    })

    //  Création du span.touit-date    

    const myDate = new Date(ts * 1000);     
    const yy = myDate.getFullYear();     
    const m = (myDate.getMonth()+1).toString();     
    const jj = (myDate.getDay()+3).toString();     
    const hh = myDate.getHours().toString();     
    const mm = myDate.getMinutes().toString();     
    const ss = myDate.getSeconds().toString();      
    const dateSpan = document.createElement('span');     
    dateSpan.className = "touit-date";     
    dateSpan.textContent = hh.padStart(2, "0") + " : " + mm.padStart(2, "0") + " : " + ss.padStart(2, "0") + " - " + jj.padStart(2, "0") + "/" + m.padStart(2, "0") + "/" + yy;

    
    
   

    note.appendChild(pseudo);
    note.appendChild(notePara);
    note.appendChild(nbrlike);
    note.appendChild(addlike);
    note.appendChild(dislike);
    note.appendChild(addcomment);
    note.appendChild(dateSpan);
    zoneNote.prepend(note);

    

    
};

myForm.addEventListener("submit", addTouit);





// Récupération et Rafraichissement des Touites 


// function refreshChat(){
    const request = new XMLHttpRequest();
    request.open("GET", "http://touiteur.???/list", true);
    request.addEventListener("readystatechange", ()=> {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            const response = JSON.parse(request.responseText);
            console.log(response)
            zoneNote.textContent= "";
            for (let touit of response.messages) {
                addTouit( touit.name, touit.message, touit.likes, touit.ts, touit.id );
            }
        }
    });

    request.send();
    // setInterval(function(){addTouit();}, 1000);


document.getElementById("touitbtn").addEventListener("click", function(){
    
    addTouit(myForm.elements["note-content"].value , myForm.elements["note-content1"].value) 
    touitos(myForm.elements["note-content"].value, myForm.elements["note-content1"].value)
});








// Création d'une fonction pour envoyer un nouveau touite



function touitos(name,message){

        const addnote = new XMLHttpRequest();
        addnote.open("POST", "http://touiteur.???/send", true);
        addnote.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        addnote.addEventListener("readystatechange", function() {
            if (addnote.readyState === XMLHttpRequest.DONE && addnote.status === 200) {
            console.log(addnote.responseText)
            }
        });
        
        addnote.send("name="+ name +"&"+"message="+ message);


    };




    
// Création d'une fonction pour liker les touites

function liker(idlike){
    
    let likerequest = new XMLHttpRequest();
    likerequest.open("PUT", "http://touiteur.???/likes/send", true);
    likerequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    likerequest.addEventListener("readystatechange", function() {
        if (likerequest.readyState === XMLHttpRequest.DONE && likerequest.status === 200) {
            console.log(likerequest.response)
        
    
        }

    });
    console.log(idlike)
    likerequest.send("message_id="+ idlike);
}





// Création d'une fonction pour disliker les touites



function disliker(idlike){
    
    let dislikerequest = new XMLHttpRequest();
    dislikerequest.open("DELETE", "http://touiteur.???/remove", true);
    dislikerequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    dislikerequest.addEventListener("readystatechange", function() {
        if (dislikerequest.readyState === XMLHttpRequest.DONE && dislikerequest.status === 200) {
            console.log(dislikerequest.response)
        
    
        }

    });
    console.log(idlike)
    dislikerequest.send("message_id="+ idlike);
}





// Recuperation des commentaires




// const comrequest = new XMLHttpRequest();
// comrequest.open("GET", "http://touiteur.???/comments/list", true);
// comrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// comrequest.addEventListener("readystatechange", function() {
//     if (comrequest.readyState === XMLHttpRequest.DONE && comrequest.status === 200) {
//         console.log(comrequest.response)
//         const comresponse = JSON.parse(comrequest.responseText);
//         console.log(comresponse)
//         for (let comment of comresponse.comment) {
//             addcom( comment.name, comment.comment);
//         }
    

//     }

// });
// comrequest.send();








// Création d'une fonction pour commenter


// function addcom(idcom){

//     document.getElementById("body").style.overflow = "hidden";
    
//     let comrequest = new XMLHttpRequest();
//     comrequest.open("POST", "http://touiteur.???/comments/send", true);
//     comrequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     comrequest.addEventListener("readystatechange", function() {
//         if (comrequest.readyState === XMLHttpRequest.DONE && comrequest.status === 200) {
//             console.log(comrequest.response)
        
    
//         }

//     });
//     console.log(idcom)
//     comrequest.send("message_id="+ idcom);
// }

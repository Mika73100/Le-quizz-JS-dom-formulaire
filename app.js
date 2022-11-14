
//ici je cible le document avec un queryselector.
const form = document.querySelector('.form-quizz');
let tableauResultats = [];
const reponses = ['c','a','b','a','c'];
const emojis = ['😁','✨','👀','😂','👎'];
const titreResultat = document.querySelector('.resultats h2');
const noteResultat = document.querySelector('.note');
const aideResultat = document.querySelector('.aide');
const toutesLesQuestions = document.querySelectorAll('.question-block');
let verifTableau = [];


//ici je demande a la page navigateur de ne pas utiliser son comportement par defaut alors il ne recharge pas la page.
form.addEventListener('submit', (e) => {
    e.preventDefault();

    //console.log(document.querySelector('input[name="q1"]:checked').value);

    for(i = 1; i < 6; i++) {
        tableauResultats.push(document.querySelector(`input[name="q${i}"]:checked`).value);
    }

    //console.log(tableauResultats);
    verifFunc(tableauResultats);
    tableauResultats = [];

})

//ici je crée une fonction qui va me permettre de comparé les résultats avec les emoji.
    function verifFunc(tabResultats) {
        for(let a = 0; a < 5; a++){

            if(tabResultats[a] === reponses[a]){
                verifTableau.push(true);
            } else {
                verifTableau.push(false)
            }
        }

        //console.log(verifTableau);
        afficherResultats(verifTableau);
        couleursFonction(verifTableau);
        verifTableau = [];
    }

//ici je crée une fonction pour afficher les résultat et ensuite je crée une const.
//la const reprend le nombre de faute et affiche juste les réponse false.
//mes fautes = false et donc s'affiche dans le console.log
//ici je met .length car il récupère un nombre et donc celui des fautes.
function afficherResultats(tabCheck) {
    const nbDeFautes = tabCheck.filter(el => el !== true).length;

    //console.log(nbDeFautes);

    //ici je défini des cas différent avec switch sur le nombre de faute ( constante que j'ai défini plus haut ).
    switch(nbDeFautes) {
        case 0:
            titreResultat.innerText = "✨ Bravo, c'est un sans faute ! ✨ ";
            aideResultat.innerText = '';
            noteResultat.innerText = '5/5';
        break;

        case 1:
            titreResultat.innerText = "😁 Bravo, t'est pas mauvais ! 😁 ";
            aideResultat.innerText = '';
            noteResultat.innerText = '4/5';
        break;

        case 2:
            titreResultat.innerText = "😂 Crois en toi ! 😂 ";
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '3/5';
        break;

        case 3:
            titreResultat.innerText = "😂 Crois en toi ! 😂 ";
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '2/5';
        break;

        case 4:
            titreResultat.innerText = "👀 Peux mieux faire ! 👀 ";
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '1/5';
        break;

        case 5:
            titreResultat.innerText = "👎 Peux mieux faire ! 👎";
            aideResultat.innerText = 'Retentez une autre réponse dans les cases rouges, puis re-validez !';
            noteResultat.innerText = '0/5';
        break;


        default:
            'Wops, cas innatendu.';
    }
}

//ici je crée une fonction pour les valeurs booléen de mes tableau / true / false etc...
function couleursFonction(tabValBool) {

    for(let j = 0; j < tabValBool.length; j++){

        //si la réponse est vrai alors je vais prendre toute les questions de J et je leurs change la couleurs.
        if(tabValBool[j] === true){
            toutesLesQuestions[j].style.background = 'lightgreen';

            //sinon,
        } else {
            toutesLesQuestions[j].style.background = '#ffb8b8';
            toutesLesQuestions[j].classList.add('echec');

            //ici je vais mettre une limite de temps pour répondre sinon je met a zero 
            setTimeout(() => {
                toutesLesQuestions[j].classList.remove('echec');
            }, 500)
        } 

    }
}

//ici je demande a tous les bloc de reset leurs couleurs pour répondre a nouveau et corriger notre réponse.
toutesLesQuestions.forEach(item => {
    item.addEventListener('click', () => {
        item.style.background = "white";
    })
})

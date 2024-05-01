let initialisation = true;

document.getElementById("cmd-prompt").onkeydown = function(e) {
    if(e.code == 'Enter') {
        executeCommand(document.getElementById("cmd-prompt").value)
        document.getElementById("cmd-prompt").value = ''
    }
}
lines = []

commands = {
    "print": "Print some words on the terminal screen",
    "echo": "An alias of 'print'",
    "help": "It shows you the commands followed by the descriptions",
    "?": "It is the same as 'help'",
    "date": "Returns the current date and time",
    "clear": "Clear the command prompt of all those messages",
    /*  Maintenant, je vais passer les commandes que je trouve pertinentes pour le CV */
    "whoami": "Wait this isn't that easy to fetch my name.. Wait a minute!",
    "tellmeeverything": "It will tell you everything about Louison",
    "ensavoirplus": "Ça t'en dit plus...",
    "interets": "Pour connaître mes intérêts"

}

if(initialisation) {
    const currentDate = new Date();
    this.writeLine("Welcome to LouisonOS")
    this.writeLine(`Today's date: ${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getMilliseconds()}`)
    this.writeLine("For more information type 'help' or '?'")

}

function executeCommand(str) {
    str.replaceAll(" ", "ㅤ")
    if(str == "") return;
    writeLine("louison@MacBook-Air-de-Louison /home % " + colorizeText(str))
    if(!Object.keys(commands).includes(str.split(" ")[0])) {
        writeLine("Commande inconnue. Veuillez taper 'help' pour obtenir la liste des commandes qui existent.")
        return
    }

    if(str == "help" || str == "?") {
        writeLine("Voici la liste des commandes disponibles =>")
        for (command in commands) {
            writeLine("ㅤㅤㅤㅤ'" + command + "': " + commands[command])
        }
        return;
    }
    else if(str == "clear") {
        lines = []
        document.getElementById("textToShow").innerHTML = ""
        return;
    }

    else if(str == "date") {
        const currentDate = new Date()
        writeLine(`Today's date: ${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()} ${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getMilliseconds()}`)
        return;
    }

    else if(str.startsWith("print") || str.startsWith("echo")) {
        let text = str.startsWith("echo") == true ? str.substring(5) : str.substring(6);
        writeLine(text)
        return;
    }
    else if(str.startsWith("whoami")) {
        writeLine("The website's owner is Louison Hachemi")
    }
    else if(str.startsWith("tellmeeverything")) {
        writeLine("Je m'appelle Louison Hachemi ! J'ai 16 ans")
        writeLine("Actuellement, je suis en 1re au Lycée André Maurois.")
        writeLine("Je suis dans la recherche profonde d'un stage qui me mettrait")
        writeLine("en relation avec des développeurs web/d'apps mobile/jeux.")
        writeLine("")
        writeLine("Pour en savoir plus => 'ensavoirplus")
        return;

    }
    else if(str.startsWith("ensavoirplus")) {
        executeCommand("clear")
        writeLine("louison@MacBook-Air-de-Louison /home % ensavoirplus")
        writeLine(" ")
        writeLine("ㅤㅤㅤㅤIl se trouve que dans mon parcous scolaire, j'ai décidé de prendre les spécialités et options suivantes:")
        writeLine("ㅤㅤ• Numériques et Sciences Informatiques")
        writeLine("ㅤㅤ• Mathématiques")
        writeLine("ㅤㅤ• Physique-Chimie")
        writeLine("J'ai une seule option : Anglais Euro")
        writeLine(" ")
        writeLine("ㅤㅤㅤㅤPuis, en Terminale, comme on me demande de retirer une spécialité, j'ai décidé de retirer la Physique-Chimie afin de poursuivre mes études pour devenir développeur.")
    }

    else if(str.startsWith("interets")) {
        writeLine(" ")
        writeLine("Comme indiqué dans la commande 'tellmeeverything', je suis favorable aux stages me mettant en relation avec les métiers")
        writeLine("ㅤㅤ• Développeur Web")
    }

}


var maxLettersInLine = 100;

function splitString(inputString) {
    var substrings = [];
    var startIndex = 0;

    while (startIndex < inputString.length) {
        var nextIndex = startIndex + maxLettersInLine;
        // Trouver le dernier espace avant le 100e caractère
        while (inputString[nextIndex] !== ' ' && nextIndex > startIndex) {
            nextIndex--;
        }
        // Si aucun espace n'est trouvé avant le 100e caractère, découper au 100e caractère
        if (nextIndex === startIndex) {
            nextIndex = startIndex + maxLettersInLine;
        }
        substrings.push(inputString.substring(startIndex, nextIndex));
        // Si nous avons découpé à un espace, nous voulons exclure cet espace de la prochaine sous-chaîne
        if (inputString[nextIndex] === ' ') {
            nextIndex++;
        }
        startIndex = nextIndex; // Déplacer startIndex au prochain mot
    }

    return substrings;
}


function colorizeText(text) {
    // Remplace les balises <color> par des balises <span> avec la couleur spécifiée
    text = text.replace(/<color\((#[a-fA-F0-9]{6})\)>(.*?)<\/color>/g, '<span class="terminal-screen-text" style="color: $1;">$2</span>');

    return text;
}


function writeLine(text) {
    if (lines.length == 21) {
        lines.splice(0, 1);
    }

    text.replaceAll("%nl%", " "*maxLettersInLine)

    if(text.length > maxLettersInLine){
        for(line in splitString(text)) {
            writeLine(splitString(text)[line]);
        }
        return;
    }

    lines.push(text);

    document.getElementById("textToShow").textContent = ''

    lines.forEach(line => {
        document.getElementById("textToShow").innerHTML += line + "<br />"
    })

}



// Ajout d'une variable qui va être utilisée pour vérifier si l'utilisateur souhaite bouger sa fenêtre
let isDragging = false;

// Variables qui vont servir à stocker la position initiale de la souris et de la fenêtre
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;

const windowHeader = document.querySelector('.window-management-tool');

windowHeader.addEventListener('mousedown', startDragging);

// Fonction pour lorsque l'utilisateur interagis avec sa souris sur la fenêtre
function startDragging(e) {
    isDragging = true;

    // Position initiale de la souris
    initialX = e.clientX;
    initialY = e.clientY;

    // Obtention de la position initiale de la fenêtre
    const rect = document.querySelector('.terminal-window').getBoundingClientRect();
    offsetX = rect.left - initialX;
    offsetY = rect.top - initialY;

    // Les event listeners pour le déplacement de la fenêtre
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDragging);
}

// Fonction pour le déplacement de la fenêtre
function drag(e) {
    if (isDragging) {
        // Calculer la différence entre la position de la souris et la position initiale de la souris
        let deltaX = e.clientX - initialX;
        let deltaY = e.clientY - initialY;

        deltaX+=deltaX
        deltaY+=deltaY

        // Modifier la position dite initiale de la souris avec la position actuelle de la souris
        initialX = e.clientX;
        initialY = e.clientY;

        // Calcul de la nouvelle position de la fenêtre
        const newLeft = parseInt(document.querySelector('.terminal-window').style.left || 0) + deltaX;
        const newTop = parseInt(document.querySelector('.terminal-window').style.top || 0) + deltaY;

        // Mise à jour de la position de la souris
        document.querySelector('.terminal-window').style.left = newLeft + 'px';
        document.querySelector('.terminal-window').style.top = newTop + 'px';
    }
}


// Fonction pour quand l'utilisateur relève la souris
function stopDragging() {
    isDragging = false;

    // On retire les listeners
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDragging);
}

// Forcer le focus de l'input cmd-prompt

const cmdPromptElement = document.getElementById("cmd-prompt");
cmdPromptElement.focus();
cmdPromptElement.addEventListener("focus", () => {
        setInterval(() => {
            if(cmdPromptElement.value == "" || cmdPromptElement.value == " ") {
                cmdPromptElement.focus();
            }
        }, 100)
})

cmdPromptElement.addEventListener("blur", () => {
    cmdPromptElement.focus()
})


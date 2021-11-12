function Eval() {
    const rightAns = document.getElementsByClassName('rightAns')
    const choosenAns = document.getElementsByClassName('chosenAns')
    const quesion = document.getElementsByClassName('question-pnl')
    var count = 0
    var invalidQuestions = 0


    const tags = document.getElementsByTagName('td');
    for (let i = 0; i < tags.length; i++) {
        const tag = tags[i];
        const elements = tag.getElementsByClassName('bold')
        for (let z = 0; z < elements.length; z++) {
            const el = elements[z];
            if (el.length == 0) { }
            else {
                if (el.innerText.length == 1) {
                    el.className += ' chosenAns'
                }
            }
        }
    }

    for (let k = 0; k < quesion.length; k++) {
        const q = quesion[k];
        if (q.innerHTML.includes('Note:')) {
            count++
            invalidQuestions++
            q.remove()
        }
    }

    for (i = 0; i < rightAns.length; i++) {
        var rightAnsText = rightAns[i].innerText.split('.')[0]
        var choosenAnsText = choosenAns[i].innerText
        if (rightAnsText == choosenAnsText) {
            rightAns[i].parentElement.parentElement.parentElement.parentElement.style.backgroundColor = 'green'
            count++
        } else {
            rightAns[i].parentElement.parentElement.parentElement.parentElement.style.backgroundColor = 'red'
        }
    }
    var mainInfoPanel = document.getElementsByClassName('main-info-pnl')
    for (let l = 0; l < mainInfoPanel.length; l++) {
        const infoPanel = mainInfoPanel[l];
        const infoTable = infoPanel.getElementsByTagName('tbody')
        infoTable[0].innerHTML += `<tr><td>Discrepant questions</td><td>${invalidQuestions}</td></tr><tr><td>Total Marks</td><td>${count}</td></tr>`

        infoPanel.innerHTML += `<p class="bold">Note: Discrepant questions are the questions which has no answer provided or it is an illogical question. You will get marks for this.</p>`
    }
}

function previewFile() {
    const [file] = document.querySelector('input[type=file]').files;
    const fileReader = new FileReader();

    fileReader.addEventListener("load", () => {
        document.body.innerHTML += fileReader.result;
        document.head.innerHTML += `<script src="Evaluator.js"></script>`
    }, false);

    if (file) {
        fileReader.readAsText(file);
    }
}

function getFileFromLink() {
    const file = fetch(document.querySelector('input[type=url]').value).then(f => {
        f.text().then(d => {
            document.body.innerHTML += d
        })
    })
}
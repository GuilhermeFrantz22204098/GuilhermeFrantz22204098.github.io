// passa-por-aqui
const passaPorAqui = document.querySelector('#passa-por-aqui')
const passaTextOff = 'Passa por aqui!'
const passaTextOn = 'Obrigado por passares!'

passaPorAqui.textContent = passaTextOff

function ativar() {
    passaPorAqui.textContent = passaTextOn
}

function desativar() {
    passaPorAqui.textContent = passaTextOff
}

passaPorAqui.addEventListener('mouseenter', ativar)
passaPorAqui.addEventListener('mouseleave', desativar)

// pinta-me
const pintaTitle = document.querySelector('#pinta-me p')
const pintaButtons = document.querySelectorAll('#pinta-me button')

function pintar() {
    const pintaColor = this.dataset.color
    pintaTitle.style.color = pintaColor
}

pintaButtons.forEach(pintaButton => {
    pintaButton.onclick = pintar
})

// experimenta-escrever
const experimentaTitle = document.querySelector('#experimenta-escrever p')
const experimentaInput = document.querySelector('#experimenta-escrever input')
const experimentaColors = ['red', 'yellow', 'blue', 'gray']
let experimentaIndex = 0;

experimentaInput.addEventListener('input', () => {
    experimentaInput.style.backgroundColor = experimentaColors[experimentaIndex]
    experimentaIndex = (experimentaIndex + 1) % experimentaColors.length
})

// escolha-cor
const body = document.querySelector('body') 

if (!localStorage.getItem('escolhaColor')) {
    localStorage.setItem('escolhaColor', '')
}
body.style.backgroundColor = localStorage.getItem('escolhaColor')

document.querySelector('#escolha-select').onchange = function() {
    const escolhaColor = this.value; 
    document.querySelector('body').style.backgroundColor = escolhaColor
    localStorage.setItem('escolhaColor', escolhaColor)
}

// conta-me
const contaTitle = document.querySelector('#conta p')
const contaButton = document.querySelector('#conta button')

if (!localStorage.getItem('contaCount')) {
    localStorage.setItem('contaCount', 0)
}

contaTitle.textContent = localStorage.getItem('contaCount')

function contar() {
    let contaCount = localStorage.getItem('contaCount')
    ++contaCount
    contaTitle.textContent = contaCount
    localStorage.setItem('contaCount', contaCount)
}

contaButton.onclick = contar

// insira-nome
const insiraForm = document.querySelector('#insira-nome form');
const insiraNomeInput = document.querySelector('#insiraNome');
const insiraIdadeInput = document.querySelector('#insiraIdade');
const insiraResultado = document.querySelector('#insira-nome p'); 

insiraForm.onsubmit = (e) => {
    e.preventDefault();

    const nome = insiraNomeInput.value;
    const idade = insiraIdadeInput.value;

    const insiraMsg = `Olá, ${nome} tem ${idade} anos!`;

    insiraResultado.textContent = insiraMsg;

    insiraNomeInput.value = '';
    insiraIdadeInput.value = '';
}

// auto-conta
const autoContaTitle = document.querySelector('#auto-conta p')

if (!localStorage.getItem('autoContaCount')) {
    localStorage.setItem('autoContaCount', 0)
}

autoContaTitle.textContent = localStorage.getItem('autoContaCount')

function autoContar() {
    let count = localStorage.getItem('autoContaCount')
    ++count
    autoContaTitle.textContent = count
    localStorage.setItem('autoContaCount', count)
}
setInterval(autoContar, 1000)
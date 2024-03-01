let elementos = document.querySelectorAll('.hidden')
 
let myObserver = new IntersectionObserver((values) => {
  values.forEach((element) => {
      if(element.isIntersecting) {
        element.target.classList.add('show')
      } else {
        element.target.classList.remove('show')
      }
  })
})

elementos.forEach((element) => myObserver.observe(element))


document.querySelector('.scroll-suave').addEventListener('click', function(event) {
    event.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    window.scrollTo({
        top:
        targetElement.offsetTop,
        behavior: 'smooth'
    })
})


const perguntas = [
    {
    pergunta: "Qual o tipo de motor mais comum em carros hoje em dia?",
    opcoes: ["Motor Elétrico", "Motor a Combustão", "Motor Híbrido"],
    resposta: 1
    },
    
    {
    pergunta: "Qual a marca de carro mais vendida no Brasil em 2023?",
    opcoes: ["Fiat", "Volkswagen", "Chevrolet"],
    resposta: 1
    },
    
    {
    pergunta: "Qual o país que inventou o carro?",
    opcoes: ["Alemanha", "França", "Estados Unidos"],
    resposta: 1
    },
    
    {
    pergunta: "Qual o nome do primeiro carro do mundo?",
    opcoes: ["Benz Patent Motorwagen", "Ford Modelo T", "Volkswagen Fusca"],
    resposta: 0
    },
    
    {
    pergunta: "Quantas rodas um carro normal tem?",
    opcoes: ["3", "4", "5"],
    resposta: 1
    },
    
    {
    pergunta: "Qual o nome do sistema que controla a velocidade do carro?",
    opcoes: ["Freio", "Acelerador", "Câmbio"],
    resposta: 2
    },
    
    {
    pergunta: "Qual o nome do dispositivo que indica a velocidade do carro?",
    opcoes: ["Velocímetro", "Odômetro", "Tacômetro"],
    resposta: 0
    },
    
    {
    pergunta: "Qual o nome do líquido que lubrifica o motor do carro?",
    opcoes: ["Óleo", "Água", "Gasolina"],
    resposta: 0
    },
    
    {
    pergunta: "Qual o nome do dispositivo que limpa o para-brisa do carro?",
    opcoes: ["Palheta", "Limpador", "Lavador"],
    resposta: 0
    },
    
    {
    pergunta: "Qual o nome do dispositivo que ilumina a estrada à noite?",
    opcoes: ["Farol", "Lanterna", "Luz de freio"],
    resposta: 0
    }
    
    ];

const quiz = document.querySelector('#quiz');

const template = document.querySelector('#container');

let QuestionNumber = 0;

let SelectionChecker = 0;

let NumberQuestion = 0;

const DivAcertos = document.querySelector('#acertos')

const TextAcertos = document.querySelector('#acertos span');

let acertos = new Set();



    for(let quizContent of perguntas) {
        let cloneTemplate = template.cloneNode(true);

        cloneTemplate.querySelector('div h3').textContent = quizContent.pergunta;

        NumberQuestion++


        let NumberQuestionDiv = cloneTemplate.querySelector('#NumberQuestion')
        cloneTemplate.querySelector('#NumberQuestion').textContent = (NumberQuestion)
     
        for(let respostas of quizContent.opcoes) {
            let dt = cloneTemplate.querySelector('dl dt').cloneNode(true)
            dt.querySelector('span').textContent = respostas;
            dt.querySelector('input').setAttribute('name','pergunta-' + perguntas.indexOf(quizContent))
                
            dt.querySelector('input').value = quizContent.opcoes.indexOf(respostas)
                
            dt.querySelector('input').onchange = () => {
            acertos.delete(quizContent)
            
            if(dt.querySelector('input').value == quizContent.resposta) {
                    acertos.add(quizContent)
            }
            TextAcertos.textContent = (`${acertos.size}/${perguntas.length}`)
            
            SelectionChecker++
            }
      

            function passNext() {  
                NumberQuestionDiv.style.left = '25.5px'
                if(QuestionNumber == 9) {
                    document.querySelector('body #first').style.display = 'none';

                    document.querySelector('body #last-one').style.display = 'none';

                    DivAcertos.style.display = 'flex';
                }

                if(SelectionChecker >= 1) {
                    if(QuestionNumber < 9 || QuestionNumber == 9) {
                        QuestionNumber++;
                        quiz.querySelector(`#div-${QuestionNumber}`).style.display = 'block'

                        quiz.querySelector(`#div-${QuestionNumber - 1}`).style.display = 'none';  
                        SelectionChecker = 0;
                        console.log(QuestionNumber)
                    } 
                } else {
                    return alert('Escolha uma opção ou marque denovo')
                }    
            }

            function passBack() {
                if(QuestionNumber > 0) {
                    QuestionNumber--;     
                }
                quiz.querySelector('#button-back' + QuestionNumber).style.visibility = 'hidden'
                SelectionChecker++
                quiz.querySelector(`#div-${QuestionNumber}`).style.display = 'block'
    
                quiz.querySelector(`#div-${QuestionNumber + 1}`).style.display = 'none';
            }

      
        cloneTemplate.querySelector('dl').appendChild(dt)
        }
    
        cloneTemplate.querySelector('dl dt').remove()
        cloneTemplate.setAttribute('id', 'div-' + perguntas.indexOf(quizContent))

        cloneTemplate.querySelector('.next').setAttribute('id', 'button-next' + perguntas.indexOf(quizContent));
        cloneTemplate.querySelector('.back').setAttribute('id', 'button-back' + perguntas.indexOf(quizContent));

        quiz.append(cloneTemplate)
        
        cloneTemplate.style.display = 'none'
        quiz.querySelector('#div-0').style.display = 'block'
}

    quiz.querySelector('#button-next9').value = 'Enviar'
    quiz.querySelector('#button-back0').style.display = 'none'
    template.remove()
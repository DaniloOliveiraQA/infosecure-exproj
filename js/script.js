// js/quiz.js

const questions = [
  { 
    question: "Qual a diferença entre I.A estreita e I.A geral?",
    answers: [
      "A) A I.A. estreita é capaz de realizar qualquer tarefa intelectual humana, enquanto a I.A. geral é especializada em apenas uma função.", 
      "B) A I.A. estreita é projetada para executar tarefas específicas, enquanto a I.A. geral tem a capacidade de realizar qualquer tarefa intelectual que um ser humano pode fazer.", 
      "C) A I.A. estreita é uma tecnologia ainda não desenvolvida, enquanto a I.A. geral já é amplamente utilizada em produtos comerciais.", 
      "D) A I.A. estreita funciona sem a necessidade de dados, enquanto a I.A. geral depende exclusivamente de grandes bancos de dados", 
    ], 
    correct: 2
  },
  {
    question: "Como a IA pode melhorar a segurança em ambientes corporativos?",
    answers: [
      "A) Substituindo completamente os profissionais de TI", 
      "B) Instalando sistemas operacionais automaticamente", 
      "C) Limpando arquivos duplicados", 
      "D) Identificando e respondendo a ameaças em tempo real"
    ], 
    correct: 4
  },
  {
    question: "O que é segurança da informação (InfoSec)?",
    answers: [
      "A) É a proteção contra ataques físicos.", 
      "B) É o controle do uso da internet.", 
      "C) É a proteção de informações contra acessos não autorizados, uso, alteração ou interrupção.", 
      "D) É o bloqueio de redes sociais."
    ],
    correct: 3
  },
  {
    question: "O que caracteriza o phishing?",
    answers: [
      "A) Acesso físico a redes.", 
      "B) Ataque direto aos servidores.", 
      "C) Engano por meio de e-mails ou sites falsos.", 
      "D) Monitoramento por biometria."
    ],
    correct: 3
  },
  {
    question: "O que é Inteligência Artificial (IA)?",
    answers: [
      "A) Um tipo de software que executa apenas tarefas pré-programadas sem aprender", 
      "B) Sistemas computacionais capazes de realizar tarefas que normalmente requerem inteligência humana", 
      "C) Um banco de dados gigante que armazena informações sobre humanos", 
      "D) Uma tecnologia exclusiva para robôs físicos"
    ],
    correct: 2
  },
  {
    question: "Quais são os cinco pilares da segurança da informação?",
    answers: [
      "A) Criptografia, firewall, backup, senha, atualização.",
      "B) Confidencialidade, integridade, disponibilidade, autenticidade, irrefutabilidade.",
      "C) Prevenção, resposta, monitoramento, recuperação, análise.",
      "D) Dados, redes, nuvem, senhas, backups."
    ],
    correct: 2
  },
  {
    question: "O que a criptografia faz?",
    answers: [
      "A) Codifica informações para impedir acesso indevido.",
      "B) Apaga automaticamente dados antigos.",
      "C) Conecta dispositivos à nuvem.",
      "D) Gera relatórios de produtividade."
    ],
    correct: 1
  },
  {
    question: "O que é um ataque Man-in-the-Middle?",
    answers: [
      "A) Invasão por malware.",
      "B) Interceptação da comunicação entre duas partes.",
      "C) Envio de spam.",
      "D) Download automático de arquivos."
    ],
    correct: 2
  },
  {
    question: "Qual é o impacto de investimentos em IA e automação na segurança?",
    answers: [
      "A) Aumenta o custo das violações.",
      "B) Reduz a eficácia da segurança.",
      "C) Reduz o custo das violações em até US$ 1,76 milhão.",
      "D) Elimina totalmente os riscos."
    ],
    correct: 3
  },
  {
    question: "Qual dessas opções é uma boa prática de segurança?",
    answers: [
      "A) Compartilhar senhas com colegas de trabalho.",
      "B) Atualizar os sistemas regularmente.",
      "C) Usar redes Wi-Fi públicas para acessar o sistema.",
      "D) Armazenar senhas em arquivos de texto no desktop"
    ],
    correct: 2
  }
];

// restante do script permanece igual...

let currentQuestion = 0;
let score = 0;
let timer;
const timeLimit = 90;
let timeLeft = timeLimit;

const questionContainer = document.getElementById('question-container');
const answersContainer = document.querySelector('.answers-container');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const resultBox = document.getElementById('result');
const progressFill = document.getElementById('progress-bar-fill');
const timerDisplay = document.getElementById('timer');

function updateProgress() {
  const percent = ((currentQuestion) / questions.length) * 100;
  progressFill.style.width = percent + '%';
}

function updateTimer() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  timerDisplay.textContent = `Tempo restante: ${minutes}:${seconds}`;

  if (timeLeft <= 0) {
    clearInterval(timer);
    currentQuestion++;
    loadQuestion();
  }
  timeLeft--;
}

function startTimer() {
  clearInterval(timer);
  timeLeft = timeLimit;
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function loadQuestion() {
  clearInterval(timer);
  resultBox.style.display = 'none';
  nextBtn.hidden = true;
  answersContainer.innerHTML = '';
  timerDisplay.style.display = 'block';

  if (currentQuestion >= questions.length) {
    questionContainer.textContent = "Parabéns! Você completou o quiz.";
    resultBox.style.display = 'block';
    resultBox.textContent = `Você acertou ${score} de ${questions.length} perguntas!`;
    restartBtn.hidden = false;
    timerDisplay.style.display = 'none';
    progressFill.style.width = '100%';
    return;
  }

  updateProgress();

  const q = questions[currentQuestion];
  questionContainer.textContent = q.question;

  q.answers.forEach((answer, index) => {
    const btn = document.createElement('button');
    btn.textContent = answer;
    btn.onclick = () => {
      clearInterval(timer);
      const buttons = answersContainer.querySelectorAll('button');
      buttons.forEach((b, i) => {
        b.disabled = true;
        if (i + 1 === q.correct) {
          b.classList.add('correct');
        } else if (b === btn && i + 1 !== q.correct) {
          b.classList.add('incorrect');
        }
      });
      if (index + 1 === q.correct) {
        score++;
      }
      nextBtn.hidden = false;
    };
    answersContainer.appendChild(btn);
  });

  startTimer();
}

nextBtn.addEventListener('click', () => {
  clearInterval(timer);
  currentQuestion++;
  loadQuestion();
});

restartBtn.addEventListener('click', () => {
  clearInterval(timer);
  currentQuestion = 0;
  score = 0;
  restartBtn.hidden = true;
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('start-screen').style.display = 'block';
});

document.getElementById('quiz-container').style.display = 'none';

document.getElementById('start-btn').addEventListener('click', () => {
  document.getElementById('start-screen').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  loadQuestion();
});

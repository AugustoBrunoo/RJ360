const quizData = [
    {
        giria: "Bolado",
        certa: "Estar chateado, irritado ou surpreso.",
        erradas: [
            "Ser alguém engraçado.",
            "Ser alguém muito rico.",
            "Alguém muito alto."
        ],
        exemplos: [
            "“Fiquei bolado quando ele nem respondeu.”",
            "“Tô bolado com esse rolê, não curti não.”",
            "“Ih, fulano ficou bolado contigo, hein?”"
        ]
    },
    {
        giria: "Vazar",
        certa: "Sair de algum lugar, ir embora.",
        erradas: [
            "Gastar muito dinheiro.",
            "Contar um segredo.",
            "Chamar alguém."
        ],
        exemplos: [
            "“Já deu, bora vazar?”",
            "“Vou vazar daqui antes que dê ruim.”",
            "“Mermão, vaza que a polícia tá chegando!”"
        ]
    },
    {
        giria: "Papo reto",
        certa: "Falar a verdade, sem enrolação.",
        erradas: [
            "Fazer fofoca.",
            "Ficar quieto.",
            "Conversar devagar."
        ],
        exemplos: [
            "“Papo reto, tu é meu parceiro mesmo.”",
            "“Vou falar papo reto: tu vacilou.”",
            "“Papo reto, essa festa tá sinistra!”"
        ]
    },
    {
        giria: "Ainda",
        certa: "Usado no final como reforço de surpresa ou ironia.",
        erradas: [
            "Significa dormir.",
            "Significa comer rápido.",
            "Significa dar risada."
        ],
        exemplos: [
            "“Ele tá ali falando besteira ainda.”",
            "“Tu vai ficar aí parado ainda?”",
            "“Vai fazer isso ainda? Tá de sacanagem, né?”"
        ]
    },
    {
        giria: "Vacilão",
        certa: "Pessoa que dá mole, que vacila.",
        erradas: [
            "Pessoa muito esperta.",
            "Pessoa que trabalha muito.",
            "Pessoa muito rica."
        ],
        exemplos: [
            "“Moleque vacilão, deixou a gente na mão.”",
            "“Não dá mole pra vacilão.”",
            "“Tu tá sendo vacilão demais, vê se acorda.”"
        ]
    },
    {
        giria: "Cria",
        certa: "Alguém criado em um lugar, geralmente comunidade ou bairro.",
        erradas: [
            "Pessoa rica.",
            "Alguém famoso.",
            "Uma comida típica."
        ],
        exemplos: [
            "“Ele é cria do morro, conhece todo mundo.”",
            "“Sou cria daqui, respeito é lei.”",
            "“É cria, mas tá moscando.”"
        ]
    },
    {
        giria: "Mec",
        certa: "Tranquilo, suave, de boa.",
        erradas: [
            "Dinheiro falso.",
            "Comida ruim.",
            "Roupa cara."
        ],
        exemplos: [
            "“Tá tudo mec, relaxa.”",
            "“Fica mec, não deu nada não.”",
            "“Visão, então tá mec.”"
        ]
    },
    {
        giria: "Tega",
        certa: "Variação de nega/negrão pra chamar amigo.",
        erradas: [
            "Comida típica.",
            "Carro antigo.",
            "Dinheiro escondido."
        ],
        exemplos: [
            "“Aí tega, desce pro campinho.”",
            "“Chega mais, tega, vamo trocar ideia.”",
            "“Tá moscando aí, tega?”"
        ]
    },
    {
        giria: "Visão",
        certa: "Saudação ou confirmação (entendi).",
        erradas: [
            "Olhar com raiva.",
            "Dormir de olho aberto.",
            "Ficar de olho em alguém."
        ],
        exemplos: [
            "“Visão, tá marcado então.”",
            "“Firmeza? Visão.”",
            "“Visão de cria, confia.”"
        ]
    },
    {
        giria: "Brota",
        certa: "Chegar em algum lugar.",
        erradas: [
            "Comer devagar.",
            "Fazer fofoca.",
            "Ir dormir cedo."
        ],
        exemplos: [
            "“Brota no baile hoje.”",
            "“Brota logo que vai ser gastação.”",
            "“Já brotou geral lá.”"
        ]
    },
    {
        giria: "Não tem jeito",
        certa: "Algo inevitável, sem solução.",
        erradas: [
            "Ser teimoso.",
            "Ser fofoqueiro.",
            "Ser preguiçoso."
        ],
        exemplos: [
            "“Esse moleque é resenha, não tem jeito.”",
            "“Tá chovendo, não tem jeito.”",
            "“Já era, não tem jeito mais não.”"
        ]
    },
    {
        giria: "Gastação",
        certa: "Zoação, tirar sarro, brincar.",
        erradas: [
            "Guardar dinheiro.",
            "Correr rápido.",
            "Fazer exercício."
        ],
        exemplos: [
            "“Hoje foi gastação na escola.”",
            "“Ele é rei da gastação.”",
            "“Rolou gastação até não poder mais.”"
        ]
    }
];

let current = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function loadQuestion() {
    document.getElementById("feedback").innerText = "";
    const q = quizData[current];
    document.getElementById("question").innerText = `Você sabe o que significa "${q.giria}"?`;

    // Mostrar um exemplo aleatório:
    const exemploAleatorio = q.exemplos[Math.floor(Math.random() * q.exemplos.length)];
    document.getElementById("exemplo").innerText = `Exemplo: ${exemploAleatorio}`;

    const optionsList = document.getElementById("options");
    optionsList.innerHTML = "";

    const todasOpcoes = shuffle([q.certa, ...q.erradas]);

    todasOpcoes.forEach(opcao => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.innerHTML = `<button onclick="checkAnswer(this, '${q.certa.replace(/'/g, "\\'")}')">${opcao}</button>`;
        optionsList.appendChild(li);
    });
}

function checkAnswer(botao, respostaCerta) {
    const userAnswer = botao.innerText;

    if (userAnswer === respostaCerta) {
        document.getElementById("feedback").innerText = "✅ Resposta certa!";
        document.getElementById("feedback").style.color = "green";
    } else {
        document.getElementById("feedback").innerText = `❌ Errado! A resposta correta é: "${respostaCerta}"`;
        document.getElementById("feedback").style.color = "red";
    }

    // Desabilita os botões após responder
    const botoes = document.querySelectorAll("#options button");
    botoes.forEach(btn => btn.disabled = true);
}

function nextQuestion() {
    current++;
    if (current >= quizData.length) {
        document.getElementById("question").innerText = "Fim do quiz! 🎉";
        document.getElementById("exemplo").innerText = "";
        document.getElementById("options").innerHTML = "";
        document.getElementById("feedback").innerText = "";
        return;
    }
    loadQuestion();
}

window.onload = loadQuestion;

li.innerHTML = `<button class="btn btn-outline-primary w-100" onclick="checkAnswer(this, '${q.certa.replace(/'/g, "\\'")}')">${opcao}</button>`;

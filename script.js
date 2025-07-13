/* 
    Script de troca entre modos noturno ou claro
*/

const inputCheck = document.querySelector("#modo-noturno");
const tagBody = document.querySelector("body");


inputCheck.addEventListener("click", () => {
    const atual = tagBody.getAttribute("data-bs-theme");
    const novoTema = atual === 'light' ? 'dark' : 'light';

    tagBody.setAttribute('data-bs-theme', novoTema);
    localStorage.setItem("modoNoturno", novoTema);
});

/* Script para deixar o ano no rodapé sempre atualizado */
const footerAnoAtual = document.querySelector("#anoAtual");
const diaAtual = new Date;
console.log(diaAtual.getFullYear());
const anoAtualizado = (diaAtual.getFullYear()).toString();
// console.log(anoAtualizado);

footerAnoAtual.innerHTML += `<i class="bi bi-c-circle"></i> `;
footerAnoAtual.innerHTML += `<span class="c-year">${anoAtualizado}</span> Todos os direitos reservados. Nenhuma parte deste site pode
        ser reproduzida ou transmitida de qualquer forma ou por qualquer meio, incluindo fotocópia, gravação ou
        quaisquer sistemas de armazenamento e recuperação de informação.`;



window.addEventListener("load", () => {
    const atual = tagBody.getAttribute("data-bs-theme");

    if (!localStorage.getItem("modoNoturno")) {
        localStorage.setItem("modoNoturno", atual);
    } else {
        const valor = localStorage.getItem("modoNoturno");
        tagBody.setAttribute('data-bs-theme', valor);
    }
});

function adicionarComentario() {
    const nome = document.getElementById('nomeComentario').value.trim();
    const texto = document.getElementById('textoComentario').value.trim();

    if (!nome || !texto) {
        alert("Digite seu nome e o comentário!");
        return;
    }

    const accordion = document.querySelector('#accordionFlushExample');

    const novoIndex = accordion.querySelectorAll('.accordion-item').length + 1;

    const novoItem = document.createElement('div');
    novoItem.className = 'accordion-item';
    novoItem.innerHTML = `
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
        data-bs-target="#flush-collapse${novoIndex}" aria-expanded="false"
        aria-controls="flush-collapse${novoIndex}">
        Comentário: ${nome}
      </button>
    </h2>
    <div id="flush-collapse${novoIndex}" class="accordion-collapse collapse"
      data-bs-parent="#accordionFlushExample">
      <div class="accordion-body">${texto}</div>
    </div>
  `;

    accordion.appendChild(novoItem);

    // Fecha o Offcanvas usando Bootstrap
    const offcanvasElement = document.getElementById('offcanvasComentario');
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();

    // Limpa os campos
    document.getElementById('nomeComentario').value = '';
    document.getElementById('textoComentario').value = '';
}

document.getElementById('confirmarPlanner').addEventListener('click', () => {
    const faixaEtaria = document.getElementById('faixaEtaria').value;
    const perfil = document.getElementById('perfil').value;
    const interesses = document.getElementById('interesses').value;
    const destino = document.getElementById('destino').value;
    const orcamento = document.getElementById('orcamento').value;
    const companhia = document.getElementById('companhia').value;
    const transporte = document.getElementById('transporte').value;
    const frequencia = document.getElementById('frequencia').value;

    // Geração de um roteiro simples como exemplo
    let roteiro = `<h4>Roteiro Personalizado</h4>`;
    roteiro += `<p><strong>Faixa Etária:</strong> ${faixaEtaria}</p>`;
    roteiro += `<p><strong>Perfil:</strong> ${perfil}</p>`;
    roteiro += `<p><strong>Interesses:</strong> ${interesses}</p>`;
    roteiro += `<p><strong>Destino:</strong> ${destino}</p>`;
    roteiro += `<p><strong>Orçamento:</strong> ${orcamento}</p>`;
    roteiro += `<p><strong>Companhia:</strong> ${companhia}</p>`;
    roteiro += `<p><strong>Transporte:</strong> ${transporte}</p>`;
    roteiro += `<p><strong>Frequência:</strong> ${frequencia}</p>`;

    roteiro += `<h5>Sugestão de Roteiro</h5>`;

    if (perfil === "Aventureiro") {
        roteiro += `<p>Dia 1: Trilha no Parque Nacional da Tijuca e mirante.</p>
                  <p>Dia 2: Surf nas praias da Zona Oeste.</p>
                  <p>Dia 3: Passeio de barco na Costa Verde.</p>`;
    } else if (perfil === "Cultural") {
        roteiro += `<p>Dia 1: Museu do Amanhã + Centro Cultural Banco do Brasil.</p>
                  <p>Dia 2: Passeio pelo bairro Santa Teresa e Lapa.</p>
                  <p>Dia 3: Tour histórico na região do Centro.</p>`;
    } else if (perfil === "Tranquilo") {
        roteiro += `<p>Dia 1: Relaxar na Praia do Leblon.</p>
                  <p>Dia 2: Café e livrarias em Ipanema.</p>
                  <p>Dia 3: Jardim Botânico e Lagoa Rodrigo de Freitas.</p>`;
    } else if (perfil === "Curioso") {
        roteiro += `<p>Dia 1: Feira de São Cristóvão + Gastronomia Nordestina.</p>
                  <p>Dia 2: Visita a ateliês em Santa Teresa.</p>
                  <p>Dia 3: Passeio de VLT pelo Centro histórico.</p>`;
    } else if (perfil === "Planejado") {
        roteiro += `<p>Dia 1: City tour guiado completo na Zona Sul.</p>
                  <p>Dia 2: Bate-volta para a Região dos Lagos.</p>
                  <p>Dia 3: Visita organizada a pontos gastronômicos.</p>`;
    } else {
        roteiro += `<p>Personalize ainda mais suas preferências!</p>`;
    }

    document.getElementById('plannerGerado').innerHTML = roteiro;
    document.getElementById('resultadoPlanner').classList.remove('d-none');
});

document.getElementById('baixarPDF').addEventListener('click', () => {
    const elemento = document.getElementById('resultadoPlanner');
    html2pdf().from(elemento).save('planner-rj360.pdf');
});



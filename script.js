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



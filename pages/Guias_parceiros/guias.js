/* -------------------------------------
   Filtro de Passeios
-------------------------------------- */
const inputNomePasseio = document.querySelector('#search-name');
const selectTipoPasseio = document.querySelector('#search-type');
const selectValorPasseio = document.querySelector('#search-price');
const cardsPasseio = document.querySelectorAll('.card-item');
const mensagemNaoEncontrado = document.querySelector('#not-found');

function filtrarPasseios() {
  let encontrados = 0;

  const valorNome = inputNomePasseio.value.trim().toLowerCase();
  const valorTipo = selectTipoPasseio.value;
  const valorPreco = selectValorPasseio.value;

  cardsPasseio.forEach(card => {
    const nome = card.dataset.name.toLowerCase();
    const tipo = card.dataset.type;
    const preco = card.dataset.price;

    const nomeOk = nome.includes(valorNome);
    const tipoOk = !valorTipo || tipo === valorTipo;
    const precoOk = !valorPreco || preco === valorPreco;

    if (nomeOk && tipoOk && precoOk) {
      card.style.display = '';
      encontrados++;
    } else {
      card.style.display = 'none';
    }
  });

  mensagemNaoEncontrado.style.display = encontrados === 0 ? 'block' : 'none';
}

inputNomePasseio.addEventListener('keyup', filtrarPasseios);
selectTipoPasseio.addEventListener('change', filtrarPasseios);
selectValorPasseio.addEventListener('change', filtrarPasseios);
window.addEventListener('DOMContentLoaded', filtrarPasseios);


/* -------------------------------------
   Dados dos Passeios Fixos
-------------------------------------- */
const passeiosFixos = [
  {
    nome: "Trilha Pedra Bonita",
    desc: "Descubra a Trilha Pedra Bonita...",
    img: "../../assets/imagens/outras_fotos/Trilha_pedra_bonita - Copia.jpg",
    guia: `Guiado por João Silva...`
  },
  {
    nome: "Tour Histórico Centro",
    desc: "Embarque em uma viagem cultural...",
    img: "../../assets/imagens/outras_fotos/imagem_tour_centro.jpg",
    guia: `Guiado por Maria Souza...`
  },
  {
    nome: "Praia Secreta",
    desc: "Descubra a exclusividade da Praia Secreta...",
    img: "../../assets/imagens/outras_fotos/Praia-do-Secreto_img.jpg.webp",
    guia: `Guiado por Carlos Mendes...`
  }
];

/* -------------------------------------
   Modal com dados do passeio fixo
-------------------------------------- */
document.querySelectorAll('.btn-ver-mais').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const passeio = passeiosFixos[index];
    document.getElementById('modalPasseioLabel').textContent = passeio.nome;
    document.getElementById('modalDescricao').textContent = passeio.desc;
    document.getElementById('modalImagem').src = passeio.img;
    document.getElementById('modalGuiaInfo').innerHTML = passeio.guia;

    const favorito = JSON.parse(localStorage.getItem(`favorito-${passeio.nome}`)) || false;
    toggleFavoritoBtn(favorito);
  });
});

const btnFavoritarModal = document.getElementById('btnFavoritar');
btnFavoritarModal.addEventListener('click', () => {
  const nome = document.getElementById('modalPasseioLabel').textContent;
  const favorito = !(JSON.parse(localStorage.getItem(`favorito-${nome}`)) || false);
  localStorage.setItem(`favorito-${nome}`, favorito);
  toggleFavoritoBtn(favorito);
});

function toggleFavoritoBtn(favorito) {
  if (favorito) {
    btnFavoritarModal.classList.add('favorito');
  } else {
    btnFavoritarModal.classList.remove('favorito');
  }
}

document.getElementById('btnCompartilhar').addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado para a área de transferência!');
  });
});

document.getElementById('btnDenunciar').addEventListener('click', () => {
  alert('Obrigado por reportar. Vamos analisar sua denúncia!');
});

document.getElementById('btnComentar').addEventListener('click', () => {
  const modalComentario = new bootstrap.Modal(document.getElementById('modalComentario'));
  modalComentario.show();
});

document.getElementById('formComentario').addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nomeUsuario').value.trim();
  const comentario = document.getElementById('comentarioUsuario').value.trim();

  if (nome && comentario) {
    alert(`Obrigado pelo comentário, ${nome}!`);
    e.target.reset();
    bootstrap.Modal.getInstance(document.getElementById('modalComentario')).hide();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});


/* -------------------------------------
   Cadastro de Guia e Passeio
-------------------------------------- */
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0, resto;

  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}

const formGuia = document.getElementById('formGuia');
const formPasseio = document.getElementById('formPasseio');
const feedbackCadastro = document.getElementById('feedbackCadastro');

formGuia.addEventListener('submit', (e) => {
  e.preventDefault();
  const cpf = document.getElementById('cpf').value;
  if (!validarCPF(cpf)) {
    alert('CPF inválido!');
    return;
  }

  feedbackCadastro.classList.remove('d-none');
  formPasseio.classList.remove('d-none');

  window.scrollTo({
    top: feedbackCadastro.offsetTop,
    behavior: 'smooth'
  });
});

document.getElementById("formPasseio").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomePasseio").value;
  const tipo = document.getElementById("tipoPasseio").value;
  const valor = document.getElementById("valorPasseio").value;
  const descricaoPasseio = document.getElementById("descricaoPasseio").value;
  const descricaoGuia = document.getElementById("descricaoGuia").value;
  const foto = document.getElementById("fotoPasseio").files[0];

  if (!foto || foto.type !== "application/pdf") {
    alert("A foto do passeio deve ser um arquivo PDF!");
    return;
  }

  // Mostra feedback
  const feedback = document.getElementById("feedbackSucesso");
  feedback.classList.remove("d-none");

  // Cria card do passeio
  const lista = document.getElementById("listaPasseios");
  const card = document.createElement("div");
  card.className = "col";

  const pdfURL = URL.createObjectURL(foto);

  card.innerHTML = `
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">${nome}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${tipo} - R$ ${parseFloat(valor).toFixed(2)}</h6>
        <p class="card-text"><strong>Descrição do passeio:</strong> ${descricaoPasseio}</p>
        <p class="card-text"><strong>Descrição do guia:</strong> ${descricaoGuia}</p>
        <a href="${pdfURL}" target="_blank" class="btn btn-sm btn-secondary">Ver PDF</a>
      </div>
    </div>
  `;

  lista.appendChild(card);

  // Limpa formulário
  this.reset();
});

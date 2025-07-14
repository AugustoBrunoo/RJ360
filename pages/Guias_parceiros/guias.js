/* -------------------------------------
   Script de Filtro de Passeios na página Guias
-------------------------------------- */

// Filtro
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
   Dados dos Passeios
-------------------------------------- */

const passeios = [
  {
    nome: "Trilha Pedra Bonita",
    desc: `Descubra a Trilha Pedra Bonita, um dos passeios mais encantadores do Rio de Janeiro! Com um percurso de dificuldade moderada, essa trilha é perfeita para aventureiros de todos os níveis que desejam desfrutar de uma vista panorâmica espetacular da cidade, incluindo a famosa Pedra da Gávea e a costa azul do Atlântico. Nossa caminhada é guiada por João Silva, um montanhista profissional com mais de 15 anos de experiência, que garantirá sua segurança e compartilhará curiosidades incríveis sobre a natureza local e a história da região. Prepare-se para fotos inesquecíveis e um final de tarde mágico que vai ficar na memória!`
    ,
    img: "../../assets/imagens/outras_fotos/Trilha_pedra_bonita - Copia.jpg",
    guia: `Guiado por João Silva, montanhista profissional com mais de 15 anos de experiência, credenciado e conhecedor da região da Pedra da Gávea. João prioriza a segurança, oferece insights históricos e é um entusiasta da fotografia de aventura. 
Para contato: <a href="mailto:joao.silva@rj360.com" target="_blank">joao.silva@rj360.com</a> | <a href="tel:+5521999999999">+55 21 99999-9999</a>`
  },
  {
    nome: "Tour Histórico Centro",
    desc: `Embarque em uma viagem cultural pelo coração do Rio de Janeiro com nosso Tour Histórico Centro! Explore ruas repletas de histórias fascinantes, visite igrejas seculares, praças emblemáticas e monumentos que testemunharam séculos de transformação urbana e social. Sob a condução de Maria Souza, historiadora experiente e apaixonada, você vai descobrir segredos pouco conhecidos do período colonial, curiosidades do Império Brasileiro e a influência cultural que molda a cidade até hoje. Um passeio perfeito para amantes de história e cultura que desejam vivenciar o Rio com profundidade e autenticidade.`
    ,
    img: "../../assets/imagens/outras_fotos/imagem_tour_centro.jpg",
    guia: `Guiado por Maria Souza, historiadora formada pela UFRJ, especialista em História do Brasil Colonial, apaixonada por cultura e arquitetura. Maria oferece um olhar detalhado que transforma cada parada em uma aula viva.
Para contato: <a href="mailto:maria.souza@rj360.com" target="_blank">maria.souza@rj360.com</a> | <a href="tel:+5521988888888">+55 21 98888-8888</a>`
  },
  {
    nome: "Praia Secreta",
    desc: `Descubra a exclusividade da Praia Secreta, um paraíso escondido entre trilhas e costões intocados, ideal para quem busca tranquilidade e contato direto com a natureza. Este passeio oferece um refúgio perfeito longe dos roteiros turísticos tradicionais, com águas cristalinas e uma paisagem de tirar o fôlego. Carlos Mendes, nosso guia credenciado, conhece cada trilha e ponto especial dessa região, garantindo uma experiência segura, personalizada e sustentável. Aproveite para relaxar, nadar e apreciar um dia único em um cenário paradisíaco.`
    ,
    img: "../../assets/imagens/outras_fotos/Praia-do-Secreto_img.jpg.webp",
    guia: `Guiado por Carlos Mendes, guia credenciado com vasta experiência em praias isoladas do litoral carioca. Carlos domina rotas seguras, indica os melhores pontos para banho e piqueniques, e orienta sobre a preservação ambiental.
Para contato: <a href="mailto:carlos.mendes@rj360.com" target="_blank">carlos.mendes@rj360.com</a> | <a href="tel:+5521977777777">+55 21 97777-7777</a>`
  }
];



/* -------------------------------------
   Abrir Modal com dados dinâmicos
-------------------------------------- */

document.querySelectorAll('.btn-ver-mais').forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const passeio = passeios[index];

    document.getElementById('modalPasseioLabel').textContent = passeio.nome;
    document.getElementById('modalDescricao').textContent = passeio.desc;
    document.getElementById('modalImagem').src = passeio.img;
    document.getElementById('modalGuiaInfo').innerHTML = passeio.guia;

    const favorito = JSON.parse(localStorage.getItem(`favorito-${passeio.nome}`)) || false;
    toggleFavoritoBtn(favorito);
  });
});

const btnFavoritarModal = document.getElementById('btnFavoritar');
const btnCompartilhar = document.getElementById('btnCompartilhar');
const btnDenunciar = document.getElementById('btnDenunciar');
const btnComentar = document.getElementById('btnComentar');

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

btnCompartilhar.addEventListener('click', () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    alert('Link copiado para a área de transferência!');
  });
});

btnDenunciar.addEventListener('click', () => {
  alert('Obrigado por reportar. Vamos analisar sua denúncia!');
  // Aqui você pode enviar para backend no futuro.
});

// Abrir a nova modal de comentário
btnComentar.addEventListener('click', () => {
  const modalComentario = new bootstrap.Modal(document.getElementById('modalComentario'));
  modalComentario.show();
});

// Lidar com envio do comentário
const formComentario = document.getElementById('formComentario');

formComentario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nomeUsuario').value.trim();
  const comentario = document.getElementById('comentarioUsuario').value.trim();

  if (nome && comentario) {
    alert(`Obrigado pelo comentário, ${nome}!`);
    // Aqui você pode salvar no backend ou localStorage se quiser
    formComentario.reset();

    const modalComentario = bootstrap.Modal.getInstance(document.getElementById('modalComentario'));
    modalComentario.hide();
  } else {
    alert('Por favor, preencha todos os campos!');
  }
});



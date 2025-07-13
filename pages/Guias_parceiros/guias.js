/* -------------------------------------
   Script de Filtro de Passeios na página Guias
-------------------------------------- */

// Seleção dos elementos
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
      card.style.display = ''; // mostra
      encontrados++;
    } else {
      card.style.display = 'none'; // esconde
    }
  });

  if (encontrados === 0) {
    mensagemNaoEncontrado.style.display = 'block';
  } else {
    mensagemNaoEncontrado.style.display = 'none';
  }
}

// Adiciona event listeners uma única vez
inputNomePasseio.addEventListener('keyup', filtrarPasseios);
selectTipoPasseio.addEventListener('change', filtrarPasseios);
selectValorPasseio.addEventListener('change', filtrarPasseios);

// Executa filtro ao carregar página para mostrar todos inicialmente
window.addEventListener('DOMContentLoaded', filtrarPasseios);


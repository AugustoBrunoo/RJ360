document.addEventListener('DOMContentLoaded', function () {
    const botaoSair = document.getElementById('btn-sair');

    if (botaoSair) {
        botaoSair.addEventListener('click', function () {
            // Limpa o indicador de login
            localStorage.removeItem('mostrarPerfil');

            // Redireciona de volta para a página principal
            window.location.href = '../../index.html'; // ajuste o caminho se necessário
        });
    }
});

document.getElementById('confirmarRemocao').addEventListener('click', function () {
    // Remove a avaliação correta (ideal para versão dinâmica identificar o item certo)
    const accordionItem = document.querySelector('#avaliacao1'); // aqui pode variar se for dinâmico
    const itemPai = accordionItem.closest('.accordion-item');
    if (itemPai) itemPai.remove();

    // Fecha ambos os modais
    bootstrap.Modal.getInstance(document.getElementById('modalConfirmRemocao')).hide();
    bootstrap.Modal.getInstance(document.getElementById('modalReverAvaliacao')).hide();

    // Exibe toast de sucesso
    const toast = new bootstrap.Toast(document.getElementById('toastRemovido'));
    toast.show();
});

window.addEventListener("DOMContentLoaded", function () {
    const avaliacaoFeita = localStorage.getItem("avaliacaoEnviada");

    if (avaliacaoFeita === "true") {
        // Remove a classe d-none para mostrar o item
        const item = document.getElementById("itemAvaliacao1");
        if (item) {
            item.classList.remove("d-none");
        }

        // (Opcional) Limpa o localStorage para não repetir sempre
        localStorage.removeItem("avaliacaoEnviada");
    }
});

document.getElementById("btnOcultarAvaliacao").addEventListener("click", function () {
    const item = document.getElementById("itemAvaliacao1");
    if (item) {
        item.classList.add("d-none");
    }
});
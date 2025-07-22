document.addEventListener('DOMContentLoaded', function () {
    const botao = document.querySelector('#btn-entrar');
    if (!botao) return;

    botao.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.setItem('mostrarPerfil', 'true'); // só isso
        window.location.href = '../../index.html'; // ajuste o caminho conforme o seu
    });
});


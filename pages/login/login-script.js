document.addEventListener('DOMContentLoaded', function () {
    const botao = document.querySelector('#btn-entrar');
    if (!botao) return;

    botao.addEventListener('click', function (e) {
        e.preventDefault();

        // Armazena nome e sinal para o toast
        localStorage.setItem('usuarioNome', 'Joana');
        localStorage.setItem('mostrarToast', 'true');
        localStorage.setItem('mostrarPerfil', 'true'); // se for necessário

        // Redireciona para a home
        window.location.href = '../../index.html'; // ajuste conforme seu caminho
    });
});

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


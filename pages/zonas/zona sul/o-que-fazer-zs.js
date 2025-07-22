document.addEventListener("DOMContentLoaded", () => {
    const estrelas = document.querySelectorAll(".estrela");
    let avaliacaoSelecionada = 0;

    estrelas.forEach((estrela, index) => {
        estrela.addEventListener("mouseenter", () => {
            estrelas.forEach((_, i) => {
                estrelas[i].classList.toggle("hovered", i <= index);
            });
        });

        estrela.addEventListener("mouseleave", () => {
            estrelas.forEach((_, i) => {
                estrelas[i].classList.remove("hovered");
            });
        });

        estrela.addEventListener("click", () => {
            avaliacaoSelecionada = index + 1;
            estrelas.forEach((_, i) => {
                estrelas[i].classList.toggle("selecionada", i < avaliacaoSelecionada);
            });
            console.log(`Nota selecionada: ${avaliacaoSelecionada}`);
        });
    });
});

document.querySelector('.btn-primary').addEventListener('click', function () {
    const comentario = document.getElementById('comentarioUsuario').value.trim();
    if (!comentario) return;

    // Pegar estrela selecionada
    const estrelasSelecionadas = document.querySelector('input[name="stars"]:checked');
    const nota = estrelasSelecionadas ? parseInt(estrelasSelecionadas.value) : 0;

    // Data atual
    const data = new Date();
    const dataFormatada = data.toLocaleDateString('pt-BR');

    // Criar HTML do novo comentário
    const novoComentario = `
            <div class="d-flex mb-3">
                <img src="../../../assets/perfil/Joana.png" class="rounded-circle me-3"
                    width="50" height="50" alt="Joana Martins">
                <div>
                    <strong>Joana Martins</strong> <small class="text-muted"> - ${dataFormatada}</small>
                    <div class="text-warning mb-1">${'★'.repeat(nota)}${'☆'.repeat(5 - nota)}</div>
                    <p class="mb-0">${comentario}</p>
                </div>
            </div>
        `;

    // Inserir no container
    const container = document.getElementById('comentariosContainer');
    container.insertAdjacentHTML('beforeend', novoComentario);

    // Resetar o campo de comentário e estrelas
    document.getElementById('comentarioUsuario').value = '';
    if (estrelasSelecionadas) estrelasSelecionadas.checked = false;
});

document.addEventListener('DOMContentLoaded', function () {
    const botaoCurtir = document.getElementById('btnCurtir');

    botaoCurtir.addEventListener('click', function () {
        botaoCurtir.classList.toggle('curtido');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const btnEnviar = document.getElementById('btnEnviarComentario');
    const mensagemStatus = document.getElementById('mensagemStatus');

    btnEnviar.addEventListener('click', () => {
        const comentario = document.getElementById('comentarioUsuario').value.trim();
        const estrelasSelecionadas = document.querySelector('input[name="stars"]:checked');
        const nota = estrelasSelecionadas ? estrelasSelecionadas.value : null;

        // Limpar mensagens anteriores
        mensagemStatus.style.display = 'none';
        mensagemStatus.textContent = '';
        mensagemStatus.classList.remove('sucesso', 'erro');

        // Validação simples
        if (!comentario) {
            mostrarMensagem('Por favor, digite um comentário.', false);
            return;
        }

        if (!nota) {
            mostrarMensagem('Por favor, selecione uma avaliação por estrelas.', false);
            return;
        }

        // Aqui você pode enviar o comentário para backend (API) se quiser
        // Simular sucesso:
        mostrarMensagem('Comentário enviado com sucesso!', true);

        // Limpar campos
        document.getElementById('comentarioUsuario').value = '';
        estrelasSelecionadas.checked = false;

        // Opcional: atualizar a lista de comentários dinamicamente aqui

    });

    function mostrarMensagem(msg, sucesso) {
        mensagemStatus.textContent = msg;
        mensagemStatus.classList.add(sucesso ? 'sucesso' : 'erro');
        mensagemStatus.style.display = 'block';

        // Ocultar após 5 segundos
        setTimeout(() => {
            mensagemStatus.style.display = 'none';
        }, 5000);
    }
});

document.getElementById("btnEnviarComentario").addEventListener("click", function () {
    // Salva no localStorage uma flag dizendo que a avaliação foi enviada
    localStorage.setItem("avaliacaoEnviada", "true");
});

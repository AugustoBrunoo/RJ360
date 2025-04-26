/* 
    Script de troca entre modos noturno ou claro
*/

const inputCheck = document.querySelector("#modo-noturno");
const tagBody = document.querySelector("body");

inputCheck.addEventListener("click", () => {
    const atual = tagBody.getAttribute("data-bs-theme");
    const novoTema = atual === 'light' ? 'dark' : 'light';

    tagBody.setAttribute('data-bs-theme', novoTema);
});

/* Script para deixar o ano no rodapé sempre atualizado */
const footerAnoAtual = document.querySelector("#anoAtual");
const diaAtual = new Date;
console.log(diaAtual.getFullYear());
const anoAtualizado = (diaAtual.getFullYear()).toString();
console.log(anoAtualizado);
footerAnoAtual.innerHTML += `<i class="bi bi-c-circle"></i> `;
footerAnoAtual.innerHTML += `${anoAtualizado} Todos os direitos reservados. Nenhuma parte deste site pode
        ser reproduzida ou transmitida de qualquer forma ou por qualquer meio, incluindo fotocópia, gravação ou
        quaisquer sistemas de armazenamento e recuperação de informação.`;





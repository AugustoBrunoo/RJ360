
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-deluxe-link');
    const sections = document.querySelectorAll('.secao-deluxe');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Ativa a barra
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Mostra a section clicada
            const targetId = link.getAttribute('data-target');
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.remove('d-none');
                } else {
                    section.classList.add('d-none');
                }
            });

            // Scrolla para o topo do container principal
            document.querySelector('.rj360-deluxe').scrollIntoView({ behavior: 'smooth' });
        });
    });
});


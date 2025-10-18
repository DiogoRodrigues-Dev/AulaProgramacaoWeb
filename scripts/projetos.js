/* Este arquivo deve ser colocado em js/projetos.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleciona todos os botões de filtro e os cartões de projeto
    const botoesFiltro = document.querySelectorAll('.botao-filtro');
    const cardsProjeto = document.querySelectorAll('.projeto-card');

    // 2. Adiciona um ouvinte de evento de clique a cada botão
    botoesFiltro.forEach(botao => {
        botao.addEventListener('click', () => {
            // Obtém a categoria a ser filtrada do atributo 'data-filtro'
            const categoria = botao.getAttribute('data-filtro');

            // Remove a classe 'ativo' de todos os botões e adiciona ao botão clicado
            botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
            botao.classList.add('ativo');

            // Chama a função de filtragem
            filtrarProjetos(categoria);
        });
    });

    // 3. Função principal de filtragem
    function filtrarProjetos(categoriaSelecionada) {
        cardsProjeto.forEach(card => {
            // Obtém a categoria do cartão
            const categoriaCard = card.getAttribute('data-categoria');

            // Lógica de exibição/ocultação
            if (categoriaSelecionada === 'todos' || categoriaCard === categoriaSelecionada) {
                // Exibe o cartão (se for 'todos' ou a categoria corresponder)
                card.style.display = 'flex'; // Usando 'flex' pois é a estrutura que definimos no CSS
            } else {
                // Oculta o cartão
                card.style.display = 'none';
            }
            
            // Opcional: Efeito de scroll suave para o início da lista de projetos
            document.querySelector('.lista-projetos').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    // Opcional: Garantir que 'Todos os Projetos' esteja ativo e visível ao carregar a página
    // O filtro inicial já é feito no CSS com todos visíveis, mas a classe 'ativo' é importante.
    // O código acima garante que o primeiro botão tenha a classe 'ativo' no carregamento se você remover do HTML.
});
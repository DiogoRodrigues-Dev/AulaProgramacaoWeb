document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // LÓGICA DE ABAS (TABS)
    // ----------------------------------------------------

    function showTab(tabId, clickedButton) {
        // Esconde todos os conteúdos de aba
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        // Remove o estado 'ativo' de todos os botões de aba
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        // Mostra o conteúdo da aba alvo
        const targetTab = document.getElementById(tabId + '-tab');
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        // Ativa o botão clicado
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
    }

    // Configura o evento de clique nos botões de aba
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const tabId = event.target.getAttribute('data-tab');
            if (tabId) {
                showTab(tabId, event.target);
            }
        });
    });

    // ----------------------------------------------------
    // LÓGICA DE SELEÇÃO RÁPIDA DE VALORES DE DOAÇÃO
    // ----------------------------------------------------
    document.querySelectorAll('.opcoes-rapidas button').forEach(button => {
        button.type = "button"; // Evita submit acidental
        button.addEventListener('click', () => {
            const parent = button.closest('.opcoes-rapidas');
            parent.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('selecionado');
            });

            button.classList.add('selecionado');

            // Atualiza o input de valor, se existir
            const valorNumerico = button.dataset.valor;
            const inputValor = parent.parentElement.querySelector('input[type="number"]');
            if (inputValor && valorNumerico) {
                inputValor.value = valorNumerico;
                inputValor.focus();
            }

            // Efeito sonoro sutil (opcional)
            const clickSound = new Audio('https://assets.mixkit.co/sfx/download/mixkit-select-click-1109.wav');
            clickSound.volume = 0.2;
            clickSound.play();
        });
    });

    // ----------------------------------------------------
    // INICIALIZAÇÃO
    // ----------------------------------------------------

    // Garante que a aba "Doação Financeira" (doacao) inicie ativa ao carregar a página
    const initialTabButton = document.querySelector('[data-tab="doacao"]');
    if (initialTabButton) {
        showTab('doacao', initialTabButton);
    }
});

// /scripts/transparencia.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. DADOS DE SIMULAÇÃO (KPIs)
    const dadosKPIs = {
        doacoes: 452890.50, // Total Arrecadado
        beneficiarios: 1250, // Pessoas Beneficiadas
        voluntarios: 185,    // Voluntários Ativos
        projetos: 15         // Projetos
    };

    // 2. FUNÇÃO PARA FORMATAR NÚMEROS
    function formatarValor(valor, tipo = 'numerico') {
        if (tipo === 'monetario') {
            return 'R$ ' + valor.toFixed(2).replace('.', ',');
        }
        return valor.toLocaleString('pt-BR');
    }

    // 3. PREENCHER OS KPIS NA TELA
    document.getElementById('valor-doacoes').textContent = formatarValor(dadosKPIs.doacoes, 'monetario');
    document.getElementById('valor-beneficiarios').textContent = formatarValor(dadosKPIs.beneficiarios);
    document.getElementById('valor-voluntarios').textContent = formatarValor(dadosKPIs.voluntarios);
    document.getElementById('valor-projetos').textContent = formatarValor(dadosKPIs.projetos);

    // 4. CONFIGURAÇÃO E CRIAÇÃO DO GRÁFICO (Chart.js)
    
 
    const dadosGrafico = {
        labels: ['Projetos Sociais', 'Custos Operacionais', 'Fundo de Reserva'],
        datasets: [{
            data: [80, 15, 5],
            backgroundColor: [
                '#34d399',
                '#f59e0b',
                '#2563eb'
            ],
            hoverOffset: 10
        }]
    };

    const config = {
        type: 'doughnut',
        data: dadosGrafico,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed + '%';
                            }
                            return label;
                        }
                    }
                }
            }
        },
    };

    const ctx = document.getElementById('grafico-fundos');
    if (ctx) {
        new Chart(ctx, config);
    }
});
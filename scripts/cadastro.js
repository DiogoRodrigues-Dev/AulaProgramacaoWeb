document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. LÓGICA DE ABAS (TABS)
    // ----------------------------------------------------

    function showTab(tabId, clickedButton) {
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.add('hidden');
        });

        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });

        const targetTab = document.getElementById(tabId + '-tab');
        if (targetTab) {
            targetTab.classList.remove('hidden');
        }

        if (clickedButton) {
            clickedButton.classList.add('active');
        }
    }
    
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const tabId = event.target.getAttribute('data-tab');
            if (tabId) {
                showTab(tabId, event.target);
            }
        });
    });


    // ----------------------------------------------------
    // 2. IMPLEMENTAÇÃO DE MÁSCARAS
    // ----------------------------------------------------

    function applyMask(input, maskPattern) {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            let formatted = '';
            let k = 0;

            for (let i = 0; i < maskPattern.length && k < value.length; i++) {
                if (maskPattern[i] === '9') {
                    formatted += value[k++];
                } else if (value.length > k) {
                    formatted += maskPattern[i];
                }
            }

            e.target.value = formatted;
        });
    }

    const masks = {
        'pessoa_cpf': '999.999.999-99',
        'pessoa_telefone': '(99) 99999-9999',
        'ong_telefone': '(99) 99999-9999',
        'pessoa_cep': '99999-999',
        'ong_cep': '99999-999',
        'ong_cnpj': '99.999.999/9999-99'
    };

    for (const id in masks) {
        const input = document.getElementById(id);
        if (input) {
            applyMask(input, masks[id]);
        }
    }
    
    // ----------------------------------------------------
    // 3. BUSCA AUTOMÁTICA DE CEP (ViaCEP)
    // ----------------------------------------------------

    function limparCamposEndereco(prefixo) {
        document.getElementById(`${prefixo}_endereco`).value = '';
        document.getElementById(`${prefixo}_bairro`).value = '';
        document.getElementById(`${prefixo}_cidade`).value = '';
        document.getElementById(`${prefixo}_estado`).value = '';
        document.getElementById(`${prefixo}_numero`).value = '';
        document.getElementById(`${prefixo}_complemento`).value = '';
        document.getElementById(`${prefixo}_endereco`).focus();
    }

    function buscaCep(event) {
        const campoCEP = event.target;
        const prefixo = campoCEP.id.split('_')[0];
        const cep = campoCEP.value.replace(/\D/g, ''); 

        if (cep.length !== 8) {
            limparCamposEndereco(prefixo);
            return;
        }
        
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição da API ViaCEP');
                }
                return response.json();
            })
            .then(data => {
                if (data.erro) {
                    alert('CEP não encontrado. Por favor, preencha o endereço manualmente.');
                    limparCamposEndereco(prefixo);
                    return;
                }

                document.getElementById(`${prefixo}_endereco`).value = data.logradouro || '';
                document.getElementById(`${prefixo}_bairro`).value = data.bairro || '';
                document.getElementById(`${prefixo}_cidade`).value = data.localidade || '';
                document.getElementById(`${prefixo}_estado`).value = data.uf || '';
                
                document.getElementById(`${prefixo}_numero`).focus();
            })
            .catch(error => {
                console.error(`Erro ao buscar CEP (${prefixo}):`, error);
                alert('Ocorreu um erro ao buscar o CEP. Por favor, tente novamente ou preencha manualmente.');
                limparCamposEndereco(prefixo);
            });
    }

    const cepONG = document.getElementById('ong_cep');
    const cepPessoa = document.getElementById('pessoa_cep');
    
    if (cepONG) {
        cepONG.addEventListener('blur', buscaCep);
    }
    if (cepPessoa) {
        cepPessoa.addEventListener('blur', buscaCep);
    }
});
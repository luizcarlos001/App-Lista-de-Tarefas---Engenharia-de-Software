// PADRÃO STRATEGY: Define o comportamento/estilo baseado no status
const StatusStrategy = {
    "Disponível": { cor: "#6c757d", label: "Pendente" },
    "Fazendo": { cor: "#007bff", label: "Em Andamento" },
    "Feita": { cor: "#28a745", label: "Concluída" }
};

// PADRÃO SINGLETON: Garante apenas uma instância do gerenciador de dados
const GerenciadorDados = (function() {
    let instancia;

    function criar() {
        const KEY = 'tarefas_projeto';
        
        return {
            getDados: function() {
                const dados = localStorage.getItem(KEY);
                return dados ? JSON.parse(dados) : [];
            },
            salvar: function(tarefa) {
                const tarefas = this.getDados();
                tarefas.push(tarefa);
                localStorage.setItem(KEY, JSON.stringify(tarefas));
            },
            remover: function(index) {
                const tarefas = this.getDados();
                tarefas.splice(index, 1);
                localStorage.setItem(KEY, JSON.stringify(tarefas));
            },
            atualizarStatus: function(index, novoStatus) {
                const tarefas = this.getDados();
                tarefas[index].status = novoStatus;
                localStorage.setItem(KEY, JSON.stringify(tarefas));
            }

        };
    }

    return {
        getInstancia: function() {
            if (!instancia) instancia = criar();
            return instancia;
        }
    };
})();

const App = {
    render: function() {
        const container = document.getElementById('lista');
        const tarefas = GerenciadorDados.getInstancia().getDados();
        
        // Uso de map para criar o HTML de forma mais limpa
        container.innerHTML = tarefas.map(t => {
            const config = StatusStrategy[t.status];
            return `
                <div class="tarefa-item" style="border-left-color: ${config.cor}">
                    <strong style="color: ${config.cor}">${t.nome}</strong> 
                    <p style="margin: 5px 0;">${t.desc}</p>
                    <small>Status: <b>${config.label}</b></small>
                </div>
            `;
        }).join('');
    },

    cadastrar: function() {
        const inputNome = document.getElementById('nome');
        const inputDesc = document.getElementById('desc');
        const inputStatus = document.getElementById('status');

        if (inputNome.value.trim() === '') {
            alert("Digite o nome da tarefa!");
            return;
        }

        const novaTarefa = { 
            nome: inputNome.value, 
            desc: inputDesc.value, 
            status: inputStatus.value 
        };

        GerenciadorDados.getInstancia().salvar(novaTarefa);
        this.render();

        // Limpa os campos
        inputNome.value = '';
        inputDesc.value = '';
    }
};

// Inicialização
window.onload = () => App.render();
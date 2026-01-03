const StatusStrategy = {
    "Disponível": { cor: "gray" },
    "Fazendo": { cor: "blue" },
    "Feita": { cor: "green" }
};

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
        container.innerHTML = '';

        tarefas.forEach(t => {
            const config = StatusStrategy[t.status];
            container.innerHTML += `
                <div style="border-bottom: 1px solid #ccc; padding: 5px;">
                    <b style="color: ${config.cor}">${t.nome}</b> - ${t.desc} [${t.status}]
                </div>
            `;
        });
    },

    cadastrar: function() {
        const nome = document.getElementById('nome').value;
        const desc = document.getElementById('desc').value;
        const status = document.getElementById('status').value;

        if (nome) {
            GerenciadorDados.getInstancia().salvar({ nome, desc, status });
            this.render();
            document.getElementById('nome').value = '';
            document.getElementById('desc').value = '';
        }
    }
};

window.onload = () => App.render();
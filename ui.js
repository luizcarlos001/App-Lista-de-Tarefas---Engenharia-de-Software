function atualizarInterface() {
    const listaHtml = document.getElementById('listaTarefas');
    listaHtml.innerHTML = '';

    bancoDeDados.tarefas.forEach(tarefa => {
        const div = document.createElement('div');
        div.className = `tarefa-card status-${tarefa.status}`;
        div.innerHTML = `
            <div>
                <strong>${tarefa.nome}</strong> - <small>${tarefa.status}</small><br>
                <span>${tarefa.descricao}</span>
            </div>
            <div>
                <select onchange="alterarStatusTarefa(${tarefa.id}, this.value)">
                    <option value="Disponível" ${tarefa.status === 'Disponível' ? 'selected' : ''}>Disponível</option>
                    <option value="Fazendo" ${tarefa.status === 'Fazendo' ? 'selected' : ''}>Fazendo</option>
                    <option value="Feita" ${tarefa.status === 'Feita' ? 'selected' : ''}>Feita</option>
                </select>
                <button onclick="removerTarefa(${tarefa.id})">Excluir</button>
            </div>
        `;
        listaHtml.appendChild(div);
    });
}

function adicionarPelaUi() {
    const nome = document.getElementById('inputNome').value;
    const desc = document.getElementById('inputDesc').value;

    if (nome) {
        bancoDeDados.adicionar(nome, desc);
        atualizarInterface();
        document.getElementById('inputNome').value = '';
        document.getElementById('inputDesc').value = '';
    }
}

function removerTarefa(id) {
    bancoDeDados.remover(id);
    atualizarInterface();
}

function alterStatusTarefa(id, novoStatus) {
    const tarefa = bancoDeDados.tarefas.find(t => t.id === id);
    if (tarefa) {
        EstrategiasStatus[novoStatus](tarefa); 
        atualizarInterface();
    }
}
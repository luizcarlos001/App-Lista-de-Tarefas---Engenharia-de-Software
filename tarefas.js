// PADRÃO SINGLETON
class ListaTarefas {
    constructor() {
        if (ListaTarefas.instancia) {
            return ListaTarefas.instancia;
        }
        this.tarefas = [];
        ListaTarefas.instancia = this;
    }

    adicionar(nome, descricao) {
        const novaTarefa = {
            id: Date.now(),
            nome,
            descricao,
            status: "Disponível"
        };
        this.tarefas.push(novaTarefa);
        return novaTarefa;
    }

    remover(id) {
        this.tarefas = this.tarefas.filter(t => t.id !== id);
    }
}

// PADRÃO STRATEGY 
const EstrategiasStatus = {
    "Disponível": (tarefa) => tarefa.status = "Disponível",
    "Fazendo":    (tarefa) => tarefa.status = "Fazendo",
    "Feita":      (tarefa) => tarefa.status = "Feita"
};

const bancoDeDados = new ListaTarefas();
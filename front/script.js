const apiUrl = 'http://localhost:3000/api/alunos';

document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const alunoTable = document.getElementById('alunoTable').getElementsByTagName('tbody')[0];

    alunoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('alunoId').value;
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const matricula = document.getElementById('matricula').value;

        const aluno = { nome, idade, matricula };

        if (id) {
            await updateAluno(id, aluno);
        } else {
            await createAluno(aluno);
        }

        alunoForm.reset();
        loadAlunos();
    });

    async function loadAlunos() {
        const response = await fetch(apiUrl);
        const alunos = await response.json();
        alunoTable.innerHTML = '';
        alunos.forEach(aluno => {
            const row = alunoTable.insertRow();
            row.insertCell(0).textContent = aluno.id;
            row.insertCell(1).textContent = aluno.nome;
            row.insertCell(2).textContent = aluno.idade;
            row.insertCell(3).textContent = aluno.matricula;
            const actionsCell = row.insertCell(4);
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => editAluno(aluno);
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.onclick = () => deleteAluno(aluno.id);
            actionsCell.appendChild(deleteButton);
        });
    }

    async function createAluno(aluno) {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
    }

    async function updateAluno(id, aluno) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
    }

    async function deleteAluno(id) {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        loadAlunos();
    }

    function editAluno(aluno) {
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('matricula').value = aluno.matricula;
    }

    loadAlunos();
});
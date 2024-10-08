const apiUrl = 'http://localhost:3000/api/alunos';

document.addEventListener('DOMContentLoaded', () => {
    const alunoForm = document.getElementById('alunoForm');
    const alunoTable = document.getElementById('alunoTable').getElementsByTagName('tbody')[0];
    const searchButton = document.getElementById('searchButton');
    const searchMatricula = document.getElementById('searchMatricula');
    const listAllButton = document.getElementById('listAllButton');
    const addAlunoButton = document.getElementById('addAlunoButton');
    const cancelButton = document.getElementById('cancelButton');
    const errorMessage = document.getElementById('errorMessage');

    alunoForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('alunoId').value;
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const matricula = document.getElementById('matricula').value;
        const email = document.getElementById('email').value;

        const aluno = { nome, idade, matricula, email };

        if (id) {
            await updateAluno(id, aluno);
        } else {
            await createAluno(aluno);
        }

        alunoForm.reset();
        alunoForm.style.display = 'none';
        loadAlunos();
    });

    searchButton.addEventListener('click', async () => {
        const matricula = searchMatricula.value;
        if (matricula && !isNaN(matricula)) {
            await searchAlunoByMatricula(matricula);
        } else {
            errorMessage.textContent = 'Por favor, insira um número válido para a matrícula.';
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    });

    listAllButton.addEventListener('click', async () => {
        await loadAlunos();
    });

    addAlunoButton.addEventListener('click', () => {
        document.getElementById('alunoForm').style.display = 'block';
        document.getElementById('alunoForm').reset(); // Reseta o formulário para adicionar um novo aluno
        document.getElementById('alunoId').value = ''; // Limpa o campo oculto de ID
    });

    cancelButton.addEventListener('click', () => {
        alunoForm.reset();
        alunoForm.style.display = 'none';
    });

    async function loadAlunos() {
        try {
            const response = await fetch(apiUrl);
            const alunos = await response.json();
            alunoTable.innerHTML = '';
            alunos.forEach(aluno => {
                const row = alunoTable.insertRow();
                row.insertCell(0).textContent = aluno.id;
                row.insertCell(1).textContent = aluno.nome;
                row.insertCell(2).textContent = aluno.idade;
                row.insertCell(3).textContent = aluno.matricula;
                row.insertCell(4).textContent = aluno.email;
                const actionsCell = row.insertCell(5);
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.className = 'btn-edit';
                editButton.onclick = () => editAluno(aluno);
                actionsCell.appendChild(editButton);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.className = 'btn-delete';
                deleteButton.onclick = () => deleteAluno(aluno.id);
                actionsCell.appendChild(deleteButton);
            });
        } catch (error) {
            console.error(`Error loading alunos: ${error.message}`);
        }
    }
    async function createAluno(aluno) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(aluno)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            errorMessage.style.display = 'none'; // Esconde a mensagem de erro se a criação for bem-sucedida
        } catch (error) {
            // errorMessage.textContent = `Erro ao criar aluno: ${error.message}`;
            errorMessage.style.display = 'block'; // Exibe a mensagem de erro
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 5000);
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

    async function searchAlunoByMatricula(matricula) {
        try {
            const response = await fetch(`${apiUrl}/matricula/${matricula}`);
            if (!response.ok) {
                throw new Error('Matrícula não encontrada');
            }
            const aluno = await response.json();
            alunoTable.innerHTML = '';
            if (aluno) {
                const row = alunoTable.insertRow();
                row.insertCell(0).textContent = aluno.id;
                row.insertCell(1).textContent = aluno.nome;
                row.insertCell(2).textContent = aluno.idade;
                row.insertCell(3).textContent = aluno.matricula;
                row.insertCell(4).textContent = aluno.email;
                const actionsCell = row.insertCell(5);
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.className = 'btn-edit';
                editButton.onclick = () => editAluno(aluno);
                actionsCell.appendChild(editButton);
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Excluir';
                deleteButton.className = 'btn-delete';
                deleteButton.onclick = () => deleteAluno(aluno.id);
                actionsCell.appendChild(deleteButton);
            }
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
            setTimeout(() => {
                errorMessage.style.display = 'none';
            }, 5000);
        }
    }
    function editAluno(aluno) {
        document.getElementById('alunoId').value = aluno.id;
        document.getElementById('nome').value = aluno.nome;
        document.getElementById('idade').value = aluno.idade;
        document.getElementById('matricula').value = aluno.matricula;
        document.getElementById('email').value = aluno.email;
        document.getElementById('alunoForm').style.display = 'block'; // Exibe o formulário de edição
    }

    loadAlunos();
});
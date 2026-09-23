import { escapeHtml, validarAnoFilme } from './src/utils.js';

// Seleção de Elementos
const movieForm = document.getElementById('movieForm');
const movieIdInput = document.getElementById('movieId');
const movieNameInput = document.getElementById('movieName');
const movieYearInput = document.getElementById('movieYear');
const movieList = document.getElementById('movieList');
const btnSubmit = document.getElementById('btnSubmit');
const btnCancel = document.getElementById('btnCancel');

// Estado da aplicação (carrega do localStorage ou inicia vazio)
let movies = JSON.parse(localStorage.getItem('my_movies')) || [];

// Função para salvar no localStorage
function saveToLocalStorage() {
  localStorage.setItem('my_movies', JSON.stringify(movies));
}

// Renderizar a lista na tela
function renderMovies() {
  movieList.innerHTML = '';

  if (movies.length === 0) {
    movieList.innerHTML = `<li class="empty-message">Nenhum filme cadastrado ainda.</li>`;
    return;
  }

  movies.forEach((movie) => {
    const li = document.createElement('li');
    li.className = 'movie-item';

    li.innerHTML = `
              <div class="movie-info">
                  <h3>${escapeHtml(movie.name)}</h3>
                  <span>Ano: ${(movie.year)}</span>
              </div>
              <div class="movie-actions">
                  <button class="btn-edit" onclick="editMovie('${
                    movie.id
                  }')">Editar</button>
                  <button class="btn-delete" onclick="deleteMovie('${
                    movie.id
                  }')">Excluir</button>
              </div>
          `;
    movieList.appendChild(li);
  });
}

// Adicionar ou Atualizar Filme
movieForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const id = movieIdInput.value;
  const name = movieNameInput.value.trim();
  const year = movieYearInput.value.trim();

  if (!name || !validarAnoFilme(year)) {
    // alert("Ano Invalido!")
    return;
  }

  if (id) {
    // Editando filme existente
    movies = movies.map((movie) => {
      if (movie.id === id) {
        return { ...movie, name, year };
      }
      return movie;
    });
    resetForm();
  } else {
    // Criando novo filme
    const newMovie = {
      id: Date.now().toString(), // ID único baseado no timestamp
      name,
      year,
    };
    movies.push(newMovie);
  }

  saveToLocalStorage();
  renderMovies();
  movieForm.reset();
});

// Carregar dados para edição
window.editMovie = function (id) {
  const movieToEdit = movies.find((movie) => movie.id === id);
  if (!movieToEdit) return;

  movieIdInput.value = movieToEdit.id;
  movieNameInput.value = movieToEdit.name;
  movieYearInput.value = movieToEdit.year;

  btnSubmit.textContent = 'Salvar Alterações';
  btnCancel.style.display = 'block';
  movieNameInput.focus();
};

// Cancelar Edição
btnCancel.addEventListener('click', function () {
  resetForm();
  movieForm.reset();
});

// Excluir Filme
window.deleteMovie = function (id) {
  if (confirm('Tem certeza que deseja remover este filme?')) {
    movies = movies.filter((movie) => movie.id !== id);
    saveToLocalStorage();
    renderMovies();

    // Se estiver editando o filme que acabou de ser excluído, reseta o form
    if (movieIdInput.value === id) {
      resetForm();
      movieForm.reset();
    }
  }
};

// Resetar formulário para o estado padrão de cadastro
function resetForm() {
  movieIdInput.value = '';
  btnSubmit.textContent = 'Adicionar Filme';
  btnCancel.style.display = 'none';
}

// Prevenção básica de XSS para nomes de filmes inseridos
// function escapeHtml(text) {
//   const map = {
//     '&': '&amp;',
//     '<': '&lt;',
//     '>': '&gt;',
//     '"': '&quot;',
//     "'": '&#039;',
//   };
//   return text.replace(/[&<>"']/g, function (m) {
//     return map[m];
//   });
// }

// Carga inicial
renderMovies();

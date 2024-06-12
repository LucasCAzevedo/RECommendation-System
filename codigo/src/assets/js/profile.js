document.addEventListener('DOMContentLoaded', () => {
  const nome = document.querySelector('#nome');
  const usuario = document.querySelector('#usuario');
  const senha = document.querySelector('#senha');
  const labelNome = document.querySelector('#labelNome');
  const labelUsuario = document.querySelector('#labelUsuario');
  const labelSenha = document.querySelector('#labelSenha');
  const msgSuccess = document.querySelector('#msgSuccess');

  const userLogado = JSON.parse(localStorage.getItem('userLogado'));

  nome.value = userLogado.nome;
  usuario.value = userLogado.user;
  senha.value = userLogado.senha;
});

function atualizarPerfil() {
  const nome = document.querySelector('#nome');
  const usuario = document.querySelector('#usuario');
  const senha = document.querySelector('#senha');
  const labelNome = document.querySelector('#labelNome');
  const labelUsuario = document.querySelector('#labelUsuario');
  const labelSenha = document.querySelector('#labelSenha');
  const msgSuccess = document.querySelector('#msgSuccess');

  if (nome.value && usuario.value && senha.value) {
    const userLogado = JSON.parse(localStorage.getItem('userLogado'));
    userLogado.nome = nome.value;
    userLogado.user = usuario.value;
    userLogado.senha = senha.value;
    localStorage.setItem('userLogado', JSON.stringify(userLogado));

    const listaDeUsuarios = JSON.parse(localStorage.getItem('listaDeUsuarios'));
    const usuarioIndex = listaDeUsuarios.findIndex((user) => user.user === userLogado.user);
    if (usuarioIndex !== -1) {
      listaDeUsuarios[usuarioIndex] = userLogado;
      localStorage.setItem('listaDeUsuarios', JSON.stringify(listaDeUsuarios));
    }

    const userInfoNome = document.getElementById('userInfoNome');
    const userInfoUsuario = document.getElementById('userInfoUsuario');
    userInfoNome.textContent = userLogado.nome;
    userInfoUsuario.textContent = userLogado.user;

    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Perfil atualizado com sucesso!</strong>';
  } else {
    msgSuccess.style.display = 'block';
    msgSuccess.innerHTML = '<strong>Preencha todos os campos corretamente antes de atualizar o perfil.</strong>';
  }
}

var botao = document.getElementById('sairButton');

botao.addEventListener('click', function() {
    window.location.href = 'index.html';
});

const cadastroButton = document.querySelector('#cadastroButton');
cadastroButton.addEventListener('click', function () {
  window.location.href = 'inicial.html';
});
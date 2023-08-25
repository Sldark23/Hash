const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configurações - Substitua com suas informações
const usuarioGitHub = 'seuusuario';
const repositorioGitHub = 'seurepositorio';
const versaoAtual = 'versao_atual';

function exibirTelaDeInicio() {
  console.log('Bem-vindo ao Meu Sistema');
  console.log('Pressione Enter para verificar atualizações...');
}

function verificarAtualizacao() {
  console.log('Verificando atualizações no GitHub...');

  axios
    .get(`https://api.github.com/repos/${usuarioGitHub}/${repositorioGitHub}/releases/latest`)
    .then((response) => {
      const latestVersion = response.data.tag_name;
      console.log('Última versão disponível: ' + latestVersion);

      if (latestVersion !== versaoAtual) {
        console.log('Uma nova atualização está disponível! Faça o download em: https://github.com/${usuarioGitHub}/${repositorioGitHub}');
      } else {
        console.log('Você está usando a versão mais recente.');
      }
      rl.close();
    })
    .catch((error) => {
      console.error('Erro ao verificar atualizações:', error.message);
      rl.close();
    });
}

exibirTelaDeInicio();
rl.once('line', () => {
  verificarAtualizacao();
});

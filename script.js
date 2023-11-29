var listaDoadores = [];
var id = 1;

function addDoador(name, cpf, email, data, cep, rua, numero, complemento, bairro, cidade, estado, ong, doar){
    var novoDoador = {id: id++, name: name, cpf: cpf, email: email, data: data, cep: cep, rua: rua, numero: numero, complemento: complemento, bairro: bairro, cidade: cidade, estado: estado, ong: ong, doar: doar};
    listaDoadores.push(novoDoador);
    localStorage.setItem('listaDoadores', JSON.stringify(listaDoadores));
    criarListaDoadores();
}

function getListaDoadores() {
  var storedList = JSON.parse(localStorage.getItem('listaDoadores')); 
  listaDoadores = storedList || []; 
}

function criarListaDoadores() {
  var listaDoadoresElement = document.getElementById('listaDoadores');
  listaDoadoresElement.innerHTML = '';

  listaDoadores.forEach(function (doador) {
    var listItem = document.createElement('li');
    let data = new Date();
    let dia = data.getDate();
    let mes = data.getMonth() + 1;
    let ano = data.getFullYear();
    var dataFormatada = (dia < 10 ? '0' : '') + dia + '/' + (mes< 10 ? '0' : '') + mes + '/' + ano;
    listItem.innerHTML = '<span class="doador-name">' + doador.name + '</span> ajudou ' + doador.ong + '<span class="data"> em ' + dataFormatada + '</span><span class="delete-button" onclick="excluiDoador(' + doador.id + ')">\u00D7</span>';

    listaDoadoresElement.appendChild(listItem);
  });
}

getListaDoadores()

criarListaDoadores()

document.getElementById("doacao").addEventListener('submit', function(event) {
    event.preventDefault();
    var nameInput = document.getElementById('nameInput');
    var cpfInput = document.getElementById('cpfInput');
    var emailInput = document.getElementById('emailInput');
    var dataInput = document.getElementById('dataInput');
    var cepInput = document.getElementById('cepInput');
    var ruaInput = document.getElementById('ruaInput');
    var numeroInput = document.getElementById('numeroInput');
    var complementoInput = document.getElementById('complementoInput');
    var bairroInput = document.getElementById('bairroInput');
    var cidadeInput = document.getElementById('cidadeInput');
    var estadoInput = document.getElementById('estadoInput');
    var ongSelecionada = document.querySelector('input[name="ong"]:checked').value;
    var doarBoxes = document.querySelectorAll('input[name="doar"]:checked');
    var doacoes = [];
    doarBoxes.forEach(function(checkbox) {
        doacoes.push(checkbox.value);
    });

    if (nameInput.value.length == 0) {
      alert('Informe um nome');
    } else if (cpfInput.value.length == 0) {
      alert('Informe um CPF');
    } else if (emailInput.value.length == 0) {
      alert('Informe um e-mail');
    } else if (dataInput.value.length == 0) {
      alert('Informe uma data de nascimento');
    } else if (cepInput.value.length == 0) {
      alert('Informe um CEP');
    } else if (ruaInput.value.length == 0) {
      alert('Informe uma rua');
    } else if (numeroInput.value.length == 0) {
      alert('Informe um número');
    } else if (bairroInput.value.length == 0) {
      alert('Informe um bairro');
    } else if (cidadeInput.value.length == 0) {
      alert('Informe uma cidade');
    } else if (estadoInput.value.length == 0) {
      alert('Informe um estado');
    } else {

      addDoador(nameInput.value, cpfInput.value, emailInput.value, dataInput.value, cepInput.value, ruaInput.value, numeroInput.value, complementoInput.value, bairroInput.value, cidadeInput.value, estadoInput.value, ongSelecionada, doacoes);
      nameInput.value = '';
      cpfInput.value = '';
      emailInput.value = '';
      dataInput.value = '';
      cepInput.value = '';
      ruaInput.value = '';
      numeroInput.value = '';
      complementoInput.value = '';
      bairroInput.value = '';
      cidadeInput.value = '';
      estadoInput.value = '';
      document.getElementById('ong1').checked = false;
      document.getElementById('ong2').checked = false;
      document.getElementById('ong3').checked = false;
      document.getElementById('doacao1').checked = false;
      document.getElementById('doacao2').checked = false;

}});

function excluiDoador(doadorId) {
  var listaDoadoresAtual = listaDoadores.filter(function (doador) {
    return doador.id !== doadorId;
  });

  if(listaDoadoresAtual.length < listaDoadores.length) {
    listaDoadores = listaDoadoresAtual;
    localStorage.setItem('listaDoadores', JSON.stringify(listaDoadores));
    criarListaDoadores()
  } else {
    alert('Doador não encontrado');
  }
}

function deleteAll() {
  localStorage.clear();
  getListaDoadores();
  criarListaDoadores();
}

function pesquisar() {
  var pesquisaNome = document.getElementById('pesquisar').value.toLowerCase();

  if (pesquisaNome.length === 0) {
      alert('Nenhum nome foi digitado na pesquisa');
  } else {
      for (var i = 0; i < listaDoadores.length; i++) {
          if (listaDoadores[i].name.toLowerCase() == pesquisaNome) {
              popup(listaDoadores[i]);
              document.getElementById('pesquisar').value = '';
              return listaDoadores[i];
          }
      }
      alert('Não encontrado');
      document.getElementById('pesquisar').value = '';
      return null;
  }
}

function popup(doador) {
  var popup = window.open('', 'Pop-up', 'width=400,height=300');
  var info = popup.document;

  info.write(`
      <h1>Informações do Doador</h1>
      <p><strong>Nome:</strong> ${doador.name}</p>
      <p><strong>Email:</strong> ${doador.email}</p>
      <p><strong>ONG:</strong> ${doador.ong}</p>
      
      <button onclick="window.close()">Fechar</button>
  `);
  info.body.style.padding = '20px';
}






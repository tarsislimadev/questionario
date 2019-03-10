
function Ajax() {
  var x = this;

  x.__ = function (method, url, params) {
    return new Promise(function () {
      var xhr = new XMLHttpRequest();
      xhr.open(method, '/ajax/' + url);

      xhr.onload = function () {
        s();
      };

      xhr.onerror = function () {
        f();
      };

      xhr.send(JSON.stringify(params));
    });
  };

  x.teacher_register = function (nome, cpf, email, senha) {
    return  x.__('POST', 'teacher_register', {
      nome: nome, 
      cpf: cpf, 
      email: email, 
      senha: senha
    });
  }

  x.teacher_forget = function (email) {
    return x.__('POST', 'teacher_forget', { email: email });
  }
}

var ajax = new Ajax();

$(document).ready(function () {
  viewModel = new ViewModel();
  ko.applyBindings(viewModel);
  if (viewModel.init) {
    viewModel.init();
  }
});

function Ajax() {
  var x = this;

  x.__ = function (method, url, params) {
    return new Promise(function (s, f) {
      var xhr = new XMLHttpRequest();
      xhr.open(method, '/ajax/' + url);
      xhr.setRequestHeader('Content-Type', 'application/json');

      xhr.onload = function () {
        s(JSON.parse(xhr.responseText));
      };

      xhr.onerror = function () {
        f();
      };

      xhr.send(JSON.stringify(params));
    });
  };

  x.register = function (nome, email, senha) {
    return  x.__('POST', 'register', {
      nome: nome, 
      email: email, 
      senha: senha
    });
  }

  x.login_forget = function (email) {
    return x.__('POST', 'login_forget', { email: email });
  }

  x.login = function (email, senha) {
    return x.__('POST', 'login', {
      email: email, 
      senha: senha
    });
  }
}

var ajax = new Ajax();

$(document).ready(function () {
  if (typeof ViewModel === 'function') {
    viewModel = new ViewModel();
    ko.applyBindings(viewModel);
    if (viewModel.init) {
      viewModel.init();
    }
  }
});
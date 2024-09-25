document.addEventListener('DOMContentLoaded', () => {
    // Recupera o carrinho armazenado
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    const buttons = document.querySelectorAll('.produto button');
    const carrinhoCount = document.getElementById('carrinho-count');
    const searchInput = document.getElementById('search');
    const produtos = document.querySelectorAll('.produto');
    const carrinhoLista = document.getElementById('carrinho-lista'); // Certifique-se de que o nome está correto

    // Atualiza o contador de itens no carrinho
    const atualizarContadorCarrinho = () => {
        if (carrinhoCount) {
            carrinhoCount.textContent = carrinho.length;
        }
    };

    // Adiciona produtos ao carrinho
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const produtoNome = event.target.getAttribute('data-nome');
            carrinho.push(produtoNome);
            localStorage.setItem('carrinho', JSON.stringify(carrinho));
            atualizarContadorCarrinho();
            //alert('Produto adicionado ao carrinho!');
        });
    });

    // Atualiza a lista de produtos ao carregar a página
    atualizarContadorCarrinho();

    // Filtro de produtos
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const query = event.target.value.toLowerCase();
            produtos.forEach(produto => {
                const nome = produto.getAttribute('data-nome').toLowerCase();
                if (nome.includes(query)) {
                    produto.style.display = '';
                } else {
                    produto.style.display = 'none';
                }
            });
        });
    }

    // Exibir produtos no carrinho
    if (carrinhoLista) {
        if (carrinho.length === 0) {
            carrinhoLista.innerHTML = '<p>Seu carrinho está vazio.</p>';
        } else {
            carrinhoLista.innerHTML = carrinho.map(item => {
                let imagem = '';
                switch(item) {
                    case 'Samambaia':
                        imagem = 'images/produto1.png';
                        break;
                    case 'Manjerição':
                        imagem = 'images/produto2.png';
                        break;
                    default:
                        imagem = 'images/default.png';
                }
                return `
                    <div class="produto">
                        <img src="${imagem}" alt="${item}">
                        <p>${item}</p>
                    </div>
                `;
            }).join('');
        }
    }

    // Adiciona funcionalidade ao botão de compra
    const btnComprar = document.getElementById('btn-comprar');
    if (btnComprar) {
        btnComprar.addEventListener('click', () => {
            alert('Compra realizada com sucesso!');
            localStorage.removeItem('carrinho'); // Limpa o carrinho após a compra
            window.location.href = 'index.html'; // Redireciona para a página inicial
        });
    }

    // Adicionar função ao botão de esvaziar o carrinho
    const btnesvaziar = document.getElementById('btn-esvaziar');
    if (btnesvaziar) {
        btnesvaziar.addEventListener('click', () => {
            localStorage.removeItem('carrinho'); // Limpar o carrinho
            carrinho = []; // Atualiza a variável local também
            carrinhoLista.innerHTML = '<p>Seu carrinho está vazio.</p>'; // Atualizar a página para mostrar que o carrinho está vazio
            atualizarContadorCarrinho(); // Atualiza o contador no header
        });
    }
});






// ---------- VALIDAÇÃO USERNAME ---------- //
let usernameInput = document.getElementById("username");
let usernameLabel = document.querySelector('label[for="username"]');
let usernameHelper = document.getElementById("username-helper");

let emailInput = document.getElementById("email");
let emailLabel = document.querySelector('label[for="email"]');
let emailHelper = document.getElementById("email-helper");

let idadeInput = document.getElementById("idade");
let idadeLabel = document.querySelector('label[for="idade"]');
let idadeHelper = document.getElementById("idade-helper");

let senhaInput = document.getElementById("senha");
let senhaLabel = document.querySelector('label[for="senha"]');
let senhaHelper = document.getElementById("senha-helper");

let confirmar_senhaInput = document.getElementById("confirmar_senha");
let confirmar_senhaLabel = document.querySelector('label[for="confirmar_senha"]');
let confirmar_senhaHelper = document.getElementById("confirmar_senha-helper");

let enviarInput = document.getElementById("enviar");
let validaCount = 0

// Mostrar popup de campo obrigatório
// elemento.addEventListener("nome_do_evento", funcao_que_eh_disparada)

usernameInput.addEventListener("focus", () => {
  usernameLabel.classList.add("required-popup");
});

// Ocultar popup de campo obrigatório

usernameInput.addEventListener("blur", () => {
  usernameLabel.classList.remove("required-popup");
});

// Validar valor do input

usernameInput.addEventListener("input", (elemento) => {
  // parametro elemento => representa o elemento que chama o addEventListener (nesse caso o usernameInput)

  // sintaxe para caputar o valor que o usuario escreve no input em tempo real
  console.log(elemento.target.value);

  let inputValue = elemento.target.value;

  if (inputValue.length < 6) {
    usernameInput.classList.remove("correct");
    usernameInput.classList.add("error");

    usernameHelper.classList.add("visible");
    usernameHelper.innerText =
      "O campo Username precisa ter pelo menos 6 caracteres";
  } else {
    usernameInput.classList.remove("error");
    usernameHelper.classList.remove("visible");
    usernameInput.classList.add("correct");
    validaCount = validaCount +1
  }
});
    confirmar_senhaInput.addEventListener("input", (elemento) => {
    let value = elemento.target.value
    if (value !== senhaInput.value) {
        confirmar_senhaInput.classList.remove("correct");
        confirmar_senhaInput.classList.add("error");
    
        confirmar_senhaHelper.classList.add("visible");
        confirmar_senhaHelper.innerText =
          "Senha Invalida";
    }
    else {
        confirmar_senhaInput.classList.remove("error");
        confirmar_senhaHelper.classList.remove("visible");
        confirmar_senhaInput.classList.add("correct");
        validaCount = validaCount +1
  
    }
});
enviarInput.addEventListener("click", ()=>{
    if (validaCount == 2 ) {
        alert("Dados Confirmados com Sucesso!")
        let a_enviar = document.getElementById ("a_enviar")
        a_enviar.setAttribute("href","index.html") 
    }
});

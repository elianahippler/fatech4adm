const agua = [
    {id: 0, nome: 'Água com gás', img: '../feira/imagens/produtos/0.jpeg', preco: 4.00, quantidade: 0},
    {id: 1, nome: 'Água sem gás', img: '../feira/imagens/produtos/1.jpeg', preco: 3.00, quantidade: 0},
    {id: 2, nome: 'Suco 500ml', img: '../feira/imagens/produtos/9.jpg', preco: 10.00, quantidade: 0},
    {id: 3, nome: 'Suco 330ml', img: '../feira/imagens/produtos/10.jpg', preco: 7.00, quantidade: 0},
];

const trufas = [
    {id: 4, nome: 'Trufa de Brigadeiro', img: '../feira/imagens/produtos/2.jpg', preco: 5.00, quantidade: 0},
    {id: 5, nome: 'Trufa de Paçoca', img: '../feira/imagens/produtos/3.jpg', preco: 5.00, quantidade: 0},
    {id: 6, nome: 'Trufa de Maracujá', img: '../feira/imagens/produtos/4.jpg', preco: 5.00, quantidade: 0},
];

const paodemel = [
    {id: 7, nome: 'Pão de Mel - Brigadeiro', img: '../feira/imagens/produtos/5.jpg', preco: 10.00, quantidade: 0},
    {id: 8, nome: 'Pão de Mel - Maracujá', img: '../feira/imagens/produtos/6.jpg', preco: 10.00, quantidade: 0},
    {id: 9, nome: 'Pão de Mel - Doce Leite', img: '../feira/imagens/produtos/7.jpg', preco: 10.00, quantidade: 0},  
];

const brownie = [
    {id: 10, nome: 'Brownie', img: '../feira/imagens/produtos/8.jpg', preco: 10.00, quantidade: 0},
];

const allItems = agua.concat(trufas, paodemel, brownie);

function calcularEExibirTotalCarrinho() {
    let totalCarrinho = 0;
    allItems.forEach(item => {
        totalCarrinho += item.preco * item.quantidade;
    });
    const totalCarrinhoElement = document.getElementById('totalCarrinho');
    totalCarrinhoElement.textContent = `Total: R$ ${totalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const totalPedidoElement = document.getElementById('totalPedido');
    totalPedidoElement.textContent = `TOTAL: R$ ${totalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    const totalPedidoCupomElement = document.getElementById('totalPedidoCupom');
    totalPedidoCupomElement.textContent = `TOTAL: R$ ${totalCarrinho.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
}

function adicionarAoCarrinho(key) {
    const item = allItems[key];
    item.quantidade++;
    atualizarCarrinho();
    atualizarQuantidadeProduto(key);
    calcularEExibirTotalCarrinho();
    salvarCarrinhoNoLocalStorage();
    return false;
}

function removerDoCarrinho(key) {
    const item = allItems[key];
    if (item.quantidade > 0) {
        item.quantidade--;
        atualizarCarrinho();
        atualizarQuantidadeProduto(key);
        calcularEExibirTotalCarrinho();
        salvarCarrinhoNoLocalStorage();
    } return false;
}

function limparCarrinho() {
    allItems.forEach(item => {
        item.quantidade = 0;
        atualizarQuantidadeProduto(item.id);
    });
    atualizarCarrinho();
    calcularEExibirTotalCarrinho();
    salvarCarrinhoNoLocalStorage();
}

function inicializarCarrinhoDoLocalStorage() {
    const carrinhoDoLocalStorage = JSON.parse(localStorage.getItem('carrinho'));
    if (carrinhoDoLocalStorage) {
        allItems.forEach((item, index) => { 
            item.quantidade = carrinhoDoLocalStorage[index].quantidade;
            atualizarQuantidadeProduto(index);
        });
    }
}

function salvarCarrinhoNoLocalStorage() {
    const carrinhoParaSalvar = allItems.map(item => {
        return { quantidade: item.quantidade };
    });
    localStorage.setItem('carrinho', JSON.stringify(carrinhoParaSalvar));
}

function atualizarQuantidadeProduto(key) {
    const item = allItems[key];
    const quantidadeElement = document.querySelector(`.quantidade-carrinho-${item.id}`);
    if (quantidadeElement) {
        quantidadeElement.textContent = item.quantidade;
    }
}

function atualizarCarrinho() {
    var containerCarrinho = document.getElementById('carrinho');
    containerCarrinho.innerHTML = "";
    allItems.forEach((val) => {
        if (val.quantidade > 0) {
            containerCarrinho.innerHTML += `
            <div class="info-single-checkout">
                <img src="${val.img}"/>
                <p class="nomeprodutocarrinho" style="float:left;">${val.nome}</p>
                <button class="btnadd" onclick="adicionarAoCarrinho(${val.id})" id="botao-${val.id}">+</button>
                <p class="quantidade-no-carrinho">${val.quantidade}</p>
                <button class="btnrmv" onclick="removerDoCarrinho(${val.id})">-</button>
                <p class="precoprodutocarrinho">R$ ${val.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}(un)</p>
                <div style="clear:both;"></div>
            </div>`;
        }
    });

    var containerCarrinhoCupom = document.querySelector('.cupomcarrinho');
    containerCarrinhoCupom.innerHTML = `
        <div style="padding-bottom: 10px; border-top: 1px solid black; border-bottom: 1px solid black; height: 17px;">
        <p style="float:left;">PRODUTO</p>
        <p style="float:right;">QTDE</p>
        <p style="float:right; margin-right:15px;">VALOR UNIT.</p>
        </div>
        <br>`;
    allItems.forEach((val) => {
        if (val.quantidade > 0) {
            containerCarrinhoCupom.innerHTML += `
            <div class="info-single" style="padding-bottom: 7px;">
            <p class="nomeprodutocarrinhocupom" style="float:left;"> ${val.nome}</p>
            <p class="quantidade-no-carrinho-cupom" style="float:right;">${val.quantidade}</p>
            <p class="precoprodutocarrinhocupom" style="float:right; margin-right:50px;">R$ ${val.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <div style="clear:both;"></div>`;
        }
    });
}

function redirecionarParaOPedido() {
    window.location.href = 'pedido.html';
}

function executarAcoesNovo() {
    limparCarrinho();
    redirecionarParaOPedido();
}

function executarAcoesConfirmar(){
    confirmarPedido();
    frameConfirmarPedido();
    criarPedido()
}

function confirmarPedido() {
    var section = document.querySelector('.mostrar');
    setTimeout(function() {
        section.style.opacity = '1';
        section.style.transform = 'translateX(0)';
    }, 10);
}

function frameConfirmarPedido() {
    var section2 = document.querySelector('.pedidoconfirmado');
    section2.style.display = 'block';
    setTimeout(function() {
        section2.style.opacity = '1';
    }, 10);
}

let numeroPedido = 1;

if (localStorage.getItem('ultimoNumeroPedido')) {
    numeroPedido = parseInt(localStorage.getItem('ultimoNumeroPedido')) + 1;
}

function gerarIdPedido() {
    const idPedido = `${numeroPedido}`;
    numeroPedido++;
    localStorage.setItem('ultimoNumeroPedido', numeroPedido - 1);
    return idPedido;
}

function criarPedido() {
    const idPedidoGerado = gerarIdPedido();
    const idPedidoElement = document.getElementById('idPedido');
    idPedidoElement.textContent = `${idPedidoGerado}`;
    const idPedidoCupomElement = document.getElementById('idPedidoCupom');
    idPedidoCupomElement.textContent = `PEDIDO N° ${idPedidoGerado}`;
    imprimirPedido()
    confirmarPedido()
}

const nomeArmazenado = localStorage.getItem('nome');

if (nomeArmazenado) {
    console.log('Nome Armazenado:', nomeArmazenado);
    const nomeClienteElement = document.getElementById('nomeCliente');
    nomeClienteElement.textContent = `Cliente: ${nomeArmazenado}`;
    const nomeClienteCupomElement = document.getElementById('nomeClienteCupom');
    nomeClienteCupomElement.textContent = `CLIENTE: ${nomeArmazenado}`;
}

function retornarTelaPrincipal(){
    window.location.href = 'index.html';
    limparCarrinho();
}

function imprimirPedido(){
    window.print();
}

function imprimir2via(){
    window.print();
}

const agora = new Date();

const dataFormatada = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1).toString().padStart(2, '0')}/${agora.getFullYear()}`;

const horaFormatada = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}:${agora.getSeconds().toString().padStart(2, '0')}`;

document.getElementById("dataPedido").textContent = `${dataFormatada}`;
document.getElementById("horaPedido").textContent = `${horaFormatada}`;

inicializarCarrinhoDoLocalStorage();
atualizarCarrinho();
calcularEExibirTotalCarrinho();

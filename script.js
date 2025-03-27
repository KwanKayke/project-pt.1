document.addEventListener('DOMContentLoaded', () => {
    const add = document.getElementById('addDiv');
    const Divs = document.querySelector('.containerCard');
    const modelo = document.getElementById('modelo');
    const fecharD = document.getElementById('fecharD');
    const novaD = document.getElementById('novaD');

    function addDiv() {
        modelo.style.display = "block";
    }

    fecharD.addEventListener('click', () => {
        modelo.style.display = "none";
    });

    function convertB64(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
    }

    novaD.addEventListener('click', () => {
        const inptN = document.getElementById('nome do projeto').value;
        const inptEN = document.getElementById('entrega').value;
        const inptES = document.getElementById('escala').value;
        const inptF = document.getElementById('fotoFile').files[0];

        if (!inptN || !inptEN || !inptES) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (inptF) {
            convertB64(inptF, (base64) => {
                salvarDados(inptN, inptEN, inptES, base64);
            });
        } else {
            salvarDados(inptN, inptEN, inptES, '');
        }
    });

    function salvarDados(nome, entrega, escala, imagem) {
        const novoObjeto = { nome, entrega, escala, imagem };

        let historico = JSON.parse(localStorage.getItem('Dados')) || [];
        historico.push(novoObjeto);
        localStorage.setItem('Dados', JSON.stringify(historico));

        adicionarNaTela(novoObjeto, historico.length - 1);

        modelo.style.display = "none";
        document.getElementById('newFormCaixa').reset();
    }

    function carregarDados() {
        Divs.innerHTML = ''; // Limpa a tela antes de carregar
        let historico = JSON.parse(localStorage.getItem('Dados')) || [];
        historico.forEach((Dados, index) => adicionarNaTela(Dados, index));
    }

    function adicionarNaTela(Dados, index) {
        const novaC = document.createElement('div');
        novaC.classList.add('card'); 
    
        novaC.innerHTML = `
            <img src="${Dados.imagem || 'placeholder.jpg'}" alt="Foto da Dados">
            <div class="info">
                <p>${Dados.nome}</p>
                <p>ENTREGA: ${Dados.entrega}</p>
                <p><strong>ESCALA: ${Dados.escala}</strong></p>
            </div>
        `;
    
        Divs.appendChild(novaC);
    }
    carregarDados();
    add.addEventListener('click', addDiv);
});

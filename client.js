const axios = require("axios");

const username = "marcosprr"

function getToken(){
    return axios.post('https://tecweb-js.insper-comp.com.br/token', {username: username},{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

function listaExercicios(accessToken){
    return axios.get('https://tecweb-js.insper-comp.com.br/exercicio', {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

function enviarResposta(accessToken,slug,resposta){
    return axios.post(`https://tecweb-js.insper-comp.com.br/exercicio/${slug}`, {resposta: resposta},{
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
}

getToken().then(response => {
    const accessToken = response.data.accessToken;
    console.log("Token de acesso:", accessToken);

    return listaExercicios(accessToken);
}).then(response => {
    console.log("Lista de exercicios:", response.data);
}).catch(error => console.error("Erro na requisição:", error));

function somaValores(entrada){
    return entrada.a + entrada.b;
}

function tamanhoString(entrada){
    return entrada.string.length;
}

function nomeUsuario(entrada){
    return entrada.email.split('@')[0];
}

function jacaWars(entrada){
    const g = 9.8;
    const theta = entrada.theta;
    const radianos = theta*Math.PI/180;
    const v = entrada.v;
    const distancia = (v*v*Math.sin(2*radianos))/g;

    if (distancia > 102){
        return 1;
    } else if (distancia < 98){
        return -1;
    }else{
        return 0;
    }
}

function anoBissexto(entrada){
    const ano = entrada.ano;
    if ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 ===0){
        return true;
    }else{
        return false;
    }
}

function volumePizza(entrada){
    const pi = Math.pi;
    const r = entrada.z;
    const h = entrada.a;
    const volume = pi*r*r*a;
    return Math.round(volume);
}

function mru(entrada){
    const s0 = entrada.s0;
    const v = entrada.v;
    const t = entrada.t;
    const s = s0 + v*t;
    return s;
}

function inverteString(entrada){
    const string = entrada.string;
    return string.split('').reverse().join('');
}

function somaValoresObjeto(objeto){
    let soma = 0;
    for (let chave in objeto){
        if (typeof objeto[chave] === 'number'){
            soma += objeto[chave];
        }
    }
    return soma;
}

function ehPrimo(n){
    for (let i = 2; i<=Math.sqrt(n); i++){
        if (n % i === 0){
            return false;
        }
    }
    return true;
}

function nPrimo(n){
    let count = 0;
    let num = 2;

    while (true){
        if (ehPrimo(num)){
            count++;
            if (count === n){
                return num;
            }
        }
        num++;
    }
}

function maiorPrefixoComum(strings){
    if (strings.length === 0) return '';

    let prefixo = '';

    for (let i = 0; i<strings[0].length; i++){
        const char = strings[0][i];
        for (let j=1; j<strings.length;j++){
            if (i === strings[j].length || strings[j][i] !== char){
                return prefixo;
            }
        }
        prefixo += char;
    }
    return prefixo;
}

function somaSegundoMaiorMenor(numeros){
    numeros.sort((a,b) => a-b);
    let segundo_menor = numeros[1];
    let segundo_maior = numeros[numeros.length-2];
    return segundo_maior+segundo_menor;
}

function contaPalindromos(palavras){
    let contador = 0;

    function ehPalindromo(palavra){
        return palavra === palavra.split('').reverse().join('');
    }

    for (let palavra of palavras){
        if (ehPalindromo(palavra)){
            contador++;
        }
    }
    return contador;
}

function somaStrings(strings){
    return strings.map(str => parseInt(str,10)).reduce((soma, num) => soma + num, 0);
}

async function somaComRequisicoes(endpoints){
    let soma = 0;

    async function obterValor(endpoint){
        const response = await fetch(endpoint);
        const data = await response.json();
        return data.valor; // modificar o valor dps
    }

    for (let endpoint of endpoints){
        soma += await obterValor(endpoint);
    }
    return soma;
}

async function cacarTesouro(urlInicial){
    let urlAtual = urlInicial;

    while (true){
        const response = await fetch(urlAtual);
        const data = await response.json();

        if (typeof data === 'number'){
            return data
        } else if (typeof data === 'string'){
            urlAtual = data;
        } else {
            throw new Error("Tesouro não encontrado.");
        }
    }
}


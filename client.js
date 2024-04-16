const axios = require("axios");

const config = {
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
}

function getToken(){
    return axios
        .post("https://tecweb-js.insper-comp.com.br/token", { username: "marcosprr" }, config)
        .then((response) => response.data.accessToken);
}

function listaExercicios(token){
    config.headers.Authorization = `Bearer ${token}`;
    return axios
        .get("https://tecweb-js.insper-comp.com.br/exercicio", config)
        .then((response) => response.data)
}


let exercicios;
getToken().then(accessToken => {
    console.log("Token de acesso:", accessToken);

    return listaExercicios(accessToken);
}).then(response => {
    exercicios = response; 
    console.log("Lista de exercicios:", response);
}).catch(error => console.error("Erro na requisição:", error));

async function postExercicio(token, exercicioId, entrada){
    config.headers.Authorization = `Bearer ${token}`;
    try {
        const response = await axios.post(`https://tecweb-js.insper-comp.com.br/exercicio/${exercicioId}`, entrada, config);
        return response.data;
    } catch (error) {
        console.error(`Erro ao enviar POST para ${exercicioId}:`, error.response ? error.response.data : error.message);
        return null;
    }
}

function somaValores(a,b){
    return a + b;
}


function tamanhoString(string){
    return string.length;
}


function nomeUsuario(email){
    return email.split('@')[0];
}

function jacaWars(v, theta){
    const g = 9.8;
    const radianos = theta*Math.PI/180;
    const distancia = (v*v*Math.sin(2*radianos))/g;

    if (distancia > 102){
        return 1;
    } else if (distancia < 98){
        return -1;
    }else{
        return 0;
    }
}

function anoBissexto(ano){
    if ((ano % 4 === 0 && ano % 100 !== 0) || ano % 400 ===0){
        return true;
    }else{
        return false;
    }
}

function volumePizza(z,a){
    const volume = Math.PI*z**2*a;
    return Math.round(volume);
}

function mru(s0,v,t){
    const s = s0 + v*t;
    return s;
}

function inverteString(string){
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
    if (strings.length === 0) return ''; // Retorna uma string vazia se o array de strings estiver vazio

    let prefixo = '';

    for (let i = 0; i < strings[0].length; i++){ // Itera sobre cada caractere da primeira string
        const char = strings[0][i]; // Armazena o caractere atual da primeira string para comparação

        for (let j = 1; j < strings.length; j++){ // Compara o caractere com o mesmo índice nas outras strings
            if (i === strings[j].length || strings[j][i] !== char){ // Checa se alcançou o fim de qualquer string ou se os caracteres diferem
                return prefixo; // Retorna o prefixo comum encontrado até agora
            }
        }
        prefixo += char; // Se o caractere é comum a todas as strings, adiciona ao prefixo
    }
    return prefixo; // Retorna o prefixo comum máximo encontrado
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


async function main(){
    let token = await getToken();
    if (!token) {
        console.log("Token não recebido, não é possível continuar.");
        return;
    }

    const exercicios = await listaExercicios(token);
    if (!exercicios) {
        console.log("Não foi possível obter a lista de exercícios.");
        return;
    }


    let n1 = exercicios.soma.entrada.a;
    let n2 = exercicios.soma.entrada.b;
    let resultado = somaValores(n1,n2);
    const response1 = await postExercicio(token, 'soma', { resposta: resultado });
    console.log("Resposta do servidor para soma:", response1);

    let string = exercicios['tamanho-string'].entrada.string;
    let resultado2 = tamanhoString(string);
    const response2 = await postExercicio(token, 'tamanho-string', { resposta: resultado2 });
    console.log("Resposta do servidor para tamanho-string:", response2);
    
    let email = exercicios['nome-do-usuario'].entrada.email;
    let resultado3 = nomeUsuario(email);
    const response3 = await postExercicio(token, 'nome-do-usuario', { resposta: resultado3 });
    console.log("Resposta do servidor para nome-do-usuario:", response3);

    let jaca_v = exercicios['jaca-wars'].entrada.v;
    let jaca_theta = exercicios['jaca-wars'].entrada.theta;
    let resultado4 = jacaWars(jaca_v, jaca_theta);
    const response4 = await postExercicio(token, 'jaca-wars', { resposta: resultado4 });
    console.log("Resposta do servidor para jaca-wars:", response4);

    let ano = exercicios['ano-bissexto'].entrada.ano;
    let resultado5 = anoBissexto(ano);
    const response5 = await postExercicio(token, 'ano-bissexto', { resposta: resultado5 });
    console.log("Resposta do servidor para ano-bissexto:", response5);
    
    let z = exercicios['volume-da-pizza'].entrada.z;
    let a = exercicios['volume-da-pizza'].entrada.a;
    let resultado6 = volumePizza(z,a);
    const response6 = await postExercicio(token, 'volume-da-pizza', { resposta: resultado6 });
    console.log("Resposta do servidor para volume-da-pizza:", response6);

    let mru_s0 = exercicios['mru'].entrada.s0;
    let mru_v = exercicios['mru'].entrada.v;
    let mru_t = exercicios['mru'].entrada.t;
    let resultado7 = mru(mru_s0, mru_v, mru_t);
    const response7 = await postExercicio(token, 'mru', { resposta: resultado7 });
    console.log("Resposta do servidor para mru:", response7);

    let inverte_string = exercicios['inverte-string'].entrada.string;
    let resultado8 = inverteString(inverte_string);
    const response8 = await postExercicio(token, 'inverte-string', { resposta: resultado8 });
    console.log("Resposta do servidor para inverte-string:", response8);

    let lista_soma = exercicios['soma-valores'].entrada.objeto;
    let resultado9 = somaValoresObjeto(lista_soma);
    const response9 = await postExercicio(token, 'soma-valores', { resposta: resultado9 });
    console.log("Resposta do servidor para soma-valores:", response9);

    let n = exercicios['n-esimo-primo'].entrada.n;
    let resultado10 = nPrimo(n);
    const response10 = await postExercicio(token, 'n-esimo-primo', { resposta: resultado10 });
    console.log("Resposta do servidor para n-esimo-primo:", response10);

    let lista_strings = exercicios['maior-prefixo-comum'].entrada.strings;
    let resultado11 = maiorPrefixoComum(lista_strings);
    const response11 = await postExercicio(token, 'maior-prefixo-comum', { resposta: resultado11 });
    console.log("Resposta do servidor para maior-prefixo-comum:", response11);

    let lista_palavras = exercicios['conta-palindromos'].entrada.palavras;
    let resultado12 = contaPalindromos(lista_palavras);
    const response12 = await postExercicio(token, 'conta-palindromos', { resposta: resultado12 });
    console.log("Resposta do servidor para conta-palindromos:", response12);

    let soma_strings = exercicios['soma-de-strings-de-ints'].entrada.strings;
    let resultado13 = somaStrings(soma_strings);
    const response13 = await postExercicio(token, 'soma-de-strings-de-ints', { resposta: resultado13 });
    console.log("Resposta do servidor para soma-de-strings-de-ints:", response13);

    let endpoints = exercicios['soma-com-requisicoes'].entrada.endpoints;
    let resultado14 = somaComRequisicoes(endpoints);
    const response14 = await postExercicio(token, 'soma-com-requisicoes', { resposta: resultado14 });
    console.log("Resposta do servidor para soma-com-requisicoes:", response14);

    let url0 = exercicios['caca-ao-tesouro'].entrada.inicio;
    let resultado15 = cacarTesouro(url0);
    const response15 = await postExercicio(token, 'caca-ao-tesouro', { resposta: resultado15 });
    console.log("Resposta do servidor para caca-ao-tesouro:", response15);

    let lista_numeros = exercicios['soma-segundo-maior-e-menor-numeros'].entrada.numeros;
    let resultado16 = somaSegundoMaiorMenor(lista_numeros);
    const response16 = await postExercicio(token, 'soma-segundo-maior-e-menor-numeros', { resposta: resultado16 });
    console.log("Resposta do servidor para soma-segundo-maior-e-menor-numeros:", response16);
}

main();

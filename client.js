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
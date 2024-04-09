const axios = require("axios");

const username = "marcosprr"

axios.post('https://tecweb-js.insper-comp.com.br/token', {username: username},{
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}}).then(response => {
    const accessToken = response.data.accessToken;
    console.log("Token de acesso:", accessToken);
}).catch(error => console.error("Erro na requisição:", error))
import express from 'express';
import tabela2024 from './tabela.js';

const app = express();

app.listen(300, () => console.log('servidor rodando com sucesso'));

app.get('/', (requisicao, resposta) => {
    resposta.send(tabela2024)
});

app.get('/:siglaReq',(requisicao, resposta)=>{
    const siglaReq = requisicao.params.siglaReq.toUpperCase();
    const time = tabela2024.find(infoTime => infoTime.sigla === siglaReq)
    resposta.send(time)
});
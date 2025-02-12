import express from 'express';
import tabela2024 from './tabela.js';

const app = express();

app.use(express.json())

app.listen(300, () => console.log('servidor rodando com sucesso'));

app.get('/', (requisicao, resposta) => {
    resposta.status(200).send(tabela2024)
});

app.get('/:siglaReq',(requisicao, resposta)=>{
    const siglaReq = requisicao.params.siglaReq.toUpperCase();
    const time = tabela2024.find((infoTime) => infoTime.sigla === siglaReq)
    if(!time){
        resposta.status(404).send('nao existe time');
        return;
    }
    resposta.send(time)
});

app.put('/:sigla', (req,res)=>{
    const siglaInf = req.params.sigla.toLocaleUpperCase();
    const time = tabela2024.find(t => t.sigla === siglaInf);
    if(!time){
        resposta.status(404).send('nao existe time');
        return;
    }
    const campos = Object.keys(req.body)
    for(let campo of campos){
        time[campo] = req.body[campo]
    }
    console.log(time);
    res.status(200).send(time);
});

app.post('/', (req, res)=>{
    const novotime = req.body;
    tabela2024.push(novotime);
    res.status(200).send(novotime)
    console.log(novotime);
})

app.delete('/:sigla', (req, res)=>{
    const siglaInf = req.params.sigla.toLocaleUpperCase();
    const indeceTime = tabela2024.findIndex((t) => t.sigla === siglaInf);
    if(indeceTime === -1){
        res.status(404).send('time nao encontrado');
        return;
    }
    const timeRemovido = tabela2024.splice(indeceTime, 1);
    res.status(200).send(timeRemovido);
})
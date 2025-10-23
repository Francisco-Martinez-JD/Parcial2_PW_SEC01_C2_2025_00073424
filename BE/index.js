import express from 'express';
import {cuentas} from './const.js';

const app = express();

app.use(express.json());

const PORT = 3130;

app.get("/cuentas",  (req, res) => {
     
        const { queryParam } = req.query;
        
        if (!queryParam) {
            return res.json({
                count: cuentas.length,
                data: cuentas
            });
        }
        
        const cuentasEncontradas = cuentas.filter(cuenta => 
            cuenta.id.toLowerCase().includes(queryParam.toLowerCase()) ||
            cuenta.client.toLowerCase().includes(queryParam.toLowerCase()) ||
            cuenta.gender.toLowerCase().includes(queryParam.toLowerCase())
        );
        
        if (cuentasEncontradas.length === 0) {
            return res.send({
                finded: false
            });
        } else if (cuentasEncontradas.length === 1) {
            return res.send({
                finded: true,
                account: cuentasEncontradas[0]
            });
        } else {
            return res.send({
                finded: true,
                data: cuentasEncontradas
            });
        }
});

app.get('/cuenta/:id', (req, res) => {

    const {id} = req.params;
    const cuenta = cuentas.find(cuenta => cuenta.id === id);
    const obj = {
        finded: cuenta ? true : false,
        account: cuenta ? cuenta : 'No se encontro ninguna cuenta'
    };
    res.send(obj);
    
});


app.get('/cuentasBalance', (req, res) => {

    const cuentasActivas = cuentas.filter(cuenta => cuenta.isActive === true);
    let totalBalance = 0;      
        for (let i = 0; i < cuentasActivas.length; i++) {
            const balance = Number(cuentasActivas[i].balance);
            totalBalance += balance;
        }
        
        const obj = {
            status: cuentasActivas.length > 0,
            accountBalance: totalBalance
        };
        
        return res.json(obj)

});

app.listen(PORT);

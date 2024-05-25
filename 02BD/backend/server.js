import express from 'express';

const app=express();

app.get('/',(req,res) => {
    res.send('server is ready')
});

// get a list of jokes

app.get('/api/jokes',(req,res) => {
    const jokes=[
        {
            id:1,
            title:'a joke',
            content:'this is a joke'
        },
        {
            id:2,
            title:'another joke',
            content:'this is another joke'
        }, {
            id:3,
            title:'third joke',
            content:'this is third joke'
        },
        {
            id:4,
            title:'fourth joke',
            content:'this is fourth joke'
        },
    ];
    res.send(jokes);
});

const port = process.env.PORT||3000;

app.listen(port,() => {
    console.log(`server at http://localhost:${port}`);
});
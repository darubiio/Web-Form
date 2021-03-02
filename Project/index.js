const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000

// ejs
app.set('view engine', 'ejs')

// body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var favoritos = []

var carrito = []

var subtotal = 0

// rutas
app.get('/', function (req, res) {
    var precios = carrito.map(x => x.precio * x.cantidad)
    console.log(precios);
    var redSuma = precios.reduce((acc, el) => acc + el, 0)
    subtotal = redSuma
    res.render('main', {favoritos: favoritos, carrito: carrito, subtotal: subtotal})
})
app.post('/adicionar-producto', function (req, res) {
    var NewProd = new Object()
        NewProd.nombre = req.body.nombre
        NewProd.cantidad = req.body.cantidad
        NewProd.precio= parseInt(req.body.precio)
        NewProd.categoria= req.body.categoria
        console.log(NewProd);
    if (NewProd.categoria == 2) {
        favoritos.push(NewProd)
    }else{
        carrito.push(NewProd)
    }

    res.redirect("/")
})

app.get('/carrito', function (req, res) {    
    const id = req.query.id
    const car = products.filter(x => x.id == id)
    const planoc = car.reduce((acc, el) => acc.concat(el), [])
    console.log(planoc);
    carrito.push(...planoc);
    res.redirect("/")    
    const precios = carrito.map(x => x.precio)
    const redSuma = precios.reduce((acc, el) => acc + el, 0)
    subtotal = redSuma * carrito.length
})


app.listen(port, () => console.log(`Example app listening on port port!`))

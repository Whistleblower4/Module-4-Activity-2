const express = require('express')
const morgan = require('morgan')
const app = express()

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
    console.log('Hello from the middleware 👋 ')
    next()
})

app.use((req, res, next) => {
    req.requestTime = Date.now()
    next()
})

// 3) ROUTES
const loansRouter = require('./routes/loanRoutes')
app.use('/api/v1/loans', loansRouter)

// Error handling middleware (custom error handling can be added here)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

module.exports = app
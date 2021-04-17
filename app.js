const express = require('express');
const bankApiUsers = require('./routes/users.routes')

const app = express();
const PORT =process.env.PORT|| 5005;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))


app.use('/users', bankApiUsers)


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

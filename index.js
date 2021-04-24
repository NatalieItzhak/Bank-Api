const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bankApiUsers = require('./Server/routes/users.routes')

const app = express();
const PORT =process.env.PORT|| 5005;

app.use(cors());
app.use(express.json({extends: false})); 
app.use(express.urlencoded({ extended: true }))


const URI= (process.env.MONGODB_URI ||`mongodb+srv://NatalieItzhak:natalieitzhak27@cluster0.3ik4f.mongodb.net/test`)
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    console.log("database connect")
});



app.use('/users', bankApiUsers)


app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

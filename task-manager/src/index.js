const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();

const multer = require('multer');
const upload = multer({
    dest: 'images',
});

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send();
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listen on port ', PORT);
});

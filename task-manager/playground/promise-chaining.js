require('../src/db/mongoose');
const User = require('../src/models/user');

User.findByIdAndUpdate('5f21712450842714f20b6cf8', { age: 1 })
    .then((user) => {
        console.log(user);
        return User.countDocuments({ age: 1 });
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));

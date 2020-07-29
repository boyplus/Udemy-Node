require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5f21712450842714f20b6cf8', { age: 1 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 1 });
//     })
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => console.log(err));

const updateAge = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {
        age,
    });
    const count = await User.countDocuments({ age: 1 });
    return count;
};

updateAge('5f21712450842714f20b6cf8', 0)
    .then((count) => console.log(count))
    .catch((err) => console.log(err));

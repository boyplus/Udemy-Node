require('../src/db/mongoose');

const Task = require('../src/models/task');

const _id = '5f21a34ee6f2451b3b3668af';
Task.findByIdAndDelete(_id)
    .then((task) => {
        console.log(task);
        return Task.countDocuments({ completed: false });
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));

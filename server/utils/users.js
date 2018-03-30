
// class Person {
//     constructor(name,age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription(){
//         return `${this.name} is ${this.age} year(s) old.`
//     }
// }

// var me = new Person('Ajeet',24);
// var description = me.getUserDescription();
// console.log(description);
// console.log('this.age',me.age);


class Users {
    constructor(){
        this.users = [];
    }
    addUser(id,name,room) {
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.users.filter((user) => user.id !== id);
        var usersList = user.map((user) => user.name);
        // console.log(usersList);
        return usersList;
    }

    removedUser(id) {
        var user = this.getUsers(id);
        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }

    getUsers(id) {
        return this.users.filter((user) => user.id == id)[0];
    }

    getUser(id) {
        var user = this.users.filter((user) => user.id === id);
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var nameArray = users.map((user) => user.name);
        return nameArray;
    }
}

module.exports = { Users };
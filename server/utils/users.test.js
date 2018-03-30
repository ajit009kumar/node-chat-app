var expect = require('expect');

const { Users } = require('./users.js');

describe('Users' , () => {

    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name:'mike',
            room: 'JAVASCRIPT'
        },
       
        {
            id: '2',
            name:'james',
            room:'HTML'
        },

        {
            id: '3',
            name: 'jane',
            room: 'JAVASCRIPT'
        }]
    }); 

    it('should remove a user',() => {
        var usersList = users.removeUser('1');
        expect(usersList).toEqual(['james','jane']);
    })

    it('should find a user',() => {
        var user = users.getUser('2');
        expect(user).toEqual([{ id: '2',name:'james',room:'HTML'}])
    })

    it('should not remove a user',() => {
        var usersList = users.removeUser('4');
        expect(usersList).toEqual(['mike','james','jane'])
    })

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '122',
            name: 'ajeet',
            room: 'The office fan'
        }

        var resUser = users.addUser(user.id,user.name,user.room);
        expect(users.users).toEqual([user]);

    });

    it('should return names for javascript course',() => {
        var usersList = users.getUserList('JAVASCRIPT');
        expect(usersList).toEqual(['mike','jane']);
    })

})
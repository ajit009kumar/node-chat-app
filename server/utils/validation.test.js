var expect = require('expect');

var { isRealString } = require('./validation');

describe('isRealString', () => {
    it ('should reject non-string value' , () => {
        var result = isRealString(98);
        expect(result).toBe(false) 
    });

    it('should Reject String with only whitespaces' , () => {
        var result = isRealString('           ');
        expect(result).toBe(false);
    });

    it('should allow string with non space character', () => {
        var result = isRealString('Hell o');
        expect(result).toBe(true);
    })
})
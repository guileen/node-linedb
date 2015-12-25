var linedb = require('../')
var expect = require('chai').expect

describe('linedb', function() {

        var db = linedb(__dirname + '/testdb.log')

        it('should put data', function() {
                db.put('1234', ['5678'])
                expect(db.get('1234')).to.eql(['5678'])
        })
        it('should update data', function() {
                db.put('5678', ['hello world'])
                db.put('5678', [1234])
                expect(db.get('5678')).to.eql([1234])
        })
        it('should update data', function() {
                db.put('9999', ['hello world'])
                db.del('9999', [1234])
                expect(db.get('9999')).to.be.undefined
        })

        it('should reload', function(done) {
                db.close()
                db2 = linedb(__dirname + '/testdb.log')
                db2.on('open', function() {
                        expect(db2.get('1234')).to.eql(['5678'])
                        expect(db2.get('5678')).to.eql([1234])
                        done()
                })
        })
})

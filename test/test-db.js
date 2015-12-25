var linedb = require('../')
var expect = require('chai').expect

describe('linedb', function() {

        var db = linedb(__dirname + '/testdb.log')

        it('should put data', function(done) {
                db.put('1234', ['5678'])
                db.get('1234', function(err, result) {
                        expect(result).to.eql(['5678'])
                        done()
                })
        })
        it('should update data', function(done) {
                db.put('5678', ['hello world'])
                db.put('5678', [1234])
                db.get('5678', function(err, result) {
                        expect(result).to.eql([1234])
                        done()
                })
        })
        it('should update data', function(done) {
                db.put('9999', ['hello world'])
                db.del('9999')
                db.get('9999', function(err, result) {
                        expect(result).to.be.undefined
                        done()
                })
        })

        it('should reload', function(done) {
                db.close()
                db2 = linedb(__dirname + '/testdb.log')
                db2.on('open', function() {
                        db2.get('5678', function(err, result) {
                                expect(result).to.eql([1234])
                                done()
                        })
                })
        })
})

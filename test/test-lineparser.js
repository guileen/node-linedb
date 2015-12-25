var lineparser = require('../lib/lineparser')
var expect = require('chai').expect

describe('lineparser', function() {
        it('should parse scalar', function() {
                expect(lineparser.parseScalar('@null')).to.eql(null)
                expect(lineparser.parseScalar('#1234')).to.eql(1234)
                expect(lineparser.parseScalar('\@null\\t\\n\\\\\\#1234一二三四')).to.eql("@null\t\n\\#1234一二三四")
        })

        it('should format scalar', function() {
                expect(lineparser.formatScalar(null)).to.eql('@null')
                expect(lineparser.formatScalar(1234)).to.eql('#1234')
                expect(lineparser.formatScalar("@null\t\n#:\\1234一二三四")).to.eql('\\@null\\t\\n\\#\\:\\\\1234一二三四')
                expect(lineparser.formatScalar(new Date('2015-01-01T00:00:00.000Z'))).to.eql('@t2015-01-01T00:00:00.000Z')
        })

        it('should stringify and parse', function() {
                var cols = [
                        11111,
                        new Date(),
                        '#1111',
                        '#@abcd\t\r\n1234=:\\\'\"',
                ]
                var line = lineparser.stringify(cols)
                var cols2 = lineparser.parse(line)
                expect(line.indexOf('\n')).to.be.eql(-1)
                for(var i =0;i<cols2.length;i++) {
                    expect(cols2[i]).to.eql(cols[i])
                }
        })
})

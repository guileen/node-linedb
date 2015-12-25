var fs = require('fs')
var readline = require('readline')
var lineparser = require('./lib/lineparser')
var EventEmitter = require('events').EventEmitter
var util = require('util')

var exports = module.exports = function(path) {
    return new LineDB(path)
}

exports.lineparser = lineparser

function LineDB(path) {
    this.path = path
    this.stream = fs.createWriteStream(path, {flags: 'a'})
    // this.logfile = fs.createWriteStream(path + '.access.log', 'utf8', 'a')
    this.cache = {}
    this._init()
    EventEmitter.call(this)
}
util.inherits(LineDB, EventEmitter)

LineDB.prototype._init = function() {
    var self = this
    var rl = readline.createInterface({
            input: fs.createReadStream(self.path, {flags: 'r'})
    })
    rl.on('line', function(line) {
            var cols = lineparser.parse(line)
            var t = cols[0]
            var op = cols[1]
            var id = cols[2]
            cols = cols.slice(3)
            if(op == '$put') {
                self.cache[id] = cols
            } else if(op == '$del') {
                delete self.cache[id]
            }
    })
    rl.on('close', function() {
            self.emit('open')
    })
}


LineDB.prototype.put = function(id, cols) {
    this.cache[id] = cols
    this.stream.write(lineparser.stringify([new Date, '$put', id]) + '\t' + lineparser.stringify(cols) + '\n')
}

LineDB.prototype.get = function(id, callback) {
    // this.logfile.write(lineparser.stringify([new Date, '$get', id]) + '\t' + lineparser.stringify(cols))
    callback(null, this.cache[id])
}

LineDB.prototype.del = function(id, callback) {
    this.stream.write(lineparser.stringify([new Date, '$del', id]) + '\n')
    var cols = this.cache[id]
    delete this.cache[id]
    if(callback) {
        callback(null, cols)
    }
}

LineDB.prototype.close = function() {
    this.stream.close()
}

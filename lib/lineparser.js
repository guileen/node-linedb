var reserved_words=['\\', '#', '@', ':', '\t', '\n', '\r']

exports.parse = function(line) {
    return line.split('\t').map(exports.parseScalar)
}

exports.stringify = function(cols) {
    if(Array.isArray(cols)) {
        return cols.map(exports.formatScalar).join('\t')
    } else {
        return exports.formatScalar(cols)
    }
}

exports.formatScalar = function(scalar) {
    if(scalar == null) {
        return '@null'
    }
    if(typeof scalar == 'number') {
        return exports.formatNum(scalar)
    }
    if(scalar instanceof Date) {
        return '@t' + exports.formatDate(scalar)
    }
    return exports.formatString('' + scalar)
}

exports.parseScalar = function(scalar) {
    if(scalar == '@null') {
        return null
    }
    if(scalar[0] == '#') {
        return exports.parseNum(scalar)
    }
    if(scalar[0] == '@') {
        if(scalar[1] == 't') {
            return exports.parseDate(scalar)
        }
    }
    return exports.parseString(scalar)
}

exports.formatDate = function(date) {
    var d = JSON.stringify(date)
    return d.substring(1, d.length - 1)
}

exports.parseDate = function(str) {
    return new Date(str.substring(2))
}

exports.formatNum = function(num) {
    return '#' + num
}

exports.parseNum = function(str) {
    return Number(str.substring(1))
}

exports.formatString = function(str) {
    return str.replace(/([\t\r\n\\#@:])/g, function(full, w) {
            if(w=='\t') {
                return '\\t'
            }
            if(w=='\r') {
                return '\\r'
            }
            if(w=='\n') {
                return '\\n'
            }
            if(w=='#') {
                return '\\#'
            }
            if(w=='@') {
                return '\\@'
            }
            if(w==':') {
                return '\\:'
            }
            if(w=='\\') {
                return '\\\\'
            }
            return w
    })
}

exports.parseString = function(str) {
    return str.replace(/\\(.)/g, function(full, w) {
            if(w=='t') return '\t'
            if(w=='r') return '\r'
            if(w=='n') return '\n'
            return w
    })
}

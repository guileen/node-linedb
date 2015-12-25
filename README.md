linedb
======
Log file as NoSQL. Split by \n and \t, It is easy to analyze.

## File Content
```
2015-12-25T04:34:51.024Z   $put  1000  First Column is id.This is a string column. Tab is \t,\nno break line,backslash is \\, 中文isOK. \t\r\n\#\@\\  This is another column, column is split by <tab>   #123456789  That's an number column.
2015-12-25T04:34:51.024Z   $put  1001  Insert New Row .  #1000 That's an number column.
2015-12-25T04:34:51.024Z   $del  1000
2015-12-25T04:34:51.024Z   $put  1001  Update   .  #2000 Updated values.
```


## API
### linedb(file, options)
```
var db = linedb(file)
```

### Event: open
### db.put(id, cols)
`cols` is array type.

```
db.put('user:1000', ['小李', 20, 165])
```

### db.get(id)
returns `cols`
```
var cols = db.get('user:1000')
console.log(cols)
```

### db.del(id)
Delete row.
```
db.del('user:1000')
```

### db.close()

## TODO
* support big file
    * 2 level cache
        1. row cache
        2. key block offset cache
        3. LRU block cache
        4. key insert order iteration
* db.compact()
* low memeory usage
    * bloom filter
    * $fill 0000000 to fill block log file into fixed size.
    * metatable to improve speed.

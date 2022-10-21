import {fromString, toString} from './string.js'

const input = `
name [me]
lalal [you]
list [[1][2] [  3  ]]
`

const output = toString(fromString(input))

console.assert(output.replace(/\s/g, '') === input.replace(/\s/g, ''), output)

console.assert(output.includes('[  3  ]'))
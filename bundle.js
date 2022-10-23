// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

const parseJevko = (str, { opener ='[' , closer =']' , escaper ='`'  } = {})=>{
    const parents = [];
    let parent = {
        subjevkos: []
    }, prefix = '', h = 0, isEscaped = false;
    let line = 1, column = 1;
    for(let i = 0; i < str.length; ++i){
        const c = str[i];
        if (isEscaped) {
            if (c === escaper || c === opener || c === closer) isEscaped = false;
            else throw SyntaxError(`Invalid digraph (${escaper}${c}) at ${line}:${column}!`);
        } else if (c === escaper) {
            prefix += str.slice(h, i);
            h = i + 1;
            isEscaped = true;
        } else if (c === opener) {
            const jevko = {
                subjevkos: []
            };
            parent.subjevkos.push({
                prefix: prefix + str.slice(h, i),
                jevko
            });
            prefix = '';
            h = i + 1;
            parents.push(parent);
            parent = jevko;
        } else if (c === closer) {
            parent.suffix = prefix + str.slice(h, i);
            prefix = '';
            h = i + 1;
            if (parents.length < 1) throw SyntaxError(`Unexpected closer (${closer}) at ${line}:${column}!`);
            parent = parents.pop();
        }
        if (c === '\n') {
            ++line;
            column = 1;
        } else {
            ++column;
        }
    }
    if (isEscaped) throw SyntaxError(`Unexpected end after escaper (${escaper})!`);
    if (parents.length > 0) throw SyntaxError(`Unexpected end: missing ${parents.length} closer(s) (${closer})!`);
    parent.suffix = prefix + str.slice(h);
    parent.opener = opener;
    parent.closer = closer;
    parent.escaper = escaper;
    return parent;
};
const escape = (str)=>{
    let ret = '';
    for (const c of str){
        if (c === '[' || c === ']' || c === '`') ret += '`';
        ret += c;
    }
    return ret;
};
const jevkoToPrettyString = (jevko)=>{
    const { subjevkos , suffix  } = jevko;
    let ret = '';
    for (const { prefix , jevko: jevko1  } of subjevkos){
        ret += `${escapePrefix(prefix)}[${recur(jevko1, '  ', '')}]\n`;
    }
    return ret + escape(suffix);
};
const escapePrefix = (prefix)=>prefix === '' ? '' : escape(prefix) + ' ';
const recur = (jevko, indent, prevIndent)=>{
    const { subjevkos , suffix  } = jevko;
    let ret = '';
    if (subjevkos.length > 0) {
        ret += '\n';
        for (const { prefix , jevko: jevko1  } of subjevkos){
            ret += `${indent}${escapePrefix(prefix)}[${recur(jevko1, indent + '  ', indent)}]\n`;
        }
        ret += prevIndent;
    }
    return ret + escape(suffix);
};
const argsToJevko = (...args)=>{
    const subjevkos = [];
    let subjevko = {
        prefix: ''
    };
    for(let i = 0; i < args.length; ++i){
        const arg = args[i];
        if (Array.isArray(arg)) {
            subjevko.jevko = argsToJevko(...arg);
            subjevkos.push(subjevko);
            subjevko = {
                prefix: ''
            };
        } else if (typeof arg === 'string') {
            subjevko.prefix += arg;
        } else throw Error(`Argument #${i} has unrecognized type (${typeof arg})! Only strings and arrays are allowed. The argument's value is: ${arg}`);
    }
    return {
        subjevkos,
        suffix: subjevko.prefix
    };
};
const escapePrefix1 = (prefix)=>prefix === '' ? '' : prefix + ' ';
const recur1 = (jevko, indent, prevIndent)=>{
    const { subjevkos , suffix  } = jevko;
    let ret = [];
    if (subjevkos.length > 0) {
        ret.push('\n');
        for (const { prefix , jevko: jevko1  } of subjevkos){
            ret.push(indent, escapePrefix1(prefix), recur1(jevko1, indent + '  ', indent), '\n');
        }
        ret.push(prevIndent);
    }
    ret.push(suffix);
    return ret;
};
const jevkoToString = (jevko)=>{
    const { subjevkos , suffix  } = jevko;
    let ret = '';
    for (const { prefix , jevko: jevko1  } of subjevkos){
        ret += `${escape(prefix)}[${jevkoToString(jevko1)}]`;
    }
    return ret + escape(suffix);
};
const toJevko = (value, { open ='[' , close =']' , escape ='`'  } = {})=>{
    if (typeof value === 'string') {
        let suffix = '';
        for (const c of value){
            if (c === open || c === close || c === escape) suffix += escape;
            suffix += c;
        }
        return {
            subjevkos: [],
            suffix
        };
    }
    if (Array.isArray(value)) {
        const subjevkos = [];
        if (value.length === 0) throw Error(`Empty Array not allowed`);
        else for (const v of value){
            subjevkos.push({
                prefix: '',
                jevko: toJevko(v)
            });
        }
        return {
            subjevkos,
            suffix: ''
        };
    }
    if (value !== null && typeof value === 'object') {
        const subjevkos1 = [];
        const entries = Object.entries(value);
        if (entries.length === 0) throw Error(`Empty object not allowed`);
        else if (Object.hasOwn(value, '')) throw Error(`Empty key not allowed`);
        else for (const [k, v1] of entries){
            if (typeof k !== 'string') throw Error(`Nonstring keys not allowed`);
            if (k.trim() !== k) throw Error(`Leading or trailing space in keys not allowed`);
            subjevkos1.push({
                prefix: k,
                jevko: toJevko(v1)
            });
        }
        return {
            subjevkos: subjevkos1,
            suffix: ''
        };
    }
    throw Error(`Unrecognized value: ${value}`);
};
const fromJevko = (jevko)=>{
    const { subjevkos , suffix  } = jevko;
    if (subjevkos.length === 0) return suffix;
    if (suffix.trim() !== '') throw Error('nonempty suffix');
    const { prefix  } = subjevkos[0];
    if (prefix.trim() === '') {
        const ret = [];
        for (const { prefix: prefix1 , jevko: jevko1  } of subjevkos){
            if (prefix1.trim() !== '') throw Error('nonempty prefix');
            ret.push(fromJevko(jevko1));
        }
        return ret;
    }
    const ret1 = Object.create(null);
    for (const { prefix: prefix2 , jevko: jevko2  } of subjevkos){
        const key = prefix2.trim();
        if (key in ret1) throw Error(`key ${key} duplicated!`);
        ret1[key] = fromJevko(jevko2);
    }
    return ret1;
};
export { fromJevko as fromJevko, toJevko as toJevko };
const fromString = (str)=>fromJevko(parseJevko(str));
const toString = (value)=>jevkoToPrettyString(toJevko(value));
export { fromString as fromString, toString as toString };

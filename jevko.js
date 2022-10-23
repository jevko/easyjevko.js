export const toJevko = (value) => {
  if (typeof value === 'string') {
    return {subjevkos: [], suffix: value}
  }
  if (Array.isArray(value)) {
    const subjevkos = []
    if (value.length === 0) throw Error(`Empty Array not allowed`)
    else for (const v of value) {
      subjevkos.push({prefix: '', jevko: toJevko(v)})
    }
    return {subjevkos, suffix: ''}
  }
  if (value !== null && typeof value === 'object') {
    const subjevkos = []
    const entries = Object.entries(value)

    if (entries.length === 0) throw Error(`Empty object not allowed`)
    else if (Object.hasOwn(value, '')) throw Error(`Empty key not allowed`)
    else for (const [k, v] of entries) {
      if (typeof k !== 'string') throw Error(`Nonstring keys not allowed`)
      if (k.trim() !== k) throw Error(`Leading or trailing space in keys not allowed`)
      subjevkos.push({prefix: k, jevko: toJevko(v)})
    }
    return {subjevkos, suffix: ''}
  }
  throw Error(`Unrecognized value: ${value}`)
}

export const fromJevko = (jevko) => {
  const {subjevkos, suffix} = jevko

  if (subjevkos.length === 0) return suffix

  if (suffix.trim() !== '') throw Error('nonempty suffix')

  const {prefix} = subjevkos[0]

  if (prefix.trim() === '') {
    const ret = []

    for (const {prefix, jevko} of subjevkos) {
      if (prefix.trim() !== '') throw Error('nonempty prefix')
      ret.push(fromJevko(jevko))
    }
  
    return ret
  }

  const ret = Object.create(null)

  for (const {prefix, jevko} of subjevkos) {
    const key = prefix.trim()
    if (key in ret) throw Error(`key ${key} duplicated!`)
    ret[key] = fromJevko(jevko)
  }

  return ret
}

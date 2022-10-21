import {parseJevko, jevkoToPrettyString} from "./deps.js"
import {fromJevko, toJevko} from './mod.js'

export const fromString = (str) => fromJevko(parseJevko(str))
export const toString = (value) => jevkoToPrettyString(toJevko(value))
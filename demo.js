// run this script with
//
//     node --experimental-network-imports demo.js
//
// on Node.js or
//
//     deno run --allow-net --allow-read demo.js
//
// on Deno

(async () => {
  const {parseJevko} = await import("https://cdn.jsdelivr.net/gh/jevko/parsejevko.js@v0.1.6/mod.js")
  const {fromJevko} = await import('./mod.js')

  const v = parseJevko(`
  id [johnny]
display name [John Doe]
organization id [megacorp]
follower ids [
  [roger]
  [alice]
  [bob]
]
  `)
    
  console.log(fromJevko(v))
  // this should print
  // {
  //   id: "johnny",
  //   "display name": "John Doe",
  //   "organization id": "megacorp",
  //   "follower ids": [ "roger", "alice", "bob" ]
  // }
})()

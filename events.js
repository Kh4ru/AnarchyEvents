//fichier des evenements
const events = [
  {name : "TP Random",command:"/tp @r 855 222 14"},
  {name : "Spawn Ender Dragon",command:"/summon ender_dragon"},
  {name : "Spawn Wither",command:"/summon wither"},
  {name : "Spawn Creeper",command:"/summon creeper"},
  {name : "Blindness",command:"/effect give @a blindness 30"},
  {name : "Pluie de TNT",command:"/execute at @a run summon minecraft:tnt ~ ~ ~"},
  {name : "Controles inversés",command:"/execute as @a run data merge entity @s {NoGravity:1b}"},
  {name:"Paralysie",command:"/effect give @a minecraft:slowness 15 255"}
]
module.exports = {events};
import fs from 'fs';

let content = fs.readFileSync("javaScript/dolgozatok/dolgozat-befozes/uvegek.txt", {encoding: "Utf8"})

const temp = content.trim().split(',')
const arr = temp.map(e => +e)

console.log("2.feladat:")
const input = 50

if(input < 1 || input > 200)
{
    console.log("Hibás adat.")
}
else
{

console.log(`Mari néni lekvárja (dl): ${input}`)

console.log("3.feladat:")
let max = arr[0]
let index = 0

for(let i = 0; i < arr.length; i++)
{
    if(max < arr[i])
    {
        max = arr[i];
        index = (i + 1) 
        
    }
    
}
console.log(`A legnagyobb üveg: ${max} dl és ${index}. a sorban.`)

console.log("4.feladat")

let ossz = 0
for(let i = 0;i < arr.length;i++)
{
    ossz += arr[i] 
}

if(ossz > input)
{
    console.log("Elegendő üveg volt.")
}
else
{
    console.log("Maradt lekvár.")
}
}
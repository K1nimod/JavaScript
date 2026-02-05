import input from "./input.js";

let modell = "";
let marka = "";
let ev = "";
let id = "";
let szoveg = "";

const valasz = await input("Válasszon(GET, POST, PUT, DELETE,GET by id): ");
switch(valasz)
{
    case "GET": fetch("https://surveys-5jvt.onrender.com/api/cars",
                {   
                    method: 'GET',
                    headers:
                        {
                        'Content-type': 'application/json; charset=UTF-8',
                        }
                })
                .then((response) => response.json())
                .then((json) => console.log(json));

                break;


    case "POST": 
                    modell = await input("Adjon meg egy modellt: ");
                    marka = await input("Adjon meg egy márkát: ");
                    ev = await input("Adja  meg az évjáratot: ");
                    
                    fetch("https://surveys-5jvt.onrender.com/api/cars",
                    {   
                        method: 'POST',
                        body: JSON.stringify(
                            {
                            model: modell,
                            brand: marka,
                            year: ev,
                            }),
                            headers:
                            {
                                'Content-type': 'application/json; charset=UTF-8',
                            }


                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));

                    break;

    case "PUT":     id = await input("Adja meg az id-t: ");
                    szoveg = "https://surveys-5jvt.onrender.com/api/cars/" + id;
    
                    modell = await input("Adja meg a modellt: ");
                    marka = await input("Adja meg a márkát: ");
                    ev = await input("Adja  meg az évjáratot: ");
    
                    fetch(szoveg,
                    {   
                        method: 'PUT',
                        body: JSON.stringify(
                            {
                            model: modell,
                            brand: marka,
                            year: ev,
                            }),
                            headers:
                            {
                                'Content-type': 'application/json; charset=UTF-8',
                            }


                        })
                        .then((response) => response.json())
                        .then((json) => console.log(json));

                        break;

    case "DELETE":
                id = await input("Adja meg az id-t: ");

                szoveg = "https://surveys-5jvt.onrender.com/api/cars/" + id;

                fetch(szoveg,
                    {   
                        method: 'DELETE', 
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));
                
                break;

    case "GET by id":
                    id = await input("Adja meg az id-t: ");

                    szoveg = "https://surveys-5jvt.onrender.com/api/cars/" + id;

                    fetch(szoveg,
                    {   
                        method: 'GET', 
                        
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));

                break;
    default:
        console.log("Hiba: Érvénytelen választás!");



}
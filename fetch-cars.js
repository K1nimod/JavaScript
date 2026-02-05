import input from "./input.js";

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


    case "POST": 
                    const modell = await input("Adjon meg egy modellt: ");
                    const marka = await input("Adjon meg egy márkát: ");
                    const ev = await input("Adja  meg az évjáratot: ");
                    
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

    case "PUT":     const modell2 = await input("Adja meg a modellt: ");
                    const marka2 = await input("Adja meg a márkát: ");
                    const ev2 = await input("Adja  meg az évjáratot: ");
    
                    fetch(szoveg,
                    {   
                        method: 'PUT',
                        body: JSON.stringify(
                            {
                            model: modell2,
                            brand: marka2,
                            year: ev2,
                            }),
                            headers:
                            {
                                'Content-type': 'application/json; charset=UTF-8',
                            }


                        })
                        .then((response) => response.json())
                        .then((json) => console.log(json));

    case "DELETE":
                const id = await input("Adja meg az id-t: ");

                let szoveg = "https://surveys-5jvt.onrender.com/api/cars/" + id;

                fetch(szoveg,
                    {   
                        method: 'DELETE', 
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));

    case "GET by id":
                    const id2 = await input("Adja meg az id-t: ");

                    let szoveg2 = "https://surveys-5jvt.onrender.com/api/cars/" + id2;

                    fetch(szoveg,
                    {   
                        method: 'GET', 
                        
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));



}
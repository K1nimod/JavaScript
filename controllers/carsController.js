const cars =[
    {id: 1, brand:"Volkswagen", modell: "Golf"},
    {id: 2, brand:"Mazda", modell:"323"},
    {id: 3, brand:"Chevrolet", modell:"Aevo"}
]

export const getAllCars = (req,res) =>{
    res.status(200).json(cars);
}

export const getCarId = (req,res) =>{
    const id = +req.params.id;
    const car = cars.find(x => x.id === id)
    if(!car)
    {
        return res.status(404).json({message: "Nincs ilyen id"})
    }
    res.json(car)
}

export const saveCar = (req,res) =>{
    const brand = req.body.brand
    const modell = req.body.modell
    if (!brand || !modell)
    {
        return res.status(404).json({message: "Nincs megadva márka vagy modell"})
    }
    const id = cars[cars.length - 1]?.id + 1
    const car = {id,brand,modell}
    cars.push(car)
    res.json(car)
}

export const updateCar = (req,res) =>{
    const id = +req.params.id
    const brand = req.body
    const modell = req.body
    if (!brand || !modell)
    {
        return res.status(404).json({message: "Nincs megadva márka vagy modell"})
    }
    const car = cars.find((x) => x.id === id);
    if(!car)
    {
        return res.status(404).json({message: "Nincs ilyen id-s auto"})
    }
    car.brand = brand
    car.modell = modell
    res.status(200).json({message:"Sikeres"})
}

export const updateAllCars =  (req,res) =>{
    const id = +req.params.id
    const brand = req.body
    const modell = req.body
    if (!brand || !modell)
    {
        return res.status(404).json({message: "Nincs megadva márka vagy modell"})
    }
    const car = cars.find((x) => x.id === id);
    if(!car)
    {
        return res.status(404).json({message: "Nincs ilyen id-s auto"})
    }
    car.brand = brand
    car.modell = modell
    res.status(200).json({message:"Sikeres"})

}

export const deleteCar = (req,res) =>
{
    const id = +req.params.id;
    const car = cars.find((x) => x.id === id);
    if(!car)
    {
        return res.status(404).json({message: "Nincs ilyen car"})
    }
    cars = cars.filter(x => x != car);
    res.status(200).json({message: "Sikeres"})

}
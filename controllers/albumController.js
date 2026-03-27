const albums = [
    {id: 1, band: "The Plan", title: "The Plan", year: 2001},
    {id: 2, band: "The Cars", title: "The Cars", year: 1978},
    {id: 3, band: "The Ugly Ducklings", title: "The Ugly Ducklings", year: 2005}
]

export const getAllAlbums = (req,res) => {
    res.status(200).json(albums)
}

export const getAlbumId = (req,res) =>{
    const id = +req.params.id;
    const album = albums.find(x => x.id === id)
    if(!album)
    {
        return res.status(404).json({message:"Nincs ilyen album"})
    }
    res.json(album)
}

export const saveAlbum = (req,res) =>{
    const band = req.body.band
    const title = req.body.title
    const year = req.body.year
    if(!band || !title || !year)
    {
        return res.status(404).json({message:"Nincs megadva ev vagy banda vagy cím"})
    }
    const id = albums[albums.length - 1]?.id + 1
    const album = {id,band,title,year}
    albums.push(album)
    res.json(album)
}

export const updateAlbum = (req,res) =>{
    const id = +req.params.id
    const band = req.body
    const title = req.body
    const year = req.body
    if(!band || !title || !year)
    {
        return res.status(404).json({message:"Nincs megadva ev vagy banda vagy cím"})
    }
    const album = albums.find(x => x.id === id)
    if(!album)
    {
        return res.status(404).json({message:"Nincs ilyen album"})
    }
    album.band = band 
    album.title = title
    album.year = year
    res.status(200).json({message: "Sikeres"})
}

export const updateAllAlbums = (req,res) =>{
        const id = +req.params.id
    const band = req.body
    const title = req.body
    const year = req.body
    if(!band || !title || !year)
    {
        return res.status(404).json({message:"Nincs megadva ev vagy banda vagy cím"})
    }
    const album = albums.find(x => x.id === id)
    if(!album)
    {
        return res.status(404).json({message:"Nincs ilyen album"})
    }
    album.band = band 
    album.title = title
    album.year = year
    res.status(200).json({message: "Sikeres"})
}

export const deleteAlbum = (req,res) =>{
    const id = +req.params.id
    const album = albums.find(x => x.id === id)
    if(!album)
    {
        return res.status(404).json({message:"Nincs ilyen album"})
    }
    albums = albums.filter(x => x != album)
    res.status(200).json({message: "Sikeres"})
}
import { useEffect, useState } from "react";
export function importAll(r: any) {
    return r.keys().map(r);
}

export function getAllImages() {
    const faceImages = importAll(require.context('../../database', false, /\.(png|jpe?g|svg)$/))
    console.log(faceImages)
    return faceImages
}


const Carrousel = () => {
    const [images, setImages] = useState([])

    const MINUTE_MS = 60000;
    
    useEffect(() => {
        const interval = setInterval(() => {
            setImages(getAllImages())
        }, MINUTE_MS);

        return () => clearInterval(interval)
    }, [])

    return (
    <>
    <h1>Faces Detectadas</h1>
        <div className="carrousel">
        {images.map((image) => (
            <img src={image}/>
        ))}
        </div>
    </>
        )
}


export default Carrousel
import React from "react";
import styles from "../../components/app/App.scss";

var context = require.context('../../components/clothesList/img');
var files={};

context.keys().forEach((filename)=>{
    files[filename] = context(filename);
});


const getImagesFor = shape => {
    return Object.keys(files).filter((key) => key.indexOf(shape) !== -1).map(key => files[key]);
};

const ClothesForGruszka = () => {
    return <div>
        { getImagesFor("gruszka").map(imageSrc => {
            return <img key={`image_${imageSrc}`} src={ imageSrc }/>
        })}
    </div>
}

const ClothesForJablko = () => {
    return <div>
        { getImagesFor("jablko").map(imageSrc => {
            return <img key={`image_${imageSrc}`} src={ imageSrc }/>
        })}
    </div>
}
const ClothesForKlepsydra = () => {
    return <div>
        { getImagesFor("klepsydra").map(imageSrc => {
            return <img key={`image_${imageSrc}`} src={ imageSrc }/>
        })}
    </div>
}

const ClothesForRozek = () => {
    return <div>
        { getImagesFor("rozek").map(imageSrc => {
            return <img key={`image_${imageSrc}`} src={ imageSrc }/>
        })}
    </div>
}

const ClothesForGazeta = () => {
    return <div>
        { getImagesFor("gazeta").map(imageSrc => {
            return <img key={`image_${imageSrc}`} src={ imageSrc }/>
        })}
    </div>
}
const ClothesList = ({shape}) => {
    return <div className={styles.clothesContainer}>
        
        {shape === "gruszka" && <ClothesForGruszka></ClothesForGruszka>}
        {shape === "jablko" && <ClothesForJablko></ClothesForJablko>}
        {shape === "klepsydra" && <ClothesForKlepsydra></ClothesForKlepsydra>}
        {shape === "rozek" && <ClothesForRozek></ClothesForRozek>}
        {shape === "gazeta" && <ClothesForGazeta></ClothesForGazeta>}
    </div>
}

export default ClothesList;
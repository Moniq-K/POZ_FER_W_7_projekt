import React from "react";
import styles from "../app/App.scss";
import image from "../../assets/typy.jpg";

export default class Silhouette extends React.Component {
    render() {
        return <div className={styles.formContainer}>
            <a style={{visibility: "hidden", width: 0, height: 0}} name="silhouette"/>
            <div className={styles.container}>
                <div className={styles.containerImg}>
                    <img src={image} className={styles.image} height="500"/>
                    <div className={styles.over}>
                        <div className={[styles.border, styles[this.props.shape]].join(" ")}/>
                    </div>
                </div>
                <div className={styles.descriptions}>
                    <h2 className={styles.descriptionsTextH2}>{this.props.shape !== null && "Typ sylwetki"} {this.props.shape}</h2>
                    {this.props.shape === "jablko" &&
                    <p className={styles.textNormal}>Kobiety z taką figurą mają duży biust, brak wcięcia w talii i
                        najczęściej, wystający brzuszek ale także zgrabne, szczupłe nogi. Najważniejsze w tym przypadku
                        jest nadanie sylwetce smukłości poprzez noszenie ubrań z miękkich materiałów. Na górze najlepiej
                        stosować ciemne barwy a na dole – jasne.Ciemny top pod kurtką lub koszulą sprawi, że biust i
                        brzuszek będą wydawały się mniejsze.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span> duży biust, brak wcięcia
                        w
                        talii<br/>
                        <span className={styles.textBold}>Co nosić?<br/></span> bluzki i sukienki z dekoltem V, szerokie
                        paski w talii<br/>
                        <span className={styles.textBold}>Czego unikać?<br/></span> dużych wzorów na koszulach
                    </p>}
                    {this.props.shape === "gruszka" &&
                    <p className={styles.textNormal}>Jeżeli to biodra są szersze od ramion o więcej niż 5 cm, to
                        najprawdopodobniej jesteś gruszką. W tym przypadku, najważniejsze jest aby zrównoważyć linię
                        bioder i ramion. Powinnaś więc zamaskować biodra za pomocą ciemnych i prostych spodni, a ramiona
                        podkreślić jasną koszulką lub kolorowym, wzorzastym sweterkiem czy marynarką.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span> szerokie biodra<br/>
                        <span className={styles.textBold}>Co nosić?<br/></span> ciemne spodnie i spódnice z jasną górą,
                        ołówkowe spódnice,sukienki rozkloszowane oraz z rękawem 3/4<br/>
                        <span className={styles.textBold}>Czego unikać?<br/></span> jasnych spodni ze zwężanymi
                        nogawkami,ubrań w poziome paski.
                    </p>}
                    {this.props.shape === "gazeta" &&
                    <p className={styles.textNormal}>Gdy po zmierzeniu szerokości talii i bioder, różnica między nimi
                        nie przekracza 5cm, jesteś
                        gazetą. Wybierając stroje powinnaś dążyć do stworzenia talii i podkreślenia bioder za pomocą
                        grubych pasków oraz rozszerzanych spódnic.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>wąskie ramiona i biodra,
                        brak
                        wcięcia w
                        talii<br/><span className={styles.textBold}>Co nosić?<br/></span>
                        rozkloszowane spódnice, lekko dopasowane lub proste sukienki z cieńkim ciemnym paskiem<br/>
                        <span className={styles.textBold}>Czego unikać?<br/></span>
                        oversizowych ubrań bez wcięcia w talii, jasnych pasków - mogą optycznie pogrubiać
                    </p>}
                    {this.props.shape === "klepsydra" &&
                    <p className={styles.textNormal}>Jeśli Twoje biodra są szersze od talii o co najmniej 5 cm – masz
                        się z czego cieszyć! Jesteś
                        w gronie kobiet z najbardziej pożądaną sylwetką czyli klepsydrą. Kobiety posiadające figurę
                        klepsydry są w bardzo komfortowej sytuacji, gdyż ich ciała mają idealne proporcje i w dużej
                        mierze mogą nosić wszystkie typy ubrań.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>wąska talia,ramiona i
                        biodra
                        równej szerokości<br/><span className={styles.textBold}>Co nosić?<br/></span>
                        sukienki z wcięciem w talii, minimalistyczne,przylegające stroje w jednolitych kolorach<br/>
                        <span className={styles.textBold}>Czego unikać?<br/></span>luźnych, workowatych i wzorzystych
                        ubrań,
                        dużych dekoltów.
                    </p>}
                    {this.props.shape === "rozek" &&
                    <p className={styles.textNormal}>Jeśli Twoje ramiona są szersze niż biodra o więcej niż 5cm, to
                        znak, że to właśnie od tej
                        części ciała powinnaś odwracać uwagę. Najprościej zrobić to poprzez noszenie jasnego dołu
                        do ciemnej góry. Warto także podkreślić biust i zaakcentować talię.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>szerokie ramiona<br/>
                        <span className={styles.textBold}>Co nosić?<br/></span>
                        jasne spodnie lub z spódnice z ciemną górą,sukienki na szerokich ramiączkach lub z delikatnymi
                        rękawkami np. z koronki<br/><span
                            className={styles.textBold}>Czego unikać?<br/></span>
                        sukienek i koszulek z cienkimi ramiączkami,bufiastych rękawów.
                    </p>}
                </div>
            </div>
        </div>
    }
}


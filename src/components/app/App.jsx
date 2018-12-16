import React from "react";
import Clothes from "../clothesList/ClothesList";
import Silhouette from "../silhouette/Silhouette";
import styles from "../../components/app/App.scss";
import image from "../../assets/typy.jpg";
import image1 from "../../assets/foto2.jpg";


const ROZEK = "rozek";
const GRUSZKA = "gruszka";
const KLEPSYDRA = "klepsydra";
const GAZETA = "gazeta";
const JABLKO = "jablko";
const DEFAULT_SHAPE = JABLKO;

const conditions = {
    [ROZEK]: ({arms, hips}) => arms - hips > 5,
    [GRUSZKA]: ({arms, hips, waist}) => (hips - arms > 5 && (arms < waist)), // biodra - ramiona > 5
    [KLEPSYDRA]: ({hips, waist, arms}) => console.log({hips, waist, arms}) || (hips - waist > 5 && (arms > waist)), // biodra - talis> 5
    [GAZETA]: ({waist, hips}) => Math.abs(hips - waist) < 5,
};

const requiedFields = ["arms", "waist", "hips"];

//ramiona < talis
//

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arms: '',
            waist: '',
            hips: '',
            weight: '',
            height: '',
            value: '',
            warning: '',
            validated: false
        }
    }

    getShape() {
        const foundShape = Object.keys(conditions).find(shapeType => {
            return conditions[shapeType](this.state)
        }) || DEFAULT_SHAPE;

        return foundShape;
    }

    isValid() {
        if (!this.state.validated) {
            return false;
        }
        const warningsKeys = Object.keys(this.state)
            .filter(stateKey => stateKey.startsWith("warning"))
            .filter(warningsKey => !warningsKey.endsWith("weight") && !warningsKey.endsWith("height"))

        const hasWarnings = warningsKeys.some(warningKey => !!this.state[warningKey]);

        return !hasWarnings;
    }

    validateField = (field) => {
        if (requiedFields.indexOf(field) === -1 && this.state[field] === '') {
            return;
        }
        const val = parseInt(this.state[field]);
        if (isNaN(val)) {
            this.setState({[`warning${field}`]: 'Pole musi zostać uzupełnione liczbą'});
        } else {
            if (val > 0) {
                this.setState({[`warning${field}`]: '', [field]: val});
            } else {
                this.setState({[`warning${field}`]: 'Liczba powinna być dodatnia'});
            }
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(nextState) !== JSON.stringify(this.state);
    }

    componentDidUpdate() {
        if (this.isValid()) {
            this.props.onShapeHinted(this.getShape());
            setTimeout(() => window.location.hash = "silhouette", 5);
        } else {
            this.props.onShapeHinted(null);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.validateField("arms");
        this.validateField("waist");
        this.validateField("hips");
        this.validateField("weight");
        this.validateField("height");

        this.setState({validated: true});
    }

    handleArmsChange = (e) => {
        this.setState({arms: e.target.value, validated: false});
    }

    handleWaistChange = (e) => {
        this.setState({waist: e.target.value, validated: false});
    }

    handleHipsChange = (e) => {
        this.setState({hips: e.target.value, validated: false});
    }
    handleWeightChange = (e) => {
        this.setState({weight: e.target.value, validated: false});
    }
    handleHeightChange = (e) => {
        this.setState({height: e.target.value, validated: false});
    }

    getBMI() {
        const weight = parseInt(this.state.weight);
        const height = parseInt(this.state.height);

        if (isNaN(weight) || isNaN(height)) {
            return null;
        }

        const bmi = (weight / Math.pow(height, 2) * 10000).toFixed(2);
        return <span className={styles.textBmi}>{bmi}</span>;
    }

    render() {
        return <div className={styles.formContainer}>
            <div className={styles.formHeaders}>
                <h1 className={styles.formTextH1}>Podaj swoje wymiary</h1>
                <h2 className={styles.formTextH2}>aby poszukać swojego typu sylwetki</h2>
            </div>

            <form className={styles.form} onSubmit={this.handleSubmit}>
                <img src={image1} className={styles.image1}/>

                <div className={[styles.formToLeft, styles.form1].join(" ")}>

                    <label>
                        <p className={styles.labelName}>Twoja waga</p>
                        <input className={styles.input} placeholder={"podaj wymiar w kg"}
                               onChange={this.handleWeightChange}
                               value={this.state.weight} type="text"/>
                        <p className={styles.warnings}>{this.state.warningweight}</p>
                    </label>
                    <label>
                        <p className={styles.labelName}>Twój wzrost</p>
                        <input className={styles.input} placeholder={"podaj wymiar w cm"}
                               onChange={this.handleHeightChange}
                               value={this.state.height} type="text"/>
                        <p className={styles.warnings}>{this.state.warningheight}</p>
                    </label>


                    <label>
                        <p className={styles.labelNameBmi}>Twoje BMI wynosi:</p>
                        <span className={styles.bmi}> {this.getBMI()} </span>
                    </label>
                </div>
                <div className={[styles.formToRight, styles.form1].join(" ")}>

                    <label>
                        <p className={styles.labelName}>Obwód ramion</p>
                        <input className={styles.input} placeholder={"podaj wymiar w cm"}
                               onChange={this.handleArmsChange} value={this.state.arms}
                               type="text"/>
                        <p className={styles.warnings}>{this.state.warningarms}</p>
                    </label>

                    <label>
                        <p className={styles.labelName}>Obwód talii</p>
                        <input className={styles.input} placeholder={"podaj wymiar w cm"}
                               onChange={this.handleWaistChange} value={this.state.waist}
                               type="text"/>
                        <p className={styles.warnings}>{this.state.warningwaist}</p>
                    </label>

                    <label>
                        <p className={styles.labelName}>Obwód bioder</p>
                        <input className={styles.input} placeholder={"podaj wymiar w cm"}
                               onChange={this.handleHipsChange} value={this.state.hips}
                               type="text"/>
                        <p className={styles.warnings}>{this.state.warninghips}</p>
                    </label>

                    <label>
                        <input className={styles.submit} type="submit" value="zatwierdź"/>
                    </label>
                </div>

            </form>
            <div className={styles.divsContainer}>

                <div className={styles.divs}>
                    <div><span className={styles.divsNo}>1</span><br/><span
                        className={styles.divTextH6}>Kalkulator BMI</span><br/>
                        <span className={styles.divTextH5}> Wskaźnik masy ciała</span><br/> Wykorzystywany
                        jest przede wszystkim do oceny ryzyka pojawienia się groźnych chorób,z których większość
                        związana jest z otyłością i dlatego kalkulator BMI to tak przydatne narzędzie.
                    </div>
                </div>

                <div className={styles.divs}>
                    <div><span className={styles.divsNo}>2</span><br/><span
                        className={styles.divTextH6}>Czym jest BMI</span><br/>
                        <span className={styles.divTextH5}> Body Mass Index</span><br/> Określa nasz stan
                        fizyczny. Bardzo ważnym uzupełnieniem BMI jest wskaźnik ilości tłuszczu brzusznego - zbyt duży
                        może oznaczać niebezpieczną otyłość brzuszną.
                    </div>
                </div>

                <div className={styles.divs}>
                    <div><span className={styles.divsNo}>3</span><br/><span
                        className={styles.divTextH6}>ZAKRES WARTOŚCI BMI</span><br/>
                        <span className={styles.divTextH5}> Dla kobiet</span><br/>
                        <ul className={styles.divList}>
                            <li> mniej niż 18,5 - niedowaga</li>
                            <li>18,5–24,99 – wartość prawidłowa</li>
                            <li>25,0–29,99 – nadwaga</li>
                            <li>30,0–39,99 – I i II stopień otyłości</li>
                            <li>więcej niż 40,0 – otyłość skrajna</li>
                        </ul>
                    </div>
                </div>
            </div>
            {/*<p className={styles.textContainer}>*/}
            {/*<p className={styles.formTextH3}> Gruszka, jabłko, klepsydra…<span className={styles.formTextH4}>którym typem sylwetki jesteś?</span>*/}
            {/*</p>*/}
            {/*<br/>*/}
            {/*<span>Określenie typu sylwetki i ubieranie się zgodnie z tym, co do niej pasuje wcale nie jest takie trudne!*/}
            {/*Aby ułatwić Ci określenie swojej sylwetki proponujemy Ci podział na pięć podstawowych typów.*/}
            {/*By sprawdzić jaką masz sylwetkę, stań przed lustrem i zmierz się w ramionach, talii i biodrach.*/}
            {/*Wprowadź wyniki, kliknij zatwiedź i gotowe!</span>*/}
            {/*</p>*/}
        </div>
    }
}

// class Silhouette extends React.Component {
//     render() {
//         return <div className={styles.formContainer}>
//             <a style={{visibility: "hidden", width: 0, height: 0}} name="silhouette"/>
//
//             <div className={styles.container}>
//                 <div className={styles.containerImg}>
//                     <img src={image} className={styles.image} height="500"/>
//                     <div className={styles.over}>
//                         <div className={[styles.border, styles[this.props.shape]].join(" ")}/>
//                     </div>
//                 </div>
//                 <div className={styles.descriptions}>
//                     <h2 className={styles.descriptionsTextH2}>{this.props.shape !== null && "Typ sylwetki"} {this.props.shape}</h2>
//                     {this.props.shape === "jablko" &&
//                     <p className={styles.textNormal}>Kobiety z taką figurą mają duży biust, brak wcięcia w talii i
//                         najczęściej, wystający brzuszek ale także zgrabne, szczupłe nogi. Najważniejsze w tym przypadku
//                         jest nadanie sylwetce smukłości poprzez noszenie ubrań z miękkich materiałów. Na górze najlepiej
//                         stosować ciemne barwy a na dole – jasne.Ciemny top pod kurtką lub koszulą sprawi, że biust i
//                         brzuszek będą wydawały się mniejsze.<br/><br/>
//                         <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span> duży biust, brak wcięcia
//                         w
//                         talii<br/>
//                         <span className={styles.textBold}>Co nosić?<br/></span> bluzki i sukienki z dekoltem V, szerokie
//                         paski w talii<br/>
//                         <span className={styles.textBold}>Czego unikać?<br/></span> dużych wzorów na koszulach
//                     </p>}
//                     {this.props.shape === "gruszka" &&
//                     <p className={styles.textNormal}>Jeżeli to biodra są szersze od ramion o więcej niż 5 cm, to
//                         najprawdopodobniej jesteś gruszką. W tym przypadku, najważniejsze jest aby zrównoważyć linię
//                         bioder i ramion. Powinnaś więc zamaskować biodra za pomocą ciemnych i prostych spodni, a ramiona
//                         podkreślić jasną koszulką lub kolorowym, wzorzastym sweterkiem czy marynarką.<br/><br/>
//                         <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span> szerokie biodra<br/>
//                         <span className={styles.textBold}>Co nosić?<br/></span> ciemne spodnie i spódnice z jasną górą,
//                         ołówkowe spódnice,sukienki rozkloszowane oraz z rękawem 3/4<br/>
//                         <span className={styles.textBold}>Czego unikać?<br/></span> jasnych spodni ze zwężanymi
//                         nogawkami,ubrań w poziome paski.
//                     </p>}
//                     {this.props.shape === "gazeta" &&
//                     <p className={styles.textNormal}>Gdy po zmierzeniu szerokości talii i bioder, różnica między nimi
//                         nie przekracza 5cm, jesteś
//                         gazetą. Wybierając stroje powinnaś dążyć do stworzenia talii i podkreślenia bioder za pomocą
//                         grubych pasków oraz rozszerzanych spódnic.<br/><br/>
//                         <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>wąskie ramiona i biodra,
//                         brak
//                         wcięcia w
//                         talii<br/><span className={styles.textBold}>Co nosić?<br/></span>
//                         rozkloszowane spódnice, lekko dopasowane lub proste sukienki z cieńkim ciemnym paskiem<br/>
//                         <span className={styles.textBold}>Czego unikać?<br/></span>
//                         oversizowych ubrań bez wcięcia w talii, jasnych pasków - mogą optycznie pogrubiać
//                     </p>}
//                     {this.props.shape === "klepsydra" &&
//                     <p className={styles.textNormal}>Jeśli Twoje biodra są szersze od talii o co najmniej 5 cm – masz
//                         się z czego cieszyć! Jesteś
//                         w gronie kobiet z najbardziej pożądaną sylwetką czyli klepsydrą. Kobiety posiadające figurę
//                         klepsydry są w bardzo komfortowej sytuacji, gdyż ich ciała mają idealne proporcje i w dużej
//                         mierze mogą nosić wszystkie typy ubrań.<br/><br/>
//                         <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>wąska talia,ramiona i
//                         biodra
//                         równej szerokości<br/><span className={styles.textBold}>Co nosić?<br/></span>
//                         sukienki z wcięciem w talii, minimalistyczne,przylegające stroje w jednolitych kolorach<br/>
//                         <span className={styles.textBold}>Czego unikać?<br/></span>luźnych, workowatych i wzorzystych
//                         ubrań,
//                         dużych dekoltów.
//                     </p>}
//                     {this.props.shape === "rozek" &&
//                     <p className={styles.textNormal}>Jeśli Twoje ramiona są szersze niż biodra o więcej niż 5cm, to
//                         znak, że to właśnie od tej
//                         części ciała powinnaś odwracać uwagę. Najprościej zrobić to poprzez noszenie jasnego dołu
//                         do ciemnej góry. Warto także podkreślić biust i zaakcentować talię.<br/><br/>
//                         <span className={styles.textBold}>Cechy charaktetystyczne:<br/></span>szerokie ramiona<br/>
//                         <span className={styles.textBold}>Co nosić?<br/></span>
//                         jasne spodnie lub z spódnice z ciemną górą,sukienki na szerokich ramiączkach lub z delikatnymi
//                         rękawkami np. z koronki<br/><span
//                             className={styles.textBold}>Czego unikać?<br/></span>
//                         sukienek i koszulek z cienkimi ramiączkami,bufiastych rękawów.
//                     </p>}
//                 </div>
//             </div>
//         </div>
//     }
// }
//

export default class App extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            shape: null
        }
    }

    setShape = shape => this.setState({shape});

    render() {
        return (
            <div>
                <Form onShapeHinted={this.setShape}/>
                <Silhouette shape={this.state.shape} onShapeChoosen={this.setShape}/>
                <Clothes shape={this.state.shape}/>
            </div>
        );
    }
}


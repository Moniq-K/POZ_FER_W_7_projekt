import React from "react";
import Clothes from "../clothesList/ClothesList";
import styles from "../../components/app/App.scss";
import image from "../../assets/typy.jpg";
import image1 from "../../assets/foto2.jpg";
import image2 from "../../assets/typy_sylwetek_blog.jpg";

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

        if (weight === 0 || height === 0) {
            return null;
        }

        const bmi = (weight / Math.pow(height, 2) * 10000).toFixed(2);
        return bmi;
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
                        <p className={styles.labelNameBmi}>Twoje BMI wynosi:</p>
                        <span className={styles.bmi}> {this.getBMI()} </span>
                    </label>
                </div>
                <div className={[styles.formToRight, styles.form1].join(" ")}>

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
                        <input className={styles.submit} type="submit" value="zatwierdź"/>
                    </label>
                    {/*<p>*/}
                    {/*Zakresy wartości BMI:<br/>*/}
                    {/*<ul>*/}
                    {/*<li> mniej niż 16 - wygłodzenie</li>*/}
                    {/*<li> 16 - 16.99 - wychudzenie</li>*/}
                    {/*<li> 17 - 18.49 - niedowaga</li>*/}
                    {/*<li> 18.5 - 24.99 - wartość prawidłowa</li>*/}
                    {/*<li> 25 - 29.99 - nadwaga</li>*/}
                    {/*<li>30 - 34.99 - I stopień otyłości</li>*/}
                    {/*<li>35 - 39.99 - II stopień otyłości</li>*/}
                    {/*<li>powyżej 40 - otyłość skrajna</li>*/}
                    {/*</ul>*/}
                    {/*</p>*/}

                </div>
            </form>


            <p className={styles.textContainer}>
                <p className={styles.formTextH3}>Gruszka, jabłko, klepsydra…<span className={styles.formTextH4}>którym typem sylwetki jesteś?</span>
                </p>
                <br/>
                <span>Określenie typu sylwetki i ubieranie się zgodnie z tym, co do niej pasuje wcale nie jest takie trudne!
                Aby ułatwić Ci określenie swojej sylwetki proponujemy Ci podział na pięć podstawowych typów.
                By sprawdzić jaką masz sylwetkę, stań przed lustrem i zmierz się w ramionach, talii i biodrach.
                    Wprowadź wyniki, kliknij zatwiedź i gotowe!</span>
            </p>
        </div>
    }
}

class Silhouette extends React.Component {
    render() {
        return <div className={styles.formContainer}>

            <div className={styles.container}>

                <div className={[styles.container, styles.withFloat].join(" ")}>
                    <img src={image} className={styles.image} height="600"/>
                    <div className={styles.over}>
                        <div className={[styles.border, styles[this.props.shape]].join(" ")}/>
                    </div>
                </div>
                <div className={[styles.container, styles.withFloat, styles.descriptions].join(" ")}>
                    <h2 className={styles.formTextH2}>Typ Twojej sylwetki to {this.props.shape} </h2>
                    {this.props.shape === "jablko" &&
                    <p className={styles.textNormal}>Kobiety z taką figurą mają duży biust, brak wcięcia w talii i najczęściej, wystający brzuszek
                        ale
                        także zgrabne, szczupłe nogi. Najważniejsze w tym przypadku jest nadanie sylwetce smukłości
                        poprzez noszenie ubrań z miękkich materiałów. Na górze najlepiej stosować ciemne barwy a na
                        dole
                        – jasne. Bardzo ważne – postaw na warstwy! Ciemny top pod kurtką lub koszulą sprawi, że
                        biust i
                        brzuszek będą wydawały się mniejsze.<br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:</span> duży biust, brak wcięcia w talii, zgrabne nogi<br/>
                        <span className={styles.textBold}>Co nosić?</span> bluzki i sukienki z dekoltem V, szerokie paski w talii<br/>
                        <span className={styles.textBold}>Czego unikać?</span> dużych wzorów na koszulach,golfów pod szyję
                    </p>}
                    {this.props.shape === "gruszka" &&
                    <p>Jeżeli to biodra są szersze od ramion o więcej niż 5 cm, to najprawdopodobniej jesteś
                        gruszką. W tym przypadku, najważniejsze jest aby zrównoważyć linię bioder i ramion. Powinnaś
                        więc zamaskować biodra za pomocą ciemnych i prostych spodni, a ramiona podkreślić jasną koszulką
                        lub kolorowym, wzorzastym sweterkiem czy marynarką.<br/><br/>
                        <span className={styles.textBold}>Cechy charaktetystyczne:</span> szerokie biodra<br/>
                        <span className={styles.textBold}>Co nosić?</span> ciemne spodnie i spódnice z jasną górą, kolorowe marynarki<br/>
                        <span className={styles.textBold}>Czego unikać?</span> jasnych spodni ze zwężanymi nogawkami</p>}
                    {this.props.shape === "gazeta" &&
                    <p>Gdy po zmierzeniu szerokości talii i bioder, różnica między nimi nie przekracza 5cm, jesteś
                        gazetą. Wybierając stroje powinnaś dążyć do stworzenia talii i podkreślenia bioder za pomocą
                        grubych pasków oraz rozszerzanych spódnic.</p>}
                    {this.props.shape === "klepsydra" &&
                    <p>Jeśli Twoje biodra są szersze od talii o co najmniej 5 cm – masz się z czego cieszyć! Jesteś
                        w
                        gronie kobiet z najbardziej pożądaną sylwetką czyli klepsydrą. Kobiety posiadające figurę
                        klepsydry są w bardzo komfortowej sytuacji, gdyż ich ciała mają idealne proporcje i w dużej
                        mierze mogą nosić wszystkie typy ubrań.</p>}
                    {this.props.shape === "rozek" &&
                    <p>Jeśli Twoje ramiona są szersze niż biodra o więcej niż 5cm, to znak, że to właśnie od tej
                        części
                        ciała powinnaś odwracać uwagę. Najprościej zrobić to poprzez noszenie jasnego dołu (spodni
                        czy
                        spódnicy) do ciemnej góry. Najlepiej jeśli będą one rozszerzały się ku dołowi. Warto także
                        podkreślić biust i zaakcentować talię. Sylwetkę tę, mogłaś zobaczyć w magazynach pod nazwą
                        rożek.</p>}
                </div>
            </div>
        </div>
    }
}


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


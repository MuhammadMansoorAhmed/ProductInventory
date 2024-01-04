import "./loader.scss"
import ReactDOM from "react-dom"

const Loader = () => {
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={process.env.PUBLIC_URL + "/Assets/loader.gif"} alt="Loading..." />
            </div>
        </div>,
        document.getElementById("loader")
    )
}

export const SpinnerImage = () => {
    return (
        <div className="--center-all">
            <img src={process.env.PUBLIC_URL + "/Assets/loader.gif"} alt="Loading..." />
        </div>
    )
}

export default Loader

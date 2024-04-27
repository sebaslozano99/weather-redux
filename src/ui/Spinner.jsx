import PropTypes from "proptypes";



const styles = {
    bigSpinner: "border-8 border-yellow-600 border-x-transparent w-[300px] h-[300px] rounded-[50%] animate-spin",
    smallSpinner: "border-8 border-yellow-600 border-x-transparent w-[100px] h-[100px] rounded-[50%] animate-spin",
  }


const Spinner = ({spinnerType}) => {
  return (
    <div className="w-full h-screen grid place-items-center" >
        <div className={styles[spinnerType]} ></div>
    </div>
  )
}

export default Spinner

Spinner.propTypes = {
    spinnerType: PropTypes.string,
}

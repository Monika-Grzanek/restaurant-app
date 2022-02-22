//import { PropTypes } from "prop-types"
import './InputNumber.module.scss';

export const InputNumber = props => {
    return (
        <input 
            value={props.value}
            onChange={props.onChange}
            type="number">
        </input>
    )
}

/*Input.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.number
    ]),
    onChange: PropTypes.func,

}*/
import { PropTypes } from "prop-types"
import './Input.module.scss';

export const Input = props => {
    return (
        <input 
            max={props.max} 
            min={0}
            value={props.value}
            onChange={props.action}
            type={props.type}>
        </input>
    )
}

Input.propTypes = {
    className: PropTypes.string,
    max: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    action: PropTypes.func,
    type: PropTypes.string
}
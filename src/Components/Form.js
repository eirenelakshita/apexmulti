import React from "react";
import Select from 'react-select';

const Form = props => (
 <div id="form-group">
    <form>
        <Select
        options={props.menu}
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        value={props.selectedOption}
        onChange={props.handleChange}
        />
    </form>
 </div>
)

export default Form;
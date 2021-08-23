import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useFormik } from 'formik';

export default function RadioBtn({ onChange }) {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Register as</FormLabel>
            <RadioGroup row aria-label="position" name="role" defaultValue="top" value={useFormik.role}>
                <FormControlLabel
                    required
                    name="role"
                    value="company"
                    control={<Radio color="primary" />}
                    onChange={onChange}
                    label="Company" />
                <FormControlLabel
                    required
                    name="role"
                    value="student"
                    onChange={onChange}
                    control={<Radio color="primary" />}
                    label="Student" />
            </RadioGroup>
        </FormControl>
    );
}

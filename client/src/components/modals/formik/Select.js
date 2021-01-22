import React from 'react'
import { Field, ErrorMessage } from 'formik'
import {TextError} from './TextError'
import styles from '../addHabit/AddHabit.module.css'

export default function Select(props) {
    const { label, name, options, ...rest } = props
    return (<div className={styles.errorFolder}>
        <label className={styles.label}>
            <p className={styles.inputName}>{label}</p>
            <Field as='select' id={name} name={name} {...rest}>
                {options.map(option => {
                    return (
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                    )
                })}
            </Field></label>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}
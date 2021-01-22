import React from 'react'
import { Field, ErrorMessage } from 'formik'
import {TextError} from './TextError'
import styles from '../addHabit/AddHabit.module.css'

export default function Input(props) {
    const { label, name, ...rest } = props
    return (
        <div className={styles.errorFolder}>
            <label className={styles.label}>
                <p className={styles.inputName}>{label}</p>
                <Field id={name} name={name} {...rest} placeholder="Введіть назву"/></label>
            <ErrorMessage component={TextError} name={name} />
        </div>
    )
}
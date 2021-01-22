import React from 'react'
import { Field, ErrorMessage } from 'formik'
import {TextErrorSmall} from './TextError'
import styles from '../addHabit/AddHabit.module.css'

export function PointsInput(props) {
    const { label, name, ...rest } = props
    return (<div className={styles.errorFolder}>
        <label className={[styles.label, styles.pointsLabel].join(' ')}>
            <p className={styles.inputName}>{label}</p>
            <Field id={name} name={name} {...rest} placeholder="__" />
        </label>
        <ErrorMessage component={TextErrorSmall} name={name} />
        </div>
    )
}

export function DaysInput(props) {
    const { label, name, ...rest } = props
    return (<div className={styles.errorFolder}>
        <label className={[styles.label, styles.daysLabel].join(' ')}>
            <p className={styles.inputName}>{label}</p>
            <Field id={name} name={name} {...rest} placeholder="___" />
        </label>
        <ErrorMessage component={TextErrorSmall} name={name} />
    </div>
    )
}
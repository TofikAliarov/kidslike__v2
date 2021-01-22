import React from 'react'
import Input from './Input'
import Select from './Select'
import { PointsInput, DaysInput } from './PointsInput'
import FileInput from './FileInput'

export default function FormikControl(props) {
    const { control, ...rest } = props
    switch (control) {
        case 'input':
            return <Input {...rest} />
        case 'select':
            return <Select {...rest} />
        case 'pointsInput':
            return <PointsInput {...rest} />
        case 'daysInput':
            return <DaysInput {...rest} />
        case 'fileInput':
            return <FileInput {...rest} />
        default:
            return null
    }
}

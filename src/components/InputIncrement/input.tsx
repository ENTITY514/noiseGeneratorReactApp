import React from "react"
import style from "./style.module.css"

interface IInputProps {
    children?: string
    value: number
    onChange?: (value: number | string) => void
}

export const InputIncrement: React.FC<IInputProps> = ({
    value,
    children,
    onChange = () => { },
}) => {
    const [val, setValue] = React.useState<number>(value)

    const handlerChange = (plus: boolean) => {
        if (plus) { setValue(prev => prev + 1) }
        else { setValue(prev => prev - 1) }
        onChange(val)
    }


    return (
        <div className={style.container} >
            {children}
            <div className={style.button} onClick={() => { handlerChange(false) }}>-</div>
            <div className={style.button}>{val}</div>
            <div className={style.button} onClick={() => { handlerChange(true) }}>+</div>
        </div >
    )
}
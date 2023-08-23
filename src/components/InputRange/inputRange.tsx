import React from "react"
import style from "./inputRange.module.css"
import { Text } from "../../UI/Text/text"
import { Wrapper } from "../../UI/Wrapper/wrapper"
import { COLORS } from "../../UI/colors"

interface IInputRangeProps {
    title: string
    value: number
    max: number
    min: number
    onChange?: (value: number) => void
}

export const InputRange: React.FC<IInputRangeProps> = ({
    title,
    value: val,
    max, min,
    onChange = () => { },
}) => {
    const [value, setValue] = React.useState<number>(val)
    const input_ref = React.useRef<HTMLInputElement>(null)

    const handlerChange = () => {
        if (input_ref.current !== null) {
            setValue(Number(input_ref.current.value))
            onChange(Number(input_ref.current.value))
        }
    }

    return (
        <Wrapper width="300px" backgroundColor={COLORS.DARK_GREY}>
            <Text>{title}</Text>
            <Text>{value}</Text>
            <input
                ref={input_ref}
                className={style.input}
                type={"range"}
                value={value}
                onChange={handlerChange}
                max={max}
                min={min}
            />
        </Wrapper>
    )
}
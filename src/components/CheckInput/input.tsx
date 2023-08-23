import React from "react"
import style from "./style.module.css"
import { Wrapper } from "../../UI/Wrapper/wrapper"
import { COLORS } from "../../UI/colors"
import { Text } from "../../UI/Text/text"

interface ICheckInputProps {
    title: string
    value: boolean
    onEnter?: (value: boolean) => void
    onChange?: (value: boolean) => void
}

export const CheckInput: React.FC<ICheckInputProps> = ({
    value: val,
    title,
    onEnter = () => { },
    onChange = () => { },
}) => {
    const [value, setValue] = React.useState<boolean>(val)
    const input_ref = React.useRef<HTMLInputElement>(null)

    const handlerChange = () => {
        if (input_ref.current !== null) {
            setValue(input_ref.current.checked)
            onChange(input_ref.current.checked)
        }
    }

    const hadlerKeyDown = (e: React.KeyboardEvent) => {
        if (e.code === "Enter") {
            onEnter(value)
            input_ref.current?.blur()
        }
    }

    return (
        <Wrapper width="300px" backgroundColor={COLORS.DARK_GREY}>
            <Text>{title}</Text>
            <input
                ref={input_ref}
                className={style.input}
                type={"checkbox"}
                checked={value}
                onChange={handlerChange}
                onKeyDown={hadlerKeyDown}
            />
        </Wrapper>
    )
}
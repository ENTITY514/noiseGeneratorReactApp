import { COLORS } from "../colors"
import style from "./text.module.css"

interface ITextProps {
    children: string | JSX.Element | React.ReactNode
    color?: COLORS
    fontSize?: string
    cursor?: string
    onClick?: () => void
    textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
    lineHeight?: string
    fontWeight?: number
    display?: string
    margin?: string

}

export const Text: React.FC<ITextProps> = ({
    children,
    color = COLORS.WHITE,
    fontSize = "12px",
    cursor,
    onClick,
    textAlign,
    lineHeight = "normal",
    fontWeight = "500",
    display,
    margin
}) => {
    return (
        <div className={style.container} style={{ color, fontSize, cursor, textAlign, lineHeight, fontWeight, display, margin }} onClick={onClick}>
            {children}
        </div>
    )
}
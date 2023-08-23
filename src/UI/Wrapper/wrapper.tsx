import { COLORS } from "../colors"
import style from "./wrapper.module.css"

interface IStandartWrapperProps {
    children: string | JSX.Element | React.ReactNode
    margin?: string
    padding?: string
    width?: string
    height?: string
    borderRadius?: string
    backgroundColor?: COLORS | string
    border?: string
    alignItems?: string
    onClick?: () => void | undefined
    cursor?: string
}

export const Wrapper: React.FC<IStandartWrapperProps> = ({
    children,
    margin = "12px",
    padding = "24px",
    width = "auto",
    height = "auto",
    borderRadius = "12px",
    backgroundColor = COLORS.EMPTY,
    border = "none",
    alignItems,
    cursor,
    onClick
}) => {
    return (
        <div
            className={style.container}
            style={{ margin, padding, width, height, borderRadius, backgroundColor, border, alignItems, cursor }}
            onClick={onClick}
        >
            {children}
        </div>
    )
}
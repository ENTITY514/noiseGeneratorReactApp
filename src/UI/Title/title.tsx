import style from "./title.module.css"

export enum ISizes {
    BIG,
    MEDIUM,
    LIGHT
}

interface ITitleProps {
    children: string | number | JSX.Element | React.ReactNode
    color?: string
    size?: ISizes
    margin?: string
    textAlign?: "start" | "end" | "left" | "right" | "center" | "justify" | "match-parent"
}

export const Title: React.FC<ITitleProps> = ({ children, size = ISizes.MEDIUM, textAlign, color, margin }) => {
    if (size === ISizes.BIG) {
        return (
            <h1 className={style.big} style={{ textAlign, color, margin }}>
                {children}
            </h1>
        )
    }
    else if (size === ISizes.LIGHT) {
        return (
            <h3 className={style.light} style={{ textAlign, color, margin }}>
                {children}
            </h3>
        )
    }
    else {
        return (
            <h2 className={style.medium} style={{ textAlign, color, margin }}>
                {children}
            </h2>
        )
    }
}
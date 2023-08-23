import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { NoiseSlice } from "../../reducers/noise.reducer"
import { DefaultSettingsView } from "../defaultSettingsView"
import DiamondSquareNoise from "./diamondSquare.noise"

interface IViewProps {
    noise: DiamondSquareNoise
}


export const View: React.FC<IViewProps> = ({ noise }) => {

    const dispatch = useAppDispatch()
    const actions = NoiseSlice.actions
    const state = useAppSelector(state => state.NoiseSlice)


    return (
        <div>
            <DefaultSettingsView noise={noise} />
        </div>
    )
}
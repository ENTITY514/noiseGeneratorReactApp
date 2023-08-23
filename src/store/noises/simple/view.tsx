import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { NoiseSlice } from "../../reducers/noise.reducer"
import { DefaultSettingsView } from "../defaultSettingsView"
import SimpleNoise from "./simple.noise"

interface IViewProps {
    noise: SimpleNoise
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
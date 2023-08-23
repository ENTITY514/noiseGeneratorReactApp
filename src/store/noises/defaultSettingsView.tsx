import { InputIncrement } from "../../components/InputIncrement/input"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { NoiseSlice } from "../reducers/noise.reducer"
import { INoiseClass } from "./noise.abstract"


interface IDefaultSettingsViewProps {
    noise: INoiseClass
}


export const DefaultSettingsView: React.FC<IDefaultSettingsViewProps> = ({ noise }) => {

    const dispatch = useAppDispatch()
    const actions = NoiseSlice.actions
    const state = useAppSelector(state => state.NoiseSlice)

    const updateSize = (val: number) => {
        dispatch(actions.setSize(val))
        dispatch(actions.updateNoise())
    }

    return (
        <div>
            <InputIncrement value={state.size} onChange={(value) => { updateSize(Number(value)) }} />
        </div>
    )
}
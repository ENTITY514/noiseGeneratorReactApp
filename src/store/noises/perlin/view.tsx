import { CheckInput } from "../../../components/CheckInput/input"
import { InputRange } from "../../../components/InputRange/inputRange"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { NoiseSlice } from "../../reducers/noise.reducer"
import { DefaultSettingsView } from "../defaultSettingsView"
import PerlinNoise from "./perlin.noise"

interface IViewProps {
    noise: PerlinNoise
}


export const View: React.FC<IViewProps> = ({ noise }) => {

    const dispatch = useAppDispatch()
    const actions = NoiseSlice.actions
    const state = useAppSelector(state => state.NoiseSlice)


    return (
        <div>
            <DefaultSettingsView noise={noise} />
            <InputRange
                title={"Scale"}
                value={noise.settings.scale}
                max={10000}
                min={1}
                onChange={(val) => {
                    noise.settings.scale = val / 100;
                    dispatch(actions.updateNoise())
                }}
            />
            <InputRange
                title={"Octave"}
                value={noise.settings.octavCount}
                max={20}
                min={1}
                onChange={(val) => {
                    noise.settings.octavCount = val;
                    dispatch(actions.updateNoise())
                }}
            />
            <InputRange
                title={"Persistance"}
                value={noise.settings.persistance}
                max={10}
                min={1}
                onChange={(val) => {
                    noise.settings.persistance = val / 10;
                    dispatch(actions.updateNoise())
                }}
            />
        </div>
    )
}
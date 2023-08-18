import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { NoiseSlice } from "../../store/reducers/noise.reducer";
import style from "./style.module.css"

function Settings() {
  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.NoiseSlice)
  const action = NoiseSlice.actions
  return (
    <div className={style.container}>
      <div className={style.image} style={{ backgroundImage: "url(/reload.png)" }} onClick={() => { dispatch(action.updateNoise()) }}></div>
      {
        state.noiseObject.getView()
      }
    </div>
  );
}

export default Settings;

import React from "react";
import { Dropdown } from "../../components/DropDown/dropDown";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { NOISES } from "../../store/models/noise.interface";
import { NoiseSlice } from "../../store/reducers/noise.reducer";
import style from "./style.module.css"

function Settings() {

  const dispatch = useAppDispatch()
  const state = useAppSelector(state => state.NoiseSlice)
  const action = NoiseSlice.actions

  const getSettingsView = React.useCallback(() => { return state.noiseObject.getSettingsView() }, [state.noiseObject])

  return (
    <div className={style.container}>
      <div className={style.image} style={{ backgroundImage: "url(/reload.png)" }} onClick={() => { dispatch(action.updateNoise()) }}></div>
      <div>
        <Dropdown
          options={[NOISES.SIMPLENOISE, NOISES.PERLINNOISE, NOISES.DIAMONDSQUARENOISE]}
          selectedOption={state.activeNoise}
          onSelect={(option) => { dispatch(action.setNoiseType(option)); dispatch(action.updateNoise()) }}
        />
      </div>
      {
        getSettingsView()
      }
    </div>
  );
}

export default Settings;

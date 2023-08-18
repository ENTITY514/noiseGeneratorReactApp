import { InputIncrement } from "../../../components/InputIncrement/input"
import SimpleNoise from "./simple.noise"



interface IViewProps {
    noise: SimpleNoise
}


export const View: React.FC<IViewProps> = ({ noise }) => {
    return (
        <div>
            <InputIncrement value={0} />
        </div>
    )
}
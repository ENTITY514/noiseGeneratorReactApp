import PerlinNoise from "./perlin.noise"


interface IViewProps {
    noise: PerlinNoise
}


export const View: React.FC<IViewProps> = ({ noise }) => {
    return (
        <div>

        </div>
    )
}
import { useScore } from "../../hooks/useScore";
import ShowScore from "../table/ShowScore";

export const CommonData = () => {

    const { isLoading, data, calculateOvers } = useScore();

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {data?.length && (
                <>
                    <div className="mb-8">
                        <ShowScore data={data} calculateOvers={calculateOvers} flag='bat' />
                    </div>
                    <div>
                        <ShowScore data={data} calculateOvers={calculateOvers} flag='ball' />
                    </div>
                </>
            )}
        </>
    )
}
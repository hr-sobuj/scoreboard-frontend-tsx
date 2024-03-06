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
                        <ShowScore name="Batsman" data={data} calculateOvers={calculateOvers} flag='bat' />
                    </div>
                    <div>
                        <ShowScore name="Bowler" data={data} calculateOvers={calculateOvers} flag='ball' />
                    </div>
                </>
            )}
        </>
    )
}
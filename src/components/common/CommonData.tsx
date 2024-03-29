import { useScore } from "../../hooks/useScore";
import ShowScore from "../table/ShowScore";

export const CommonData = () => {
    const { isLoading, data, calculateOvers } = useScore();
    const orginalData=data?.data;
    // console.log(data);
    return (
        <>
            {isLoading && <p>Loading...</p>}
            {orginalData?.length? (
                <>
                    <div className="mb-8">
                        <ShowScore name="Batsman" data={orginalData} calculateOvers={calculateOvers} flag='bat' />
                    </div>
                    <div>
                        <ShowScore name="Bowler" data={orginalData} calculateOvers={calculateOvers} flag='ball' />
                    </div>
                </>
            ):(
                <>
                    <h3 className="text-center text-4xl text-red-600">Data not found!</h3>
                </>
            )}
        </>
    )
}
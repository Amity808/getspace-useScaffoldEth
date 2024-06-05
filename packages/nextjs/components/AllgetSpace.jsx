import React from 'react'
import { useScaffoldReadContract } from "../hooks/scaffold-eth"
import { useAccount } from 'wagmi'
import SpaceCard from "./SpaceCard"


const AllgetSpace = () => {

    const { data: spaceLength, isLoading: isSpaceLengthLoading } = useScaffoldReadContract({
        contractName: "GetSpaceMarketplace",
        functionName: "spaceLength",
        args: []
    });

    const spaceLen = spaceLength ? Number(spaceLength.toString()) : 0;

    const getSpacesLength = () => {
        if(!spaceLength) return null;
        const spaces = [];
        for(let i = 0; i < spaceLen; i++) {
          spaces.push(<HouseCard id={i} />)
        }
        return spaces;
      }

  return (
    <div>
      <div>
      <h2 style={{ padding: '30px', color: '#333333', textAlign: 'center', marginBottom: '40px' }}>Check Available spaces today</h2>
                <div className="courses" style={{ display: "grid", gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {getSpacesLength()}
                </div>
      </div>
    </div>
  )
}

export default AllgetSpace

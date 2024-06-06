import React, { useState, useEffect, useCallback } from 'react'
import { useScaffoldWriteContract, useScaffoldReadContract } from "../hooks/scaffold-eth";
import { toast } from "react-toastify";
import useLoading from "../hooks/useLoading";
import Link from "next/link";
import { truuncateAddress } from "~~/helpers/trucateAddress"

type Props = {
    id: Number
}

interface SpaceData {
    name: string;
    spaceAddress: string;
    Owner: string;
    paymentLink: string;
    description: string;
    amountpaid: string;
    currentAmount: string;
    spaceStatus: string;
    duration: number;
    videoImage: string;
}

const SpaceCard = (props: Props) => {

    const { isLoading, startLoading, stopLoading } = useLoading()

    const [spaceData, setSpaceData] = useState<SpaceData | null>(null);

    const { data: fetchSpace, isLoading: isfetchSpaceLoading } = useScaffoldReadContract({
        contractName: "GetSpaceMarketplace",
        functionName: "_space",
        args: [props.id]
    });


  const getSpaceDb = useCallback(() => {
    if (!fetchSpace) return null;
    setSpaceData({
      name: fetchSpace[0],
      spaceAddress: fetchSpace[1],
      Owner: fetchSpace[2],
      paymentLink: fetchSpace[3],
      description: fetchSpace[4],
      amountpaid: fetchSpace[5],
      currentAmount: fetchSpace[6],
      spaceStatus  : fetchSpace[7],
      duration: fetchSpace[8],
      videoImage  : fetchSpace[9],
    })
  }, [fetchSpace])


  useEffect(() => {
    getSpaceDb()
  }, [getSpaceDb])

  if (!spaceData) return null;

    return (
        <div className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900 m-3">
      {/* <Image
        // src={portImg}
        alt="jordans"
        height="400"
        width="400"
        className="object-contain"
      /> */}
      <video width="400" height="400" autoPlay muted controls controlsList="nodownload">
          <source src={spaceData.videoImage} type="video/mp4" />
          </video>
          <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
            {spaceData.name}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {spaceData.description}
          </p>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <Link target="_blank" href={'/'}>{truuncateAddress(spaceData.Owner)}</Link>
            <Link target="_blank" href={`/space/${props.id}`} className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              Check out
            </Link>
          </button>
        </div>
    )
}

export default SpaceCard
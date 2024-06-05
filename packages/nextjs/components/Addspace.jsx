'use client'
import React, { useState } from 'react'
import { useScaffoldWriteContract  } from "../hooks/scaffold-eth";
import useLoading from "../hooks/useLoading";
import useNotification from "../hooks/useNotification"
import { IoMdCloseCircle } from "react-icons/io";


const Addspace = () => {

    const [toggle, setToggle] = useState(false);
  const [Name, setName] = useState("");
  const [spaceAddress, setSpaceAddress] = useState("");
  const [description, setDescription] = useState("");
  const [videoImage, setVideoImage] = useState("");
  const [duration, setDuration] = useState("");
  const {
    notification,
    setErrorNotification,
    setSuccessNotification,
    clearNotification,
  } = useNotification();
  const { isLoading, startLoading, stopLoading } = useLoading();


    const { writeContractAsync, isPending } = useScaffoldWriteContract("GetSpaceMarketplace")

    const addSpace = async (e) => {
        e.preventDefault();
        startLoading();
        clearNotification();

        try {
            await writeContractAsync({
                functionName: "addSpace",
                arg: [Name, spaceAddress, description, duration, videoImage]
            },
            {
                onBlockConfirmation: txnReceipt => {
                    console.log("📦 Transaction blockHash", txnReceipt.blockHash);
                  },        
            }
        )

        setSuccessNotification("Space added successfully")
        stopLoading()
        } catch (error) {
            setErrorNotification("Unexpected Error from the server")
            stopLoading()
            console.error("Error add upspace")
        }
    }
  return (
    <div className="flex justify-end mt-10 mb-10">
      <button
        id="modalBioDate"
        type="button"
        data-bs-toggle="modalBioData"
        data-bs-target="#modalCenter"
        className=" text-white font-bold text-lg border-2 rounded-xl py-1 bg-[#1E002B] px-3 flex items-center mr-10 flex-col text-center drop-shadow-xl"
        onClick={() => setToggle(true)}
      >
        Add Space
      </button>
      {toggle && (
        // w-[600px] rounded-2xl bg-slate-100 p-5
        <div
          id="modalBioData"
          className="flex justify-center fixed left-0 top-0 items-center w-full h-full mt-6"
        >
          <div className="w-[600px] rounded-2xl bg-slate-100 p-5">
            <p>{notification}</p>
            <form onSubmit={addSpace}>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="spaceName"
                  id="spaceName"
                  value={Name}
                  placeholder="Space Name"
                />
              </div>
              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setSpaceAddress(e.target.value)}
                  className="border-4 w-full  border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="space address"
                  id="space address"
                  placeholder="Space Address"
                />
              </div>

              <div className="mb-8">
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="description"
                  id="description"
                  placeholder="Space Description"
                />
              </div>

              <div className="mb-8">
                <input
                  type="number"
                  onChange={(e) => setDuration(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="duraion"
                  id="duration"
                  placeholder="Maximum duration"
                />
              </div>
              <div className="mb-8">
              <input
                  type="text"
                  onChange={(e) => setVideoImage(e.target.value)}
                  className=" border-4 w-full border-[#EFAE07] px-4 py-2 rounded-xl"
                  name="vide link"
                  id="video link"
                  placeholder="video link"
                />
              </div>
              <div className=" flex justify-between">
                <button
                  type="submit"
                  className=" border-4 text-white border-[#EFAE07] bg-[#06102b] px-4 py-2 rounded-full"
                  disabled={isLoadCreate || isLoading || isPending}
                >
                  {isLoadCreate ? "Loading..." : "Add space"}  
                </button>
                <button type="button" onClick={() => setToggle(false)}>
                  <IoMdCloseCircle size={30} color="#06102b" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Addspace
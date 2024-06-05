import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployGetSpaceContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("GetSpaceMarketplace", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  const getSpace = await hre.ethers.getContract<Contract>("GetSpaceMarketplace", deployer);
};

export default deployGetSpaceContract;

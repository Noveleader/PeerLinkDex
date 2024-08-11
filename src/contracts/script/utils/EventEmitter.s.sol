// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {EventEmitter} from "../../src/utils/EventEmitter.sol";

contract DeployEventEmitter is Script {
    function run() external {
        vm.startBroadcast();
        EventEmitter eventEmitter = new EventEmitter();
        console.log(
            "Event Emitter contract is deployed at: ",
            address(eventEmitter)
        );
        vm.stopBroadcast();
    }
}

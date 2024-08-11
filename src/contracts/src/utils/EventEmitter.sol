// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../library/EscrowLib.sol";

contract EventEmitter {
    event EscrowEvent(
        uint256 indexed escrowId,
        EscrowLib.EscrowDetails escrowDetails
    );

    function emitEscrowEvent(
        uint256 escrowId,
        EscrowLib.EscrowDetails memory escrowDetails
    ) internal {
        emit EscrowEvent(escrowId, escrowDetails);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library EscrowLib {
    enum EscrowState {
        Initiated,
        Active,
        Completed,
        Cancelled
    }

    struct EscrowDetails {
        uint256 escrowId;
        address initiator;
        address participant;
        address tokenInAddress;
        address tokenOutAddress;
        uint256 amountIn;
        uint256 amountOut;
        uint256 startingTimestamp;
        uint256 duration;
        EscrowState state;
    }
}

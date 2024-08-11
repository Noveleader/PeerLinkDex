// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./library/EscrowLib.sol";

/**
 * @title Escrow Initiator
 * @notice This is the escrow contract
 */

contract Escrow {
    using EscrowLib for EscrowLib.EscrowDetails;

    event EscrowEventCreated(
        uint256 indexed escrowId,
        EscrowLib.EscrowDetails escrowDetails
    );

    event EscrowEventCancelled(uint256 indexed escrowId);

    event EscrowEventCompleted(uint256 indexed escrowId);

    // Public Variables
    uint256 public escrowId = 0;
    mapping(uint256 => EscrowLib.EscrowDetails) public escrowInfo;

    // Functions

    /**
     * @dev This function create an escrow arrangement as the user requests
     * @param participant Address of the escrow participant whom the sender is expecting funds from in exchange of their funds
     * @param tokenInAddress Token address of the escrow initiator token
     * @param tokenOutAddress Token address of the escrow participant token
     * @param amountIn Amount the initiator is willing to give
     * @param amountOut Amount the initiator is expecting at current market rate with slippage included
     * @param duration Duration for which the escrow should be valid and cannot be accessed after it
     */
    function createEscrowArrangement(
        address participant,
        address tokenInAddress,
        address tokenOutAddress,
        uint256 amountIn,
        uint256 amountOut,
        uint256 duration
    ) public payable {
        EscrowLib.EscrowDetails memory escrowDetails = EscrowLib.EscrowDetails(
            escrowId,
            msg.sender,
            participant,
            tokenInAddress,
            tokenOutAddress,
            amountIn,
            amountOut,
            block.timestamp,
            duration,
            EscrowLib.EscrowState.Initiated
        );

        IERC20 tokenIn = IERC20(escrowDetails.tokenInAddress);

        require(
            tokenIn.allowance(msg.sender, address(this)) >=
                escrowDetails.amountIn,
            "Insufficient Allowance"
        );

        require(
            tokenIn.transferFrom(
                msg.sender,
                address(this),
                escrowDetails.amountIn
            ),
            "Transfer failed"
        );

        escrowDetails.state = EscrowLib.EscrowState.Active;

        escrowInfo[escrowId] = escrowDetails;

        emit EscrowEventCreated(escrowId, escrowDetails);

        escrowId += 1;
    }

    /**
     * @dev This cancels any escrow arrangement and returns the funds to the users
     * @param _escrowId Escrow ID is the unique id of an escrow arrangement from which we can fetch details about an escrow
     */

    function cancelEscrowArrangement(uint256 _escrowId) public payable {
        EscrowLib.EscrowDetails storage escrowDetails = escrowInfo[_escrowId];

        require(
            msg.sender == escrowDetails.initiator ||
                msg.sender == escrowDetails.participant,
            "Not authorized"
        );

        require(
            escrowDetails.state == EscrowLib.EscrowState.Active,
            "Escrow is not active"
        );

        IERC20 token = IERC20(escrowDetails.tokenInAddress);

        require(
            token.transfer(escrowDetails.initiator, escrowDetails.amountIn),
            "Refund failed"
        );

        escrowDetails.state = EscrowLib.EscrowState.Cancelled;

        escrowInfo[_escrowId] = escrowDetails;

        emit EscrowEventCancelled(_escrowId);
    }

    /**
     * @dev Completes the escrow by exchanging the tokens between two parties
     * @param _escrowId Takes in escrow ID as an input
     */
    function completeEscrowArrangement(uint256 _escrowId) public payable {
        EscrowLib.EscrowDetails memory escrowDetails = escrowInfo[_escrowId];

        require(
            msg.sender == escrowDetails.participant,
            "Only participant can complete the escrow"
        );

        require(
            block.timestamp <=
                escrowDetails.startingTimestamp + escrowDetails.duration,
            "Escrow is Expired"
        );

        require(
            escrowDetails.state == EscrowLib.EscrowState.Active,
            "Escrow is not active"
        );

        IERC20 tokenOut = IERC20(escrowDetails.tokenOutAddress);

        require(
            tokenOut.transferFrom(
                msg.sender,
                address(this),
                escrowDetails.amountOut
            ),
            "Transfer failed"
        );

        // Instance of input token
        IERC20 tokenIn = IERC20(escrowDetails.tokenInAddress);

        require(
            tokenOut.transferFrom(
                address(this),
                escrowDetails.initiator,
                escrowDetails.amountOut
            ),
            "Transfer Failed to Initiator"
        );

        require(
            tokenIn.transferFrom(
                address(this),
                escrowDetails.participant,
                escrowDetails.amountIn
            ),
            "Transfer Failed to Participant"
        );

        escrowDetails.state = EscrowLib.EscrowState.Completed;

        escrowInfo[_escrowId] = escrowDetails;

        emit EscrowEventCompleted(escrowId);
    }

    // View functions
    function getEscrowId() public view returns (uint256) {
        return escrowId;
    }

    function getEscrowInfo(
        uint256 _escrowId
    ) public view returns (EscrowLib.EscrowDetails memory) {
        return escrowInfo[_escrowId];
    }
}

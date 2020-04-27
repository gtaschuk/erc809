pragma solidity >=0.4.21 <0.7.0;

import "./RivalIntervalTreeLibrary.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/drafts/Counters.sol";

/// @title ERC809: a standard interface for renting rival non-fungible tokens.
contract ERC809 is ERC721 {
  using RivalIntervalTreeLibrary for RivalIntervalTreeLibrary.Tree;

  Counters.Counter private _tokenIds;

  enum ReservationStatus {
    Created,
    Approved,
    Cancelled
  }

  struct Reservation {
    uint256 tokenId;
    address renter;
    uint256 start;
    uint256 end;
    ReservationStatus status;
  }

  mapping(uint256 => RivalIntervalTreeLibrary.Tree) calendars;
  mapping(uint256 => mapping(uint256 => Reservation)) reservations;
  /// @dev This emits when a successful reservation is made for accessing any NFT.
  event Reserve(address indexed _renter, uint256 _tokenId, uint256 _start, uint256 _end);

  /// @dev This emits when a successful cancellation is made for a reservation.
  event CancelReservation(address indexed _renter, uint256 _tokenId, uint256 _start, uint256 _end);

  function createProperty() public returns (uint256) {
    _tokenIds.increment();

    uint256 newItemId = _tokenIds.current();
    _mint(msg.sender, newItemId);
    //_setTokenURI(newItemId, tokenURI);

    return newItemId;
  }
  /// @notice Reserve access to token `_tokenId` from time `_start` to time `_end`
  /// @dev A successful reservation must ensure each time slot in the range _start to _end
  ///  is not previously reserved (by calling the function checkAvailable() described below)
  ///  and then emit a Reserve event.
  function reserve(uint256 _tokenId, uint256 _start, uint256 _end) external returns (bool success) {
    // Reverts if impossible
    calendars[_tokenId].insert(_start, _end);
    // TODO check for overlaps with accepted reservations
    Reservation memory r = Reservation(
      _tokenId,
      msg.sender,
      _start,
      _end,
      ReservationStatus.Created
      // include amount paid?
    );
    reservations[_tokenId][_start] = r;

    emit Reserve(msg.sender, _tokenId, _start, _end);
    return true;
  }

  /// @notice Cancel single reservation for `_tokenId` that starts at `_start`
  /// @dev The reservations starting at `_start` 
  // is cancelled if it exists
  function cancelReservation(uint256 _tokenId, uint256 _start) external returns (bool success) {
    // find reservations in range
    calendars[_tokenId].remove(_start);
    delete reservations[_tokenId][_start];
    return true;
  }

  /// @notice Find the renter of an NFT token as of `_time`
  /// @dev The renter is who made a reservation on `_tokenId` and the reservation spans over `_time`.
  function renterOf(uint256 _tokenId, uint256 _time) public view returns (address) {
    // TODO - look for bounding interval
    return reservations[_tokenId][_time].renter;
  }

  /// @notice Query if token `_tokenId` if available to reserve between `_start` and `_end` time
  function checkAvailable(uint256 _tokenId, uint256 _start, uint256 _end) public view returns (bool available) {
    return !calendars[_tokenId].overlaps(_start, _end);
  }
}


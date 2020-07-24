## ERC809

[![Passing](https://circleci.com/gh/gtaschuk/erc809.svg?style=svg)](https://circleci.com/gh/gtaschuk/erc809)

*This is a work in progress - proceed with caution.*

## Standard

ERC 809 is an ethereum smart contract standard for making an erc721 token loanable for a discrete amount of time.  This implementation uses an interval tree (red black) to ensure rival access to a token.  Payment is locked in the contract.

## Design

It uses a red black interval tree to prevent multiple people from using an asset at the same time.  The implementation of the red black tree is adapted from the beautiuful work of "bokkypoobah" [Source](https://github.com/bokkypoobah/BokkyPooBahsRedBlackTreeLibrary)


## Repo Structure
This repo uses truffle to manage the smart contracts

```
/app - a minimal react frontend
/contract - solidity contracts
/migrations - migrations to deploy solidity contracts
/test - tests for the contracts, which are run on circleci
```

## Use

An ERC809 token has a simple interface that includes the normal ERC721 structure, and also defines some methods that designate rental rights to a token.

`
function reserve(uint256 _tokenId, uint256 _start, uint256 _end) external returns (bool success)
`
Initiates a reservation of a token which will suceed if a reservation can be made (if it does not overlap with any other reservations


`
function renterOf(uint256 _tokenId, uint256 _time) public view returns (address)
`
Fetches the person who has rental rights to a token at a particular time

`
function checkAvailable(uint256 _tokenId, uint256 _start, uint256 _end) public view returns (bool available) {
`
Checks the availability of a token at a particular time

## Use Cases

The use case in mind here is real estate but I would like to make this broadbly applicable - it could be used for a tool library for example.

If you are working on something similar - contact me (Greg Taschuk) on twitter or linkedin and let's collaborate

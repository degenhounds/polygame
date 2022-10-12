import NextLink from 'next/link'
import {
    Link,
    Container,
    Heading,
    Box,
    SimpleGrid,
    Button,
    List,
    ListItem,
    useColorModeValue,
    chakra
} from '@chakra-ui/react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import { GridItem } from '../components/grid-item'
import { IoLogoTwitter, IoLogoInstagram, IoLogoGithub } from 'react-icons/io5'
import Image from 'next/image'
import useSound from 'use-sound';

import Web3 from 'web3'

import { useEffect, useState } from 'react';
import Router from 'next/router';

import { useAppContext } from '../context/state';

const wssProvider = new Web3.providers.WebsocketProvider("wss://blissful-powerful-sanctuary.matic.discover.quiknode.pro/00a10f5347ea8e7a00f200f30dbeea03170737bb/")
const contractAddress = '0xaBeB320fb3500ACF4E8c9406b93cdbfaa584988D';
const contract_abi = [{ "inputs": [{ "internalType": "address", "name": "_admin", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "id", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "bet", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomSeed", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }, { "indexed": false, "internalType": "address", "name": "player", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "randomResult", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "time", "type": "uint256" }], "name": "Result", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "manager", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdraw", "type": "event" }, { "inputs": [], "name": "MAX_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "MIN_DEPOSIT_AMOUNT", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "addManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "adminWallet", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }], "name": "game", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "gameId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "games", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "bet", "type": "uint256" }, { "internalType": "uint256", "name": "seed", "type": "uint256" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }, { "internalType": "uint256", "name": "winAmount", "type": "uint256" }, { "internalType": "uint256", "name": "time", "type": "uint256" }, { "internalType": "address payable", "name": "player", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastGameId", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "managers", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "randomResult", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" }, { "internalType": "uint256", "name": "randomness", "type": "uint256" }], "name": "rawFulfillRandomness", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_addr", "type": "address" }], "name": "removeManager", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "random", "type": "uint256" }], "name": "verdict", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawEther", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdrawLink", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "stateMutability": "payable", "type": "receive" }];


const Betting = ({ wallet, web3, contract, contractAddress, balance, setBalance, clickSoundPlay }) => {
    const [hound, setHound] = useState('');
    const [betAmount, setBetAmount] = useState();
    const [loading, setLoading] = useState(0);
    const [verdict, setVerdict] = useState(0);
    const [raceUrl, setRaceUrl] = useState("");

    const [raceSoundPlay] = useSound('/sound/race_sound.mp3');
    const [winSoundPlay] = useSound('/sound/win_sound.mp3');
    const [loseSoundPlay] = useSound('/sound/lose_sound.mp3');

    const mycontext = useAppContext();

    useEffect(() => {
        if (wallet.length == 0) {
            return Router.push('/');
        }
    }, [wallet]);

    useEffect(() => {
        if (mycontext.isSound == false) return;
        if (loading == 2) {
            setTimeout(() => {
                if (verdict == 0) {
                    loseSoundPlay();
                } else {
                    winSoundPlay();
                }
            }, 5500);
        }
    }, [loading])

    const onGreyClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setHound('grey');
    }

    const onOrangeClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setHound('orange');
    }

    const onBetAmountClicked = (amount) => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setBetAmount(amount);
    }

    const onBetClicked = async () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        if (hound.length == 0) {
            return alert('PLEASE SELECT WHAT YOU LIKE.');
        }
        if (betAmount == undefined) {
            return alert('PLEASE SELECT BET AMOUNT.');
        }

        let randomSeed = Math.floor(Math.random() * Math.floor(1e9));
        let bet = (hound === 'grey' ? 0 : 1);
        let amount = web3.utils.toWei(betAmount.toString());
        // let amount = web3.utils.toWei("0");

        //Send bet to the contract and wait for the verdict

        //Send bet to the contract and wait for the verdict
        contract.methods.game(bet, randomSeed).send({ from: wallet, value: amount, gasPrice: 110000000000 }).on('transactionHash', (hash) => {
            setLoading(1);
        }).on('error', (error) => {
            console.log('Error')
            setLoading(0);
        })
        .then(async tx => {
            setLoading(1);

            const wssWeb3 = new Web3(wssProvider);
            const wssContract = new wssWeb3.eth.Contract(contract_abi, contractAddress);

            wssContract.events.Result({}, async (error, event) => {
            // contract.once('Result', {}, async (error, event) => {
                const verdict = event.returnValues.winAmount;
                let index = Math.floor(Math.random() * 100) % 3 + 1;
                if (verdict === '0') {
                    // alert('SORRY, UNFORTUNATELY YOU LOST :(')
                    setVerdict(0);

                    if (hound === 'orange') {
                        let url = "/images/grey_win/grey_win_" + index + ".gif";
                        setRaceUrl(url)
                    } else {
                        let url = "/images/orange_win/orange_win_" + index + ".gif";
                        setRaceUrl(url)
                    }
                } else {
                    // alert('CONGRATULATIONS! YOU WIN! :)')
                    setVerdict(1);

                    if (hound === 'grey') {
                        let url = "/images/grey_win/grey_win_" + index + ".gif";
                        setRaceUrl(url)
                    } else {
                        let url = "/images/orange_win/orange_win_" + index + ".gif";
                        setRaceUrl(url)
                    }
                }

                //Prevent error when user logout, while waiting for the verdict
                if (wallet !== 'undefined' && wallet.length > 0) {
                    let balance = await web3.eth.getBalance(wallet);
                    balance = (Math.round(web3.utils.fromWei(balance) * 1000) / 1000).toFixed(3);
                    setBalance(balance);
                }
                setLoading(2);
            })
        })
    }

    const onRetryClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        setLoading(0);
    }

    const onQuitClicked = () => {
        if (mycontext.isSound == true) {
            clickSoundPlay();
        }
        Router.push('/');
    }

    return (
        <Layout>
            <Container>
                {
                    loading == 1 ? (
                        <div>
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/orange_running.gif"
                                    width={250}
                                    height={250}
                                />
                            </div>
                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>Loading the track.. if you are waiting longer than 1 minute, return to homepage to view results </p>
                                </Box>
                            </Box>
                            <hr />
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/grey_running.gif"
                                    width={250}
                                    height={250}
                                />
                            </div>

                            <Box
                                borderRadius="lg"
                                mb={6}
                                p={3}
                                textAlign="center"
                                bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                                css={{ backdropFilter: 'blur(10px)' }}
                            >
                                Rooting on {hound} hound for {betAmount} matic
                            </Box>
                        </div>
                    ) : (loading == 0 ? (
                        <div>
                            <div
                                style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                            >
                                <img
                                    src="/images/betting_hound.gif"
                                    width={300}
                                    height={300}
                                />
                            </div>

                            <Box
                                borderRadius="lg"
                                mb={6}
                                p={3}
                                textAlign="center"
                                bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                                css={{ backdropFilter: 'blur(10px)' }}
                            >
                                Wallet Balance : {balance} MATIC
                            </Box>

                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>I LIKE </p>
                                </Box>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={hound === 'grey' ? 'pink' : 'teal'}
                                    onClick={onGreyClicked}
                                >
                                    GREY HOUND
                                    </Button>
                                <Button
                                    colorScheme={hound === 'orange' ? 'pink' : 'teal'}
                                    style={{ marginLeft: 8 }}
                                    onClick={onOrangeClicked}
                                >
                                    ORANGE HOUND
                                    </Button>
                            </Box>

                            <Box display={{ md: 'flex' }}>
                                <Box
                                    flexGrow={1}
                                    textAlign="center"
                                >
                                    <p>FOR</p>
                                </Box>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={betAmount == 5 ? 'pink' : 'teal'}
                                    onClick={() => onBetAmountClicked(5)}
                                >
                                    5 MATIC
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 10 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(10)}
                                >
                                    10 MATIC
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 25 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(25)}
                                >
                                    25 MATIC
                                    </Button>
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme={betAmount == 50 ? 'pink' : 'teal'}
                                    onClick={() => onBetAmountClicked(50)}
                                >
                                    50 MATIC
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 100 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(100)}
                                >
                                    100 MATIC
                                    </Button>
                                <Button
                                    colorScheme={betAmount == 160 ? 'pink' : 'teal'}
                                    style={{ marginLeft: 4 }}
                                    onClick={() => onBetAmountClicked(160)}
                                >
                                    160 MATIC
                                    </Button>
                            </Box>

                            <Box align="center" my={4}>
                                <hr />
                            </Box>

                            <Box align="center" my={4}>
                                <Button
                                    colorScheme="teal"
                                    onClick={onBetClicked}
                                >
                                    DOUBLE OR NOTHING
                                    </Button>
                            </Box>
                        </div>

                    ) : (
                            <div>
                                <Section delay={5}>
                                    <Box
                                        borderRadius="lg"
                                        mb={6}
                                        mt={20}
                                        p={3}
                                        textAlign="center"
                                        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
                                        css={{ backdropFilter: 'blur(10px)' }}
                                    >
                                        {
                                            verdict ? (
                                                <span style={{ fontSize: 30 }}>Congratulations, you won!</span>
                                            ) : (
                                                    <span style={{ fontSize: 30 }}>Sorry, you lost!</span>
                                                )
                                        }
                                    </Box>
                                </Section>

                                <div
                                    style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}
                                >
                                    <img
                                        src={raceUrl}
                                        width={500}
                                        height={500}
                                    />
                                </div>

                                <Section delay={4.5}>
                                    <Box align="center" my={4}>
                                        <Button
                                            colorScheme='teal'
                                            onClick={onRetryClicked}
                                        >
                                            Retry
                                    </Button>
                                        <Button
                                            colorScheme='teal'
                                            style={{ marginLeft: 16 }}
                                            onClick={onQuitClicked}
                                        >
                                            Quit
                                    </Button>
                                    </Box>
                                </Section>
                            </div>
                        ))
                }

            </Container>
        </Layout>
    )
}

export default Betting;
export { getServerSideProps } from '../components/chakra'

import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { ethers } from 'ethers';
import SimpleStore_abi from '../contract/SimpleStore_abi.json';
import SCM from "../artifacts/contracts/SCM.sol/SCM.json";

const RegisterProduct = () => {
  const [data, setData] = useState({
    name: "",
    date: "",
    weight: "",
  })
  const [data2, setData2] = useState({
    name: "",
    date: "",
    weight: "",
  })
  const [provider, setProvider] = useState(null);
  const [index, setIndex] = useState(0);
  const [signer, setSigner] = useState(null);
  const [defaultAcc, setDefaultAcc] = useState(null);
  const [contract, setContract] = useState(null);
  // const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138"
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const submit = async (e) => {
    e.preventDefault();
    try {
      
      console.log("name ", data.name);
      console.log("date ", data.date);
      console.log("weightRef ", data.weight);
      console.log("contract in submit ", contract);

      if(typeof window.ethereum !== "undefined") {
        await connectWallectHandler();
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);

        const signer1 = provider1.getSigner();

        const contract1 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SCM.abi, signer1);
        let dataname = data.name;
        let datadate = data.date;
        let dataweight = data.weight;
        const transaction = await contract1.addProduct(dataname, datadate, dataweight);
        await transaction.wait()
        console.log("transactiions: ", transaction)
        console.log("data added successfully");

      }


    } catch (err) {
      console.log("err in submit ", err);

    }
  }

  const getData = async (e) => {
    e.preventDefault();
    try {
      if(typeof window.ethereum !== "undefined") {
        console.log("contract in getData ", contract);
        console.log("index in getData ", index);

        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const contract1 = new ethers.Contract("0x5FbDB2315678afecb367f032d93F642f64180aa3", SCM.abi, provider1);
        
        // let tasks = await contract.getTask(index);
        let tasks = await contract1.getAllTasks();
        console.log("tasks ", tasks);
        // setData2({
        //   name: tasks.name,
        //   date: tasks.date,
        //   weight: tasks.weight,
        // })
        
      }

    } catch (err) {
      console.log("err in getData ", err);

    }
  }

  const connectWallectHandler = async () => {
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(results => {
          accountChangeHandler(results[0]);
          console.log("Wallet connected");
        })
    } else {
      console.log("Need to connect to Metamask");
    }
  }

  const accountChangeHandler = (newAccount) => {
    setDefaultAcc(newAccount);
    updateEthers();

  }

  const updateEthers = async () => {
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(tempProvider);

    let tempSigner = tempProvider.getSigner();
    setSigner(tempSigner);

    let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
    setContract(tempContract);
  }

  return (
    <div >
      <Modal
        isOpen={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Register your Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Button colorScheme='blue' mr={3} onClick={connectWallectHandler}>Connect/Disconnect</Button>
            <h3>Account: {defaultAcc}</h3>
            <FormControl>
              <FormLabel>Product name</FormLabel>
              <Input value={data.name} name={"name"} onChange={handleChange} placeholder='Product name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Date of production</FormLabel>
              <Input type="date" value={data.date} name={"date"} onChange={handleChange} placeholder='Date of production' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Weight amount</FormLabel>
              <Input value={data.weight} name={"weight"} onChange={handleChange} placeholder='Weight amount' />
            </FormControl>

          </ModalBody>

          <Button colorScheme='blue' mr={3} onClick={submit}>
            Submit
          </Button>
          <hr />

          <FormControl mt={4}>
            <FormLabel>Enter index to be searched</FormLabel>
            <Input value={index} name={"weight"} onChange={(e) => { setIndex(e.target.value) }} placeholder='Index' />
          </FormControl>

          <Button colorScheme='blue' mr={3} mt={3} onClick={getData}>Load Data</Button>
          Product name : {data2.name}
          <br />
          Date of production : {data2.date}
          <br />
          Weight amount : {data2.weight}
          <br />

           <ModalFooter>
          {/*  <Button colorScheme='green' mr={3} onClick={submit}>Accept</Button>*/}
            <Button colorScheme='green' mr={3} onClick={<></>}>Accept</Button>
            <Button colorScheme='red' onClick={<></>}>Reject</Button>
          </ModalFooter> 
        </ModalContent>
      </Modal>

    </div>
  )
}

export default RegisterProduct
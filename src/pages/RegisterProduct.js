import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from '@chakra-ui/react';
import { ethers } from 'ethers';
import SimpleStore_abi from '../contract/SimpleStore_abi.json';
import SCM from "../artifacts/contracts/SCM.sol/SCM.json";

const RegisterProduct = () => {
  const [data, setData] = useState({
    name: "",
    date: "",
    weight: "",
    pStage: "",
  })
  const [data2, setData2] = useState({
    name: "",
    date: "",
    weight: "",
    pStage: "",
  })
  const [provider, setProvider] = useState(null);
  const [index, setIndex] = useState(0);
  const [signer, setSigner] = useState(null);
  const [defaultAcc, setDefaultAcc] = useState(null);
  const [contract, setContract] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try {

      console.log("name ", data.name);
      console.log("date ", data.date);
      console.log("weightRef ", data.weight);
      console.log("pStage ", data.pStage);
      console.log("contract in submit ", contract);

      if (typeof window.ethereum !== "undefined") {
        await connectWallectHandler();
        const provider1 = new ethers.providers.Web3Provider(window.ethereum);

        const signer1 = provider1.getSigner();

        const contract1 = new ethers.Contract(contractAddress, SCM.abi, signer1);
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
      if (typeof window.ethereum !== "undefined") {
        console.log("contract in getData ", contract);
        console.log("index in getData ", index);

        const provider1 = new ethers.providers.Web3Provider(window.ethereum);
        const contract1 = new ethers.Contract(contractAddress, SCM.abi, provider1);

        let tasks = await contract.getTask(index);
        // let tasks = await contract1.getAllTasks();
        console.log("tasks ", tasks);
        setData2({
          name: tasks.name,
          date: tasks.date,
          weight: tasks.weight,
        })

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

  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='80%'
      backdropBlur='2px'
    />
  )

  const [overlay, setOverlay] = useState(<OverlayOne />)

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
            {/* <Button colorScheme='blue' mr={3} onClick={connectWallectHandler}>Connect/Disconnect</Button> */}
            <h3>Wallet Account: {defaultAcc || "Not connected"}</h3>
            <FormControl mt={4} isRequired>
              <FormLabel>Product name</FormLabel>
              <Input value={data.name} name={"name"} onChange={handleChange} placeholder='Product name' />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Date of production</FormLabel>
              <Input type="date" value={data.date} name={"date"} onChange={handleChange} placeholder='Date of production' />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Weight amount (in kgs)</FormLabel>
              <Input value={data.weight} type="number" name={"weight"} onChange={handleChange} placeholder='Weight amount' />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Select Product Stage</FormLabel>
              <Select placeholder='Select Product Stage' value={data.pStage} onChange={handleChange} name={"pStage"} >
                <option value="Product Produced">Product Produced</option>
                <option value="Product Produced & Dispatched">Product Produced & Dispatched</option>
                {/* <option>Product Delivered to Agent</option>
                <option>Product Delivered from Agent</option>
                <option>Product Delivered to Wholesaler/Distributor</option>
                <option>Product Despatched from Wholesaler/Distributor</option>
                <option>Product Delivered to retailer</option>
                <option>Product Despatched from retailer</option> */}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input value={data?.description} name={"description"} onChange={handleChange} placeholder='Enter Description' />
            </FormControl>


          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mx={3} onClick={() => { setOverlay(<OverlayTwo />); onOpen(); }}>
              Submit
            </Button>
          </ModalFooter>

          <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {overlay}
            <ModalContent>
              <ModalHeader>Confirm Product Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>          
                  Product name : <b>{data.name}</b>
                  <br />
                  Date of production : <b>{data.date}</b>
                  <br />
                  Weight amount : <b>{data.weight}</b>
                  <br />
                  Product Stage: <b>{data.pStage}</b>
                  <br />
                  Product Description: <b>{data?.description}</b>
                  <br />
                  </Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='green' mx={3} onClick={onSubmit}>Register Product</Button>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <FormControl mx={3} >
            <FormLabel>Enter index to be searched</FormLabel>
            <Input value={index} name={"weight"} onChange={(e) => { setIndex(e.target.value) }} placeholder='Index' />
          </FormControl>

          <Button colorScheme='blue' mx={3} mt={3} onClick={getData}>Load Data</Button>
          <Text mx={3} my={3} >
            Product name : {data2.name}
            <br />
            Date of production : {data2.date}
            <br />
            Weight amount : {data2.weight}
            <br />    
          </Text>

          {/* <Button my={3} colorScheme='green' mx={3} onClick={getData}>Accept</Button> */}
          {/* <FormControl mt={4}>
          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={<></>}>Accept</Button>
            <Button colorScheme='red' onClick={<></>}>Reject</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>

    </div>
  )
}

export default RegisterProduct
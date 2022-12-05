import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, Icon, Input, Link, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
// import React, { useState } from 'react'
// import Connect from './Connect.js'
import { ethers } from 'ethers';
import SimpleStore_abi from '../contract/SimpleStore_abi.json';
import SCM from "../artifacts/contracts/SCM.sol/SCM.json";
import { useParams } from 'react-router-dom';

const ApproveTrade = () => {

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
  const params = useParams();

  let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

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
      // console.log("index in getData ", index);

      const provider1 = new ethers.providers.Web3Provider(window.ethereum);
      const contract1 = new ethers.Contract(contractAddress, SCM.abi, provider1);

      let tasks = await contract.getTask(params.id);
      // let tasks = await contract.getTask(index);
      
      // let tasks = await contract1.getAllTasks();
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

const updateEthers = async () => {
  let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(tempProvider);

  let tempSigner = tempProvider.getSigner();
  setSigner(tempSigner);

  let tempContract = new ethers.Contract(contractAddress, SimpleStore_abi, tempSigner);
  setContract(tempContract);
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

// useEffect(async () => {
//   // await connectWallectHandler();
//   // await getData();
// }, [])


  return (
    <div>
        <Modal
        isOpen={true}
        size={'xl'} 
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
              {/* <Connect /> */}
              <Text my={3}>

                Product name : <b>ABC</b>
                <br />
                Date of production : <b>26-11-2022</b>
                <br />
                Weight amount : <b>15 kgs</b>
                <br />
                Past Status : 
                <br />
                1. DOP : <b>15-01-2022 | Weight: 15 kgs</b>
                <br />
                2. Dispatched : <b>16-01-2022 | Weight: 15 kgs | picked by : <Link color='blue.400' href='/user/profile/638cb2b752a6d0c2d84fbb28' isExternal>638cb2b752a6d0c2d84fbb28</Link></b>
                <br />
                3. Agent : <b>17-01-2022 | Weight: 14 kgs | picked by : <Link color='blue.400' href='/user/profile/638c46d4ghew35384fbb28' isExternal>638c46d4ghew35384fbb28</Link></b>
                <br />
                4. Dispatched : <b>17-01-2022 | Weight: 14 kgs | picked by : <Link color='blue.400' href='/user/profile/638cb2b7535gedc2d84fbb28' isExternal>638cb2b7535gedc2d84fbb28</Link></b>
                <br />
                5. Retailer : <b>18-01-2022 | Weight: 13 kgs | picked by : <Link color='blue.400' href='/user/profile/638c46d74hew35384fbb28' isExternal>638c46d74hew35384fbb28</Link></b>
                <br />
              </Text>

              <hr />

              <FormControl isRequired mt={3}>
                <FormLabel>Select Product Stage</FormLabel>
                <Select placeholder='Select Product Stage' value={data} onChange={handleChange} name={"pStage"} >
                  <option>Product Delivered to Agent</option>
                  <option>Product Delivered from Agent (Dispatched)</option>
                  <option>Product Delivered to Wholesaler/Distributor</option>
                  <option>Product Despatched from Wholesaler/Distributor (Dispatched)</option>
                  <option>Product Delivered to retailer</option>
                  <option>Product Despatched from retailer (Dispatched)</option>
                  <option>Sold to customer</option>
                  <option>Purchased by customer</option>
                </Select>
              </FormControl>
              <br />


              <FormControl isRequired mb={3}>
                <FormLabel>Weight amount (in kgs)</FormLabel>
                <Input value={data.weight} type="number" name={"weight"} onChange={handleChange} placeholder='Weight amount' />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Description</FormLabel>
                <Input value={data?.description} name={"description"} onChange={handleChange} placeholder='Enter Description' />
              </FormControl>

              <Button colorScheme='green' mx={3} size='lg'>Accept &nbsp; <Icon as={CheckIcon} /></Button>
              <Button colorScheme='red' size='lg'>Reject &nbsp; <Icon as={CloseIcon} /> </Button>
              
          </ModalBody>

          <ModalFooter>
              {/* <Button colorScheme='green' mr={3} onClick={submit}>Accept</Button> */}

          </ModalFooter>
        </ModalContent>
    </Modal>

    
    </div>
  )
}

export default ApproveTrade
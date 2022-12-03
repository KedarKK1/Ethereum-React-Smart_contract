import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'
// import React, { useState } from 'react'
// import Connect from './Connect.js'

const ApproveTrade = () => {
    
// const [data, setData] = useState({
//     name: "",
//     weight: "",
//     date: "",
// })

// const handleChange = (e) =>{
//     setData({
//         ...data,
//         [e.target.name]: e.target.value
//     })
// }
// const submit = async() =>{
//     console.log("name ", data.name);
//     console.log("date ", data.date);
//     console.log("weightRef ", data.weight);
// }
  return (
    <div>
        <Modal
        isOpen={true}
    >
        <ModalOverlay />
        <ModalContent>
        <ModalHeader>Approve Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
            {/* <Connect /> */}
            Product name : ABC
            <br />
            Date of production : 26-11-2022
            <br />
            Weight amount : 15 kg
            <br />
        </ModalBody>

        <ModalFooter>
            {/* <Button colorScheme='green' mr={3} onClick={submit}>Accept</Button> */}
            <Button colorScheme='green' mr={3} onClick={<></>}>Accept</Button>
            <Button colorScheme='red' onClick={<></>}>Reject</Button>
        </ModalFooter>
        </ModalContent>
    </Modal>

    
    </div>
  )
}

export default ApproveTrade
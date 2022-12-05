import React from 'react'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Flex, FormControl, FormLabel, Heading, Icon, Input, Link, Stack, Text } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';

function SignUpPage() {
  return (
    <Box style={{'height':'100vh'}} className="login-page">
      <Flex alignItems='center' gap='8' style={{'height':'100vh', 'justifyContent': 'center'}}  >
      <Card align='center' maxWidth='max-content' borderRadius='lg' w='100%' mx={20} my={20} boxShadow='2xl' >
          <CardHeader>
              <Heading size='lg'><u>Sign Up</u></Heading>
          </CardHeader>
          <CardBody>
              {/* <Text>View a summary of all your customers over the last month.</Text> */}
              <FormControl isRequired>
              <FormLabel>Full Name</FormLabel>
              <Input name={"name"} placeholder='Enter Full Name' />
              </FormControl>
            
              <FormControl mt={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input name={"username"} placeholder='Enter Username' />
              </FormControl>

              <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" name={"password"} placeholder='Enter Password' />
              </FormControl>

              <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input name={"email"} placeholder='Enter Email' />
              </FormControl>

              <FormControl mt={4} isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input name={"phonenumber"} placeholder='Enter Phone Number' />
              </FormControl>

              <FormControl mt={4} isRequired>
              <FormLabel>Aadhar Card Number</FormLabel>
              <Input name={"aadharcardnumber"} placeholder='Enter Aadhar Card Number' />
              </FormControl>

              <Stack mt={4} spacing={5} direction='row'>
                <FormLabel>Roles</FormLabel>
                <Checkbox colorScheme='green' defaultChecked>
                  Customer
                </Checkbox>
                <Checkbox colorScheme='green'>
                  Farmer
                </Checkbox>
                <Checkbox colorScheme='green'>
                  Agent
                </Checkbox>
                <Checkbox colorScheme='green'>
                  Wholesaler/Distributor
                </Checkbox>
                <Checkbox colorScheme='green'>
                  Retailer
                </Checkbox>
                <Checkbox colorScheme='green'>
                  Transporter
                </Checkbox>
              </Stack>

              <Button colorScheme='blue' mt={4}>Register</Button>
          </CardBody>
          <CardFooter>
              <Text>Already have an account? <Link color='blue.400' href='https://localhost:3000/login' isExternal>Login here! <Icon as={ExternalLinkIcon  } /> </Link></Text>
          </CardFooter>
      </Card>        
      </Flex>
    </ Box>
  )
}

export default SignUpPage
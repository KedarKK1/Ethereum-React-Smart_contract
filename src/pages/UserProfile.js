import { EditIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
const userProfilePhoto = require("../static/images/userProfilePhoto.jpg");

const UserProfile = () => {
  return (
    <Box style={{ 'height': '100vh' }} className="login-page">
      <Flex alignItems='center' gap='8' style={{ 'height': '100vh', 'justifyContent': 'center' }}  >

        <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          borderRadius='lg' 
          boxShadow='2xl' 
        >
          <Image
            objectFit='cover'
            maxW={{ base: '100%', sm: '350px' }}
            src={userProfilePhoto}
            alt='User Profile'
          />

          <Stack>
            <CardBody>
              <Heading size='lg' fontSize='4xl' ><u>Profile</u></Heading>

              <Text py='2'  fontSize='2xl' size='md'   >
                Full Name: <b>Janardan Tatyasaheb Jadhao</b>
                <br />
                Username: <b>Janardan211</b>
                <br />
                Phone Number: <b>+91 9578389647</b>
                <br />
                Aadhar Card Number: <b>4869 2648 9375</b>
                <br />
                Roles: <b>Customer, Farmer, Agent, Transporter</b>
                <br />
              </Text>
            </CardBody>

            <CardFooter>
              <Button variant='solid' colorScheme='blue' mx={1}>
                <Text>Edit Profile</Text> &nbsp; <Icon as={EditIcon} />
              </Button>
              <Button variant='solid' colorScheme='blue' mx={1}>
                <Text>See Previous Transaction</Text> &nbsp; <Icon as={ExternalLinkIcon} />
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Flex>
    </ Box>
  )
}

export default UserProfile
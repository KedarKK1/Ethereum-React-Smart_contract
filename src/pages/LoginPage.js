import React from 'react';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, FormControl, FormLabel, Heading, Icon, Input, Link, Text } from '@chakra-ui/react';
import { ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons';

const LoginPage = () => {
  return (
    <Box style={{'height':'100vh'}} className="login-page" >
        <Flex alignItems='center' style={{'height':'100vh', 'justifyContent': 'center'}}  >
            <Card align='center' maxWidth='max-content' borderRadius='lg' w='100%' mx="auto" my="auto" boxShadow='2xl' >
                <CardHeader>
                    <Heading size='lg'><u>Login</u></Heading>
                </CardHeader>
                <CardBody>
                    {/* <Text>View a summary of all your customers over the last month.</Text> */}
                    <FormControl isRequired>
                    <FormLabel>Username</FormLabel>
                    <Input name={"name"} placeholder='Enter Username' />
                    </FormControl>
                    <FormControl mt={4}  isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input name={"password"} placeholder='Enter Password' />
                    </FormControl>
                    <Button colorScheme='blue' mt={4}>Login</Button>
                </CardBody>
                <CardFooter>
                    <Text>Dont have an account? <Link color='blue.400' href='/sign-up' isExternal>Sign up here! <Icon as={ExternalLinkIcon} /> </Link></Text>
                </CardFooter>
            </Card>        
        </Flex>
    </Box>

  )
}

export default LoginPage
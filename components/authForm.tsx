import {
  Box,
  Center,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/layout";
import { Button, FormControl, Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { auth } from "../lib/mutations";

type AppProps = {
  mode: "signin" | "signup";
};

const AuthForm = ({ mode }: AppProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (errorMessage) {
      setErrorMessage("");
    }
    const res = await auth(mode, { email, password, firstName, lastName });
    if (typeof res === "boolean") {
      router.push("/");
    } else {
      setErrorMessage(res.message);
    }
    setIsLoading(false);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const disabledSignIn = !email || !password;
  const disabledSignUp = disabledSignIn || !firstName || !lastName;

  return (
    <Box width="100vw" height="100vh" bg="black" color="white">
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="100px"
        borderBottom="1px solid white"
      >
        <Image src="/logo.svg" width={200} height={100} />
      </Flex>
      <Flex
        direction="column"
        justify="center"
        align="center"
        height="calc(100vh-100px)"
      >
        <Box
          padding="25px"
          w={["80vw", "60vw", "40vw", "20vw"]}
          borderRadius="6px"
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Flex gap="15px" direction="column">
              <FormControl isRequired>
                <Input
                  value={email}
                  placeholder="Email"
                  type="email"
                  onChange={handleEmailChange}
                  required
                />
              </FormControl>

              {mode === "signup" ? (
                <>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <Input
                      placeholder="Last Name"
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </>
              ) : null}

              <FormControl isRequired>
                <Input
                  value={password}
                  placeholder="Password"
                  type="password"
                  onChange={handlePasswordChange}
                />
              </FormControl>

              <Flex
                gap="100px"
                direction="column"
                justify="center"
                align="center"
              >
                <Button
                  type="submit"
                  isDisabled={
                    mode === "signin" ? disabledSignIn : disabledSignUp
                  }
                  bg="green.500"
                  isLoading={isLoading}
                  _hover={{
                    background: "green.300",
                  }}
                >
                  {mode === "signin" ? "Sign In" : "Sign Up"}
                </Button>
              </Flex>
            </Flex>
          </form>
        </Box>
        {errorMessage ? (
          <Center color="red.400">{errorMessage}</Center>
        ) : (
          <Box visibility="hidden">Error</Box>
        )}
        {mode === "signin" && (
          <Box>
            <Flex gap="5px" paddingBottom="10px">
              <Text>Dont have account ?</Text>
              <LinkBox>
                <Link href="/signup" passHref>
                  <LinkOverlay>Sign up !</LinkOverlay>
                </Link>
              </LinkBox>
            </Flex>
            <Flex justify="center">
              <Button
                bgColor="transparent"
                display="block"
                size="xs"
                onClick={() => {
                  setEmail("user@test.com");
                  setPassword("password");
                }}
                _hover={{
                  background: "red.300",
                }}
              >
                Use test account
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default AuthForm;

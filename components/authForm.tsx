import { Box, Flex, LinkBox, LinkOverlay, Text } from "@chakra-ui/layout";
import { Button, Input } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
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
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await auth(mode, { email, password, firstName, lastName });
    setIsLoading(false);
    router.push("/");
  };

  return (
    <Box width="100vw" height="100vh" bg="black" color="white">
      <Flex
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
            <Input
              marginBottom="10px"
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {mode === "signup" ? (
              <>
                <Input
                  marginBottom="10px"
                  placeholder="First Name"
                  type="text"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  marginBottom="10px"
                  placeholder="Last Name"
                  type="text"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            ) : null}

            <Input
              marginBottom="10px"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Flex gap="15px" direction="column" justify="center" align="center">
              <Button
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                _hover={{
                  background: "green.300",
                }}
              >
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </Button>
            </Flex>
          </form>
        </Box>
        {mode === "signin" && (
          <Text>
            Dont have account ?{" "}
            <LinkBox display="inline">
              <Link href="/signup" passHref>
                <LinkOverlay display="inline">Sign up !</LinkOverlay>
              </Link>
            </LinkBox>
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default AuthForm;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { Box, Flex, Link, LinkOverlay, Text } from "@chakra-ui/layout";
import {
  Button,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdArrowDropDown, MdArrowLeft, MdArrowRight } from "react-icons/md";
import NextLink from "next/link";

type LayoutType = "Profile" | "Playlist" | "CreatePlayList";
interface LinearGradientOptions {
  color: string;
  direction: "to-t" | "to-b";
}
interface ImageOptions {
  src: string;
  alt: string;
}
interface MainLayoutProps {
  type: LayoutType;
  image: React.ReactNode;
  header: React.ReactNode;
  gradient: LinearGradientOptions;
  children: ReactNode;
  description: string;
  userName: string;
  loading: boolean;
}
const MainLayout = ({
  type,
  image,
  header,
  gradient,
  description,
  children,
  userName,
  loading,
}: MainLayoutProps) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${gradient.direction}, ${gradient.color}.500 0%, ${gradient.color}.600 15%, ${gradient.color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex direction="column" bg={`${gradient.color}.600`}>
        <Flex direction="row-reverse" paddingY="20px" paddingX="20px">
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="gray"
              rightIcon={<MdArrowDropDown />}
            >
              <Skeleton isLoaded={loading}>
                <Text>{userName}</Text>
              </Skeleton>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <NextLink href="/profile" passHref>
                  <Link textDecoration="none">Profile</Link>
                </NextLink>
              </MenuItem>
              <MenuItem>
                <NextLink href="/api/logout" passHref>
                  <Link>Logout</Link>
                </NextLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Flex gap="15px" padding="20px">
          {image}
          <Flex
            direction="column"
            flexDirection="column"
            justifyContent="end"
            lineHeight="35px"
            color="white"
          >
            <Text textTransform="uppercase" fontSize="xs" fontWeight="bold">
              {type}
            </Text>
            <Skeleton isLoaded={loading}>
              {typeof header === "string" ? (
                <Text fontSize="5xl" fontWeight="extrabold" color="gray.100">
                  {header}
                </Text>
              ) : (
                header
              )}
            </Skeleton>
            <Text fontSize="xs" fontWeight="200">
              {description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Box paddingY="20px">{children}</Box>
    </Box>
  );
};

export default MainLayout;

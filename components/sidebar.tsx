import {
  Box,
  Center,
  Divider,
  Flex,
  Link,
  LinkBox,
  List,
} from "@chakra-ui/layout";
import {
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import { useSearch } from "../lib/hooks";
import MenuListItem from "./menuListItem";
import PlayList from "./playList";
import SearchResultsList from "./searchResultsList";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const navMusicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/playlist/create",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchValue, setSearchValue] = useState("");
  const { results, isLoading } = useSearch(searchValue);

  const handleClose = () => {
    setSearchValue("");
    onClose();
  };
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Flex marginBottom="20px" paddingX="20px" justify="space-between">
          <LinkBox>
            <NextLink href="/" passHref>
              <Link href="/">
                <Image src="/logo.svg" width={120} height={60} />
              </Link>
            </NextLink>
          </LinkBox>
          <Center>
            <IconButton
              variant="outline"
              aria-label="search"
              border="none"
              onClick={onOpen}
              icon={<MdSearch size={30} />}
            />
            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody bg="gray.700">
                  <Input
                    type="text"
                    aria-autocomplete="list"
                    borderColor="whiteAlpha.200"
                    _focus={{
                      borderColor: "whiteAlpha.900",
                    }}
                    color="whiteAlpha.800"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    maxLength={64}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                  {isLoading && searchValue ? (
                    <Spinner size="xl" />
                  ) : (
                    <SearchResultsList {...results} />
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        </Flex>
        <Box marginBottom="20px">
          <List spacing={2}>
            {navMenu.map((menuItem) => (
              <MenuListItem
                icon={menuItem.icon}
                name={menuItem.name}
                route={menuItem.route}
                key={menuItem.name}
              />
            ))}
          </List>
        </Box>
        <Box>
          <List spacing={2}>
            {navMusicMenu.map((menuItem) => (
              <MenuListItem
                icon={menuItem.icon}
                name={menuItem.name}
                route={menuItem.route}
                key={menuItem.name}
              />
            ))}
          </List>
        </Box>
        <Divider marginY="20px" bg="gray.400" />
        <Box height="66%" overflowY="auto" paddingY="20px">
          <PlayList />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;

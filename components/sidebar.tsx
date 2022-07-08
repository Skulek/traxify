import {
  Box,
  Center,
  Divider,
  Flex,
  Kbd,
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
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import debounce from "lodash.debounce";
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

  const handleClose = useCallback(() => {
    setSearchValue("");
    onClose();
  }, [onClose]);

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(changeHandler, 600),
    []
  );

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.metaKey && ev.shiftKey && ev.code === "KeyF") {
        if (!isOpen) {
          onOpen();
        } else {
          handleClose();
        }
      }
    },
    [handleClose, isOpen, onOpen]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Flex marginBottom="10px" paddingX="20px" justify="space-between">
          <LinkBox>
            <NextLink href="/" passHref>
              <Link href="/">
                <Image src="/logo.svg" width={120} height={60} />
              </Link>
            </NextLink>
          </LinkBox>
          <Center>
            <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalBody bg="gray.700">
                  <Input
                    type="text"
                    placeholder="Search..."
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
                    onChange={debouncedChangeHandler}
                  />
                  {isLoading && searchValue ? (
                    <Center padding={10}>
                      <Spinner size="xl" />
                    </Center>
                  ) : (
                    <SearchResultsList {...results} />
                  )}
                </ModalBody>
              </ModalContent>
            </Modal>
          </Center>
        </Flex>
        <Box paddingLeft="5px">
          <IconButton
            variant="outline"
            aria-label="search"
            _hover={{
              background: "transparent",
            }}
            border="none"
            onClick={onOpen}
            color="white"
            icon={<MdSearch size={25} />}
          />
          <span>
            <Kbd>cmd</Kbd> + <Kbd>shift</Kbd> + <Kbd>f</Kbd>
          </span>
        </Box>
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

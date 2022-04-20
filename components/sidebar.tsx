import { Box, Divider, List } from "@chakra-ui/layout";
import Image from "next/image";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";
import MenuListItem from "./menuListItem";
import PlayList from "./playList";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
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
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <Image src="/logo.svg" width={120} height={60} />
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

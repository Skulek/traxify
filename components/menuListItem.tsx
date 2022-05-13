import { ListItem, LinkBox, LinkOverlay, ListIcon } from "@chakra-ui/layout";
import Link from "next/link";
import { IconType } from "react-icons";

interface MenuItemProps {
  route: string;
  icon: IconType;
  name: string;
}

const MenuListItem = ({ route, icon, name }: MenuItemProps) => {
  return (
    <ListItem paddingX="1rem" fontSize="1rem">
      <LinkBox>
        <Link href={route} passHref>
          <LinkOverlay>
            <ListIcon as={icon} color="white" marginRight="1rem" />
            {name}
          </LinkOverlay>
        </Link>
      </LinkBox>
    </ListItem>
  );
};

export default MenuListItem;

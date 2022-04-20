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
    <ListItem paddingX="20px" fontSize="16px">
      <LinkBox>
        <Link href={route} passHref>
          <LinkOverlay>
            <ListIcon as={icon} color="white" marginRight="20px" />
            {name}
          </LinkOverlay>
        </Link>
      </LinkBox>
    </ListItem>
  );
};

export default MenuListItem;

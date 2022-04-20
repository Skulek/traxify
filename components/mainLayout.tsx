import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, IconButton, Image, Skeleton } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdArrowDropDown, MdArrowLeft, MdArrowRight } from "react-icons/md";

type LayoutType = "Profile" | "Playlist";
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
  image: ImageOptions;
  header: string;
  gradient: LinearGradientOptions;
  children: ReactNode;
  description: string;
  loading: boolean;
}
const MainLayout = ({
  type,
  image,
  header,
  gradient,
  description,
  children,
  loading,
}: MainLayoutProps) => {
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${gradient.direction}, ${gradient.color}.500 0%, ${gradient.color}.600 15%, ${gradient.color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex direction="column" bg={`${gradient.color}.600`}>
        <Flex paddingY="20px" paddingX="20px" justifyContent="space-between">
          <Flex gap="10px">
            <IconButton
              aria-label="Previous"
              icon={<MdArrowLeft />}
              rounded="full"
              size="sm"
              bgColor="black"
              color="white"
            />
            <IconButton
              aria-label="Next"
              icon={<MdArrowRight />}
              rounded="full"
              size="sm"
              bgColor="black"
              color="white"
            />
          </Flex>
          <Button
            size="sm"
            color="white"
            rounded="full"
            bgColor="black"
            rightIcon={<MdArrowDropDown />}
          >
            UserName
          </Button>
        </Flex>
        <Flex gap="15px" padding="20px">
          <Image
            boxSize="150px"
            src={image.src}
            alt={image.alt}
            rounded={type === "Profile" ? "full" : "none"}
            boxShadow="2xl"
          />
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
              <Text fontSize="5xl" fontWeight="extrabold" color="gray.100">
                {header}
              </Text>
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

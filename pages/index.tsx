import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { Artist } from "@prisma/client";
import MainLayout from "../components/mainLayout";
import { useUser } from "../lib/hooks";
import { prisma } from "../lib/prisma";

interface HomeProps {
  artists: Artist[];
}

const Home = ({ artists }: HomeProps) => {
  const { user, playlistCount, isLoading } = useUser();
  return (
    <MainLayout
      image={{
        src: "https://bit.ly/dan-abramov",
        alt: "Dan-Abramov",
      }}
      type="Profile"
      header={`${user?.firstName} ${user?.lastName}`}
      gradient={{
        direction: "to-b",
        color: "red",
      }}
      description={`Your number of playlists ${playlistCount}`}
      loading={!isLoading}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="60px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text>only visible to You</Text>
        </Box>
        <Flex justify="space-evenly">
          {artists.map((artist) => (
            <Box bg="red.800" borderRadius="4px" key={artist.id}>
              <Image
                boxShadow="2xl"
                rounded="full"
                src="gibbresh.png"
                fallbackSrc="https://via.placeholder.com/150"
              />
              <Box marginTop="5px">
                <Text fontSize="l" fontWeight="bold">
                  {artist.name}
                </Text>
                <Text fontSize="xs">Artist</Text>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </MainLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});

  return {
    props: { artists },
  };
};

export default Home;

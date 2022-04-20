export const artistsData: {
  id: number;
  name: string;
  songs: any[];
  albums: any[];
}[] = [
  {
    id: 1,
    name: "Glitch",
    songs: [
      {
        id: 1,
        albumId: 1,
        artistId: 1,
        name: "Fermi Paradox",
        duration: 235,
        url: "https://dl.dropboxusercontent.com/s/7xmpwvvek6szx5n/fermi-paradox.mp3?dl=0",
      },
    ],
    albums: [
      {
        id: 1,
        artistId: 1,
        name: "First is first",
      },
    ],
  },
  {
    id: 2,
    name: "Purple Cat",
    songs: [
      {
        id: 2,
        artistId: 2,
        albumId: 2,
        name: "Long Day",
        duration: 185,
        url: "https://dl.dropboxusercontent.com/s/9h90r7ku3df5o9y/long-day.mp3?dl=0",
      },
    ],
    albums: [
      {
        artistId: 2,
        createdAt: new Date(
          +new Date() - Math.floor(Math.random() * 10000000000)
        ),
        updatedAt: new Date(
          +new Date() - Math.floor(Math.random() * 10000000000)
        ),
        id: 2,
        name: "Truth",
      },
    ],
  },
  {
    id: 3,
    name: "Ben Sound",
    songs: [
      {
        artistId: 3,
        id: 3,
        name: "The Elevator Bossa Nova",
        duration: 238,
        albumId: 3,
        url: "https://dl.dropboxusercontent.com/s/7dh5o3kfjcz0nh3/The-Elevator-Bossa-Nova.mp3?dl=0",
      },
    ],
    albums: [
      {
        artistId: 3,
        id: 3,
        name: "Hey Hi Hello",
      },
    ],
  },
  {
    id: 4,
    name: "LiQWYD",
    songs: [
      {
        name: "Winter",
        id: 4,
        artistId: 4,
        albumId: 4,
        duration: 162,
        url: "https://dl.dropboxusercontent.com/s/tlx2zev0as500ki/winter.mp3?dl=0",
      },
    ],
    albums: [
      {
        artistId: 4,
        id: 4,
        name: "Fifirifi",
      },
    ],
  },
  {
    id: 5,
    name: "FSM Team",
    songs: [
      {
        id: 5,
        artistId: 5,
        albumId: 5,
        name: "Eternal Springtime",
        duration: 302,
        url: "https://dl.dropboxusercontent.com/s/92u8d427bz0b1t8/eternal-springtime.mp3?dl=0",
      },
      {
        id: 6,
        artistId: 5,
        albumId: 5,
        name: "Astronaut in a Submarine",
        duration: 239,
        url: "https://dl.dropboxusercontent.com/s/9b43fr6epbgji4f/astronaut-in-a-submarine.mp3?dl=0",
      },
    ],
    albums: [
      {
        artistId: 5,
        id: 5,
        name: "HigvFive",
      },
    ],
  },
];

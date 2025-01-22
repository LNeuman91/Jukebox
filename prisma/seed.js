const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.createMany({
    data: [
      { name: "Alice", email: "alice@example.com" },
      { name: "Bob", email: "bob@example.com" },
      { name: "Charlie", email: "charlie@example.com" },
      { name: "David", email: "david@example.com" },
      { name: "Eve", email: "eve@example.com" },
    ],
  });

  const tracks = await prisma.track.createMany({
    data: [
      { title: "Song 1", artist: "Artist A" },
      { title: "Song 2", artist: "Artist B" },
      { title: "Song 3", artist: "Artist C" },
      { title: "Song 4", artist: "Artist D" },
      { title: "Song 5", artist: "Artist E" },
      { title: "Song 6", artist: "Artist F" },
      { title: "Song 7", artist: "Artist G" },
      { title: "Song 8", artist: "Artist H" },
      { title: "Song 9", artist: "Artist I" },
      { title: "Song 10", artist: "Artist J" },
      { title: "Song 11", artist: "Artist K" },
      { title: "Song 12", artist: "Artist L" },
      { title: "Song 13", artist: "Artist M" },
      { title: "Song 14", artist: "Artist N" },
      { title: "Song 15", artist: "Artist O" },
      { title: "Song 16", artist: "Artist P" },
      { title: "Song 17", artist: "Artist Q" },
      { title: "Song 18", artist: "Artist R" },
      { title: "Song 19", artist: "Artist S" },
      { title: "Song 20", artist: "Artist T" },
    ],
  });

  const allUsers = await prisma.user.findMany();
  const allTracks = await prisma.track.findMany();

  for (let i = 0; i < 10; i++) {
    await prisma.playlist.create({
      data: {
        name: `Playlist ${i + 1}`,
        description: `This is playlist ${i + 1}`,
        ownerId: allUsers[Math.floor(Math.random() * allUsers.length)].id,
        tracks: {
          connect: allTracks
            .sort(() => 0.5 - Math.random())
            .slice(0, Math.floor(Math.random() * 5) + 3)
            .map((track) => ({ id: track.id })),
        },
      },
    });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());

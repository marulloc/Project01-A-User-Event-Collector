import prisma from "../../prisma";

const getArtistById = async (id: number): Promise<Object | null> => {
  const artist: any = await prisma.artists.findUnique({ where: { id } });
  if (!artist) return null;
  const trackIdArr = await prisma.artists_Tracks.findMany({
    where: { artistId: artist.id },
    include: {
      Tracks: {
        include: {
          Albums: true,
          Artists_Tracks: {
            include: {
              Artists: {
                select: {
                  id: true,
                  artistName: true,
                },
              },
            },
          },
        },
      },
    },
  });
  const tracks: any = [];
  trackIdArr.forEach((el) => tracks.push(el.Tracks));
  artist.Tracks = tracks;
  artist.Tracks.forEach((el) => {
    el.Artists = [];
    el.Artists_Tracks.forEach((artist) => el.Artists.push(artist));
    delete el.Artists_Tracks;
  });
  return artist;
};

export default getArtistById;

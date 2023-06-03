import RNFetchBlob from "rn-fetch-blob";
let soundUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"

export const saveFileToTemp = (fileUrl: string) => {
    RNFetchBlob.config({
        fileCache: true,
    })
        .fetch("GET", fileUrl, {
        })
        .then((res) => {
            console.log("The file saved to ", res.path());
            console.log(res);

            return res
        }).catch((e) => {
            console.log("error", e);

        });
}

export const track1 = {
    url: soundUrl,
    title: 'Song name',
    artist: 'XYZ',
    album: 'Album',
    artwork: 'https://static.wikia.nocookie.net/cartooncharacters/images/6/66/BUBBLES_PPG.png/revision/latest/scale-to-width-down/300?cb=20170411232527',
};
import { createClient } from 'pexels';
import "dotenv/config";

function getWallpapers(query) {
    const client = createClient(process.env.PEXELS_API_KEY);
    return client.photos.search({ query, per_page: 10 })
        .then(photo => {
            const wallpaperUrls = photo.photos.map(photo => photo.src.original);
            return wallpaperUrls;
        })
        .catch(err => {
            console.log("failed to fetch wallpapers cause: " + err.message);
            return [];
        });
}

export default getWallpapers;
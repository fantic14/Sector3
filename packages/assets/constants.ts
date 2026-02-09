import HomePageBackground from "./images/HomePageBackground.jpg";
import AbuDhabiGP from "./images/gp-images/abu-dhabi-gp.webp";
import AustralianGP from "./images/gp-images/australian-gp.jpg";
import ChineseGP from "./images/gp-images/chinese-gp.jpg";
import JapaneseGP from "./images/gp-images/japanese-gp.jpg";
import MiamiGP from "./images/gp-images/miami-gp.jpg";
import FerrariLogo from "./images/team-logos/ferrari.jpg"
import RedBullLogo from "./images/team-logos/red-bull.png"

export const ASSETS = {
    BACKGROUNDS: {
        HOMEPAGE: HomePageBackground.src,
    },
    TRACKS: {
        ABUDHABI: AbuDhabiGP.src,
        AUSTRALIA: AustralianGP.src,
        CHINA: ChineseGP.src,
        JAPAN: JapaneseGP.src,
        MIAMI: MiamiGP.src,
    },
    TEAM_LOGOS: {
        FERRARI: FerrariLogo.src,
        REDBULL: RedBullLogo.src,
    },
} as const;
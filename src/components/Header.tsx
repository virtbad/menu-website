import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/Header.module.scss";
import { searchDebounceDelay } from "../util/global.config";
import QuickProfile from "./QuickProfile";
import { Autocomplete, Link } from "./system";

interface HeaderProps {
  hideSearchbar?: boolean | "scroll-in";
}

/**
 * Header component
 */

const Header: React.FC<HeaderProps> = ({ hideSearchbar = false }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);
  const router = useRouter();
  const { headerSearchbar } = useSearchbar();

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      setVisible(window.scrollY > 200);
      const newOpacity: number = window.scrollY / 250;
      document.documentElement.style.setProperty("--header-opacity", (newOpacity > 1 ? 1 : newOpacity).toFixed(2));
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      return window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={style["header-container"]} data-background={visible}>
      <div children={<Logo />} />
      {(hideSearchbar === "scroll-in" && visible) || !hideSearchbar || (router.pathname === "/search" && headerSearchbar) ? <Searchbar /> : <span />}
      <div children={<QuickProfile />} />
    </header>
  );
};

/**
 * Header search bar component
 */

const Searchbar: React.FC = (): JSX.Element => {
  let mounted: boolean = true;
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { getMenuResults } = useSearchbar();
  const [results, setResults] = useState<Array<Menu>>([]);

  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    getMenuResults(event.target.value)
      .then((menus: Array<Menu>) => mounted && setResults(menus))
      .catch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;
    router.push(`/search?query=${ref?.current?.getAttribute("data-text")}`);
  };

  return (
    <Autocomplete
      ref={ref}
      onAutocomplete={(event: any, value: string, reason: string) => {
        if (reason === "input") ref.current?.setAttribute("data-text", event.target.value);
        else router.push(`/search?query=${value}`);
      }}
      themedBackground
      onKeyPress={handleKeyPress}
      onChange={debounce(handleChange, searchDebounceDelay)}
      placeholder={"Menü suchen"}
      options={results.map(({ title }) => title)}
    />
  );
};

const Logo: React.FC = (): JSX.Element => {
  return (
    <div className={style["logo-container"]}>
      <Link noUnderline href="/">
        <svg viewBox="0 0 137.54352 137.54352" version="1.1" id="svg5" xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
          <defs id="defs2">
            <linearGradient id="linearGradient25008">
              <stop style={{ stopColor: "#bbbbbb", stopOpacity: 1 }} offset="0" id="stop25006" />
            </linearGradient>
            <linearGradient id="linearGradient16081-3">
              <stop style={{ stopColor: "#27892e", stopOpacity: 1 }} offset="0" id="stop16077" />
              <stop style={{ stopColor: "#68ae2d", stopOpacity: 1 }} offset="1" id="stop16079" />
            </linearGradient>
            <radialGradient
              xlinkHref="#linearGradient16081-3"
              id="radialGradient983"
              cx="103.47589"
              cy="66.601105"
              fx="103.47589"
              fy="66.601105"
              r="33.99509"
              gradientTransform="matrix(1.8848236,0.01011563,-0.01034177,1.9269604,-58.665262,-75.271399)"
              gradientUnits="userSpaceOnUse"
            />
          </defs>
          <g id="layer1" transform="translate(-66.621124,14.621002)" />
          <g id="layer2" style={{ display: "inline" }} transform="translate(-66.621124,14.621002)">
            <g id="g1480">
              <circle style={{ display: "inline", fill: "#ffffff", stroke: "none", strokeWidth: 0.411001, strokeLinecap: "round", strokeLinejoin: "round" }} id="path1326" cx="135.39288" cy="54.150757" r="68.771759" />
              <path
                id="path940"
                style={{ display: "inline", fill: "url(#radialGradient983)", fillOpacity: 1, stroke: "none", strokeWidth: "0.264583px", strokeLinecap: "butt", strokeLinejoin: "miter", strokeOpacity: 1 }}
                d="m 135.57896,-8.5524043 c -34.48137,10e-7 -62.519415,24.5108623 -60.306911,59.0914823 0.805056,12.582694 6.503472,22.534025 14.332461,29.986285 0.762755,8.106231 3.418684,16.401701 10.240201,22.474577 a 1.7640664,1.7640664 0 0 0 0.106967,0.0884 c 10.353992,7.84411 21.335602,13.76557 35.627282,13.76557 34.60913,0 62.70316,-28.094006 62.70316,-62.703136 0,-34.609122 -28.09403,-62.7031497 -62.70316,-62.7031483 z m 0,3.5274332 c 32.70257,-1.1e-6 59.17366,26.4731461 59.17366,59.1757151 0,32.70257 -26.47109,59.175706 -59.17366,59.175706 -13.29337,0 -23.36106,-5.38864 -33.42018,-12.99817 -4.91868,-4.396086 -7.363769,-10.144286 -8.484234,-16.259467 2.99136,2.327476 6.178269,4.370431 9.482624,6.064231 5.55624,2.84811 13.42763,5.61738 21.15633,6.95719 2.70235,5.070356 6.29725,9.319756 10.21075,10.907856 5.51609,2.23842 10.40065,0.41281 14.83217,-2.31407 4.43152,-2.72689 8.7869,-6.328356 14.1795,-8.531256 9.26032,-3.7829 14.91204,-7.48247 17.93947,-11.595669 3.02744,-4.113194 3.06009,-8.708118 1.26349,-12.927894 -3.5932,-8.439541 -13.50669,-16.594153 -21.40438,-26.363247 -3.05072,-3.773601 -2.68107,-7.778411 -0.709,-11.367264 0.20304,-0.369486 0.49424,-0.689319 0.73277,-1.041281 1.71155,4.590391 3.66443,9.157091 7.48998,12.439552 3.37274,2.89393 7.28028,3.951282 10.66241,3.195669 3.38212,-0.755613 6.13835,-3.438242 6.93549,-7.224882 1.58354,-7.522284 -0.76736,-12.764963 -4.67413,-15.49001 -3.90678,-2.725047 -8.94254,-3.113479 -12.96666,-2.355411 -2.17448,0.409631 -4.29793,1.449544 -6.20117,2.902149 -2.04092,-5.578512 -4.43726,-11.217365 -9.74618,-14.459067 -9.48729,-5.7930657 -23.62212,-8.0113497 -33.34938,-1.839681 -6.34735,4.027209 -11.80433,10.490435 -15.35927,17.661971 -0.35402,0.714185 -0.59875,1.460138 -0.91416,2.187464 -0.57354,0.551042 -1.21255,1.007306 -1.74614,1.615406 -5.201439,5.927682 -8.539002,14.399728 -10.500138,25.072371 a 1.7640664,1.7640664 0 0 0 -0.0078,0.04651 C 90.248351,62.30513 89.341155,68.593133 89.369852,75.240416 83.524052,68.706878 79.443563,60.4683 78.793799,50.312735 76.70842,17.719021 102.74866,-5.0249701 135.57896,-5.0249711 Z m -2.27531,15.9974731 c 6.19906,0.006 12.76088,1.876426 17.71675,4.902543 4.42558,2.702322 6.59134,7.933087 8.70696,13.810525 0.0297,0.08252 0.068,0.167381 0.0977,0.250116 -0.86569,1.001471 -1.64621,2.090788 -2.29082,3.263881 -2.47129,4.497359 -2.89989,10.388693 1.05834,15.284857 8.17824,10.116117 17.94645,18.589191 20.90053,25.52764 1.47705,3.469225 1.50023,6.250118 -0.85731,9.453169 -2.35754,3.203053 -7.46604,6.758271 -16.43362,10.421581 -6.00848,2.45449 -10.58814,6.266956 -14.69368,8.793256 -4.10554,2.5263 -7.36188,3.79396 -11.6582,2.05052 -1.93789,-0.7864 -4.52991,-3.52457 -6.83369,-6.955126 4.36753,0.37726 8.53543,0.17666 12.04112,-1.12293 3.60532,-1.33653 6.53231,-3.99298 7.65586,-7.98452 0.76533,-2.718897 -0.1246,-5.486756 -1.72444,-7.841897 -1.59985,-2.355141 -3.94476,-4.425347 -6.58202,-6.05441 -2.63727,-1.629063 -5.56693,-2.814561 -8.42585,-3.246313 -2.85891,-0.431752 -5.75114,-0.110556 -7.96695,1.60972 -2.69286,2.090642 -3.84623,5.332216 -3.96255,8.720399 -0.11632,3.388183 0.71996,7.036411 2.08359,10.545081 0.11073,0.28492 0.26824,0.54692 0.38499,0.82993 -6.53241,-1.41249 -13.13152,-3.86685 -17.75395,-6.23631 -4.2288,-2.167668 -8.198587,-4.908125 -11.763625,-8.111131 -0.510567,-7.53559 0.586925,-15.11128 1.458825,-20.69951 1.309841,-7.120252 3.290893,-12.990182 5.88077,-17.714682 -0.547776,3.522461 -0.568363,7.018769 0.19379,10.310482 2.12203,9.16491 9.71506,17.912161 22.12113,17.912085 a 1.7640664,1.7640664 0 0 0 0.002,0 c 4.3849,-0.0051 8.63498,-1.335519 12.30106,-3.706749 l 26.81645,19.791039 a 1.7640664,1.7640664 0 0 0 2.46652,-0.373105 l 6.66626,-9.033557 A 1.7640664,1.7640664 0 0 0 170.5385,72.904638 L 144.05338,53.35751 c 0.83243,-2.391008 1.35597,-4.878951 1.35961,-7.417634 a 1.7640664,1.7640664 0 0 0 -0.002,-0.05685 c -0.39023,-12.6857 -11.735,-22.880818 -22.781,-22.700933 -4.91168,0.07999 -9.23242,1.209029 -13.04727,3.134691 3.17355,-5.023017 7.30279,-9.44871 11.81633,-12.312425 3.01012,-1.909834 6.73932,-2.85082 10.67015,-3.008086 0.40946,-0.01638 0.82128,-0.02417 1.23455,-0.02377 z m 39.071,16.659449 c 0.78969,0.0028 1.59492,0.06195 2.39003,0.182933 1.81741,0.276542 3.58014,0.875376 4.98782,1.85725 2.81535,1.963754 4.6296,5.278419 3.24218,11.869044 -0.54479,2.587887 -2.12243,4.031626 -4.25349,4.507736 -2.13106,0.47611 -4.91631,-0.128561 -7.59592,-2.427759 -3.43171,-2.944529 -5.32169,-7.715681 -7.15822,-12.749609 1.74942,-1.527498 3.70774,-2.65031 5.47253,-2.982764 0.80872,-0.152347 1.68081,-0.239731 2.57763,-0.254765 0.1121,-0.0019 0.22463,-0.0025 0.33744,-0.0021 z m -49.86362,2.726965 a 15.683071,15.683071 0 0 1 15.68328,15.68328 15.683071,15.683071 0 0 1 -15.68328,15.68328 15.683071,15.683071 0 0 1 -15.68277,-15.68328 15.683071,15.683071 0 0 1 15.68277,-15.68328 z m 7.3365,44.523379 c 0.50777,0.0029 1.04495,0.04672 1.60817,0.131776 2.2529,0.340233 4.81382,1.346639 7.09776,2.757453 2.28394,1.410814 4.28887,3.228766 5.51749,5.037418 1.22862,1.808654 1.64751,3.479254 1.24644,4.904092 -0.82079,2.91598 -2.65017,4.57921 -5.48649,5.63066 -2.83631,1.05145 -6.66852,1.30495 -10.84585,0.9126 -0.71884,-0.0675 -1.48135,-0.24864 -2.21692,-0.35191 -0.46456,-0.92323 -0.97243,-1.82623 -1.34358,-2.78122 -1.23691,-3.18263 -1.94024,-6.4431 -1.84744,-9.146213 0.0928,-2.703113 0.89747,-4.734128 2.6014,-6.056995 0.59224,-0.459795 1.34858,-0.771173 2.2381,-0.925523 0.44476,-0.07718 0.92315,-0.115051 1.43092,-0.112138 z"
              />
            </g>
          </g>
        </svg>
      </Link>
    </div>
  );
};

export default Header;

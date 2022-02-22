import React, {useState} from "react";
import style from "../styles/modules/MenuPage.module.scss";
import CommentBox from "./CommentBox";
import {Menu} from "../classes/Menu.class";
import {randomMenu} from "../util/test";

const MenuPage: React.FC = (): JSX.Element => {
  // TODO: Fetch menu
  // TODO: Flex wrap when too small
  return (
    <section className={style["menupage-container"]}>
      <div className={style["menupage-menu-container"]}>
        <BackgroundBlob/>
        <div className={style["menupage-menu-blobtainer"]}>
          <div className={style["menupage-menu-box"]}>
            <Rating menu={randomMenu()}/>

            <MenuDisplay menu={randomMenu()}/>
          </div>
        </div>

      </div>
      <div className={style["menupage-comments-container"]}>
        <CommentBox menuId=""/>
      </div>

    </section>
  );
};

const MenuDisplay: React.FC<{menu: Menu}> = ({menu}): JSX.Element => {
  // TODO: Add prices and label
  return (
    <div className={style["menu-textbox"]}>
      <h3 className={style["menu-title"]}>{menu.title}</h3>
      <div className={style["menu-content"]}>{menu.description}</div>
    </div>
  )
}

const BackgroundBlob: React.FC = (): JSX.Element => {
  return (
  <svg className={style["menupage-blob"]} viewBox="0 0 440 440" xmlns="http://www.w3.org/2000/svg">
    <path className={style["menupage-blob-path"]} d="M220,409.7973050402167C238.90103774120314,413.71371692332383,255.29507691923845,435.0807099683788,273.96211529974534,430.16856300058436C292.69655318331957,425.23868015750674,295.7712115453857,397.58409951950426,311.15497522382293,385.8102843882068C324.49157072241184,375.60324967527947,344.47463377036314,377.03961890572765,357.3967457522401,366.3126734387405C370.251406074167,355.64172116225944,374.1376872146776,337.434816134299,384.8618385607835,324.6245041792812C396.66389933296904,310.5265979371547,420.2944938030966,304.3262413567572,424.3090088957479,286.3840211080526C428.532180063022,267.5092465755281,407.4664034848477,250.93730940470817,405.6577445363389,231.68059522056686C404.1052325226024,215.15106645528087,412.87015381299835,199.39364127388018,414.58758451399535,182.88043302888775C416.50452837650016,164.44889271862894,425.3259220713612,143.82747059821097,416.48878919529,127.53939414605274C407.40471832046603,110.79617629690158,381.3467857719581,111.18377664491675,368.206251750589,97.39312570900364C355.93715003497914,84.5170204622886,354.4968195551162,64.21093559787289,343.11963410628636,50.540361561081426C331.43757087910166,36.50345313869716,318.06562268965246,21.810664454710476,300.67208637272455,16.24556843630675C283.0156802159751,10.596366697692162,263.67289170418354,16.386145497230892,245.3591444928194,19.261701397212274C228.5582157569649,21.899720214113614,212.6652275350172,27.898739136655205,196.32954348551536,32.62904317555565C181.18564182518895,37.01424424650422,166.29015840512736,41.59583731213191,151.30521646966685,46.49678223338556C135.87588145081,51.543069461235504,119.54877090023362,54.284851470345515,105.45967018266049,62.34876087460869C91.16445051130587,70.53064264652784,77.99252946871059,81.15754326733516,67.94422298712105,94.20852145419887C57.9245914511022,107.22225594334714,55.551237666727694,124.59635651210226,46.822076457582035,138.50865488643197C37.28985380545673,153.70085062317347,20.0325475275758,163.86467528135253,13.708579318598744,180.6478068748605C7.507383755598991,197.10511306801376,11.155707215688635,215.5519258946514,11.164967953679046,233.13878655209965C11.17447209811063,251.18789494492785,7.248403570109987,270.178139805577,13.764586581016884,287.0099478805638C20.329323685588445,303.9671749599663,34.44720444742203,317.168909517229,48.269750939044265,328.9833300261453C61.486566162044255,340.2800193104107,82.36390289487913,341.41433489171646,93.26419154970563,354.95992829568445C105.95782269857635,370.7340762845464,98.03651669657106,400.0380682800343,114.70162612846508,411.5370310219991C130.36002906376282,422.34136403208225,152.46800000499704,409.24989171062606,171.48957794611917,408.93561968398444C187.72406944515774,408.66739553556255,204.1010127710938,406.5029365846203,220,409.7973050402167" fill="url(#gradient)" />
  </svg>
  )
}

const Rating: React.FC<{menu: Menu}>  = ({menu}): JSX.Element => {

  const [{voting, rating, initialVoting}, setVoting] = useState(() => {/* TODO: Fetch from endpoint*/ return {voting: 1, initialVoting: 1, rating: menu.rating}})
  const changeVoting = (direction: number) => {
    // TODO: Update on server
    setVoting({voting: direction, rating: menu.rating - initialVoting + direction, initialVoting: initialVoting});
  };

  return (
    <div className={style["menupage-menu-rating"]}>
      <div className={style["menupage-menu-rating-box"]}>
        <VotingButton handler={changeVoting} direction={"up"} chosen={voting > 0}/>
        <div className={style["menupage-menu-rating-number"]}>{rating}</div>
        <VotingButton handler={changeVoting} direction={"down"} chosen={voting < 0}/>
      </div>
      <div className={style["menupage-menu-rating-grower"]}/>
    </div>
  );
}

interface VotingButtonProps {
  direction: "up" | "down"
  chosen: boolean,
  handler: (direction: number) => void
}
const VotingButton: React.FC<VotingButtonProps> = ({direction, chosen, handler}): JSX.Element => {
  return (
    <svg onClick={() => handler(chosen ? 0 : (direction == "up" ? 1 : -1))} className={style["menupage-menu-rating-button"]} viewBox="0 0 150 100" data-direction={direction} data-chosen={chosen}>
      <polyline points="25 25 75 75 125 25" stroke-width={20} stroke-linejoin={"round"} stroke-linecap={"round"}/>
      <defs>
        <linearGradient id="BackgroundGradient" gradientTransform="rotate(65)">
          <stop offset="0%" stop-color="#184d0f" />
          <stop offset="100%" stop-color="#298519" />
        </linearGradient>
      </defs>
    </svg>
  )
}

const MenuDivider: React.FC = (): JSX.Element => {
  return <div className={style["menupage-divider"]}></div>;
};

export default MenuPage;

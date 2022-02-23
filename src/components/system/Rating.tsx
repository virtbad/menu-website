import StarIcon from "@mui/icons-material/Star";
import { Rating as MuiRating, RatingProps as MuiRatingProps } from "@mui/material";
import React from "react";
import style from "../../styles/modules/system/Rating.module.scss";

interface RatingProps extends MuiRatingProps {}

/**
 * Rating component
 */

const Rating: React.FC<RatingProps> = ({ ...props }): JSX.Element => {
  return <MuiRating precision={0.5} classes={{ iconEmpty: style["rating-empty"], iconHover: style["rating-hover"], iconFilled: style["rating-filled"], decimal: style["rating-decimal"] }} emptyIcon={<StarIcon fontSize={"inherit"} />} {...props} />;
};

export default Rating;

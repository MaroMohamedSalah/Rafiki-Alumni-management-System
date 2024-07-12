import Rating from '@mui/material/Rating';
import { useMediaQuery } from '@mui/material';

const RateStars = ({ value = 4 }) => {
  const isLandscape = useMediaQuery('(min-width: 844px) and (max-width: 1023px) and (orientation: landscape)');

  return (
    <Rating
      name="size-large"
      value={value}
      size={isLandscape ? 'small' : 'large'} // set size based on media query
      icon={<i className="fa-solid fa-star"></i>}
      emptyIcon={<i className="fa-solid fa-star"></i>}
    // onChange={(event, newValue) => {
    //   setValue(newValue);
    // }}
    />
  );
};

export default RateStars;

import classes from "./styles.module.scss";

interface Props {
  percentage: number;
}
const radius = 20.2;
const Score = ({ percentage }: Props): JSX.Element => {
  const getColor = () => {
    if (percentage > 60 && percentage < 75) {
      return "blue";
    }
    if (percentage < 60) {
      return "yellow";
    }
    return "";
  };
  return (
    <div className={classes.scoreWrapper}>
      <span className={`${classes.score} ${getColor()}`}>
        <svg viewBox="22 22 44 44">
          <circle
            style={{
              strokeDashoffset:
                ((100 - percentage) * 2 * Math.PI * radius) / 100,
            }}
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            strokeWidth="4"
          ></circle>
        </svg>
      </span>
      <span className={classes.percentage}>{percentage}%</span>
    </div>
  );
};

export default Score;

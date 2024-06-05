import { LENS_TYPE_COLOR } from "../utils"
import styles from "../styles.module.scss";

const LineageLegend = () => {
    return <div className={styles.column_legend}>
    {Object.entries(LENS_TYPE_COLOR).map(([k, v]) => (
      <div key={k}>
        <div className={styles.dot}  style={{ backgroundColor: v }}/> {k}
      </div>
    ))}
  </div>
}

export default LineageLegend
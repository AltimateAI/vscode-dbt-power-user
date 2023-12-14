import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { LineageContext } from "../App";
import { ExposureMetaData, getExposureDetails } from "../service";
import { ComponentLoader } from "../Loader";
import { NodeTypeIcon } from "../CustomNodes";
import styles from "../styles.module.scss";
import { ColumnRow, Purpose as PurposeSection, Chip } from "../components";

/**
 * Component to display exposure details
 */
const ExposureDetails = () => {
  const { selectedTable } = useContext(LineageContext);
  const [data, setData] = useState<ExposureMetaData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (!selectedTable) {
      return;
    }
    getExposureDetails(selectedTable.label).then((_data) => {
      setData(_data);
      setIsLoading(false);
    });
  }, [selectedTable]);

  if (isLoading || !data || !selectedTable) return <ComponentLoader />;

  return (
    <div className="p-2 h-100 d-flex flex-column gap-md overflow-y">
      <div className={styles.table_details_header}>
        <NodeTypeIcon nodeType={selectedTable.nodeType} />
        <div className="d-flex align-items-center">
          <div className="fw-semibold fs-5 lines-2">{selectedTable.label}</div>
        </div>
      </div>
      {data.description ? <PurposeSection purpose={data.description} /> : null}
      <div className={classNames(styles.card, "flex-grow column-section")}>
        <ColumnRow
          title="Owner"
          value={`${data.owner.name} - ${data.owner.email}`}
        />
        <ColumnRow title="Url" value={data.url} />
        <ColumnRow
          title="Tags"
          value={data.tags.map((tag) => (
            <Chip label={tag} />
          ))}
        />
        <ColumnRow title="Maturity" value={data.maturity} />
      </div>
    </div>
  );
};

export default ExposureDetails;

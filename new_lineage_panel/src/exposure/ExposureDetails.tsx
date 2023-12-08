import { useContext, useEffect, useState } from "react";
import { ExposureMetaData } from "@types";
import { LineageContext } from "../App";
import { getExposureDetails } from "../service";
import { ComponentLoader } from "../Loader";
import { NodeTypeIcon } from "../CustomNodes";
import styles from "../styles.module.scss";
import PurposeSection from "../components/Purpose";
import { Container, Nav, NavItem, NavLink } from "reactstrap";
import Chip from "../components/Chip";

enum DependsOnTypes {
  Models = "nodes",
  Macros = "macros",
  Sources = "sources",
}

/**
 * Component to display exposure details
 */
const ExposureDetails = () => {
  const { selectedTable } = useContext(LineageContext);
  const [data, setData] = useState<ExposureMetaData | null>(null);
  const [selectedDependsOn, setSelectedDependsOn] = useState(
    DependsOnTypes.Models
  );

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
      <div>
        <h5>Depends on</h5>
        <Nav tabs>
          <NavItem onClick={() => setSelectedDependsOn(DependsOnTypes.Models)}>
            <NavLink> Models</NavLink>
          </NavItem>
          <NavItem onClick={() => setSelectedDependsOn(DependsOnTypes.Macros)}>
            <NavLink>Macros</NavLink>
          </NavItem>
        </Nav>
        <Container className="">
          {data.depends_on[selectedDependsOn]?.map((item) => (
            <Chip label={item} />
          ))}
        </Container>
      </div>
      <div>
        <h5>Owner</h5>
        {data.owner.name} - {data.owner.email}
      </div>
      <div>
        <h5>Url</h5>
        {data.url}
      </div>
      <div>
        <h5>Tags</h5>
        {data.tags.map((tag) => (
          <Chip label={tag} />
        ))}
      </div>
      <div>
        <h5>Maturity</h5>
        <div>{data.maturity}</div>
      </div>
    </div>
  );
};

export default ExposureDetails;

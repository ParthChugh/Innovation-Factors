import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import PageTitle from "./../../components/PageTitle";
import Button from "./../../components/Button";
import clsx from "clsx";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { fetchStages } from "./../../utils/http";
import { styles } from "./../../styles/container/innovationCapacity.styles";
import { withStyles } from "@material-ui/core/styles";

const Stages = ({ classes, history, title }) => {
  const [stages, setStages] = useState([]);
  const [showDetails, setShowDetails] = useState("");

  useEffect(() => {
    getStagesData();
  }, []);

  const handleShowFactorDetails = (data) => {
    if (!showDetails) setShowDetails(data.stageId);
    else if (showDetails)
      setShowDetails(showDetails === data.stageId ? "" : data.stageId);
  };

  const handleimprovementRes = (stageId) => {
    console.log("id", stageId);
    history.push(`/improvement-resources?stageId=${stageId}`);
  };

  const DataBox = (props) => {
    return (
      <Card>
        <div className={classes.databox}>
          <div className={classes.part1}>
            <div className={classes.textStyle}>{props.data.stageName}</div>
            <div className={classes.textStyle}>{props.data.score}</div>
            <Button
              text="Improvement Resources"
              color="primary"
              onClick={() => handleimprovementRes(props.data.stageId)}
            />
          </div>
          <div className={classes.part2}>
            <div className={clsx(classes.titleWrapper)}>
              <ArrowDropDownIcon />
              <p
                className={classes.textBorder}
                onClick={() => handleShowFactorDetails(props.data)}
              >
                Innovation Factors
              </p>
            </div>
            <Collapse
              in={showDetails === props.data.stageId}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                {props.data.factors.map((item, index) => {
                  return (
                    <div key={`factor${index}`}>
                      <div className={classes.factorDataWrapper}>
                        <div className={classes.factorData}>
                          <div>{item.name}</div>
                          <div>{item.score}</div>
                          <Button text="Factor Fix" color="primary" />
                        </div>
                        <p className={classes.factorDataDesc}>
                          {item.factorFixText}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Collapse>
          </div>
        </div>
      </Card>
    );
  };

  const getStagesData = () => {
    fetchStages({ stage: "", type: "" })
      .then((response) => {
        setStages(response.data.stages);
      })
      .catch((error) => {
        console.log("Error in fetching stages", error);
      });
  };

  return (
    <Layout>
      <PageTitle title={title} />
      <div>
        {stages.map((item) => {
          return <DataBox data={item} />;
        })}
      </div>
    </Layout>
  );
};

export default withStyles(styles, { withTheme: true })(Stages);
import React from "react";
import { AppContext } from "../app/AppStore";
import CountyMap from "../components/Maps/CountyMap";
import Card from "../components/Card/Card";
import USATotals from "../components/USATotals";
import StateSelect from "../components/Forms/StateSelect";
import CountySelect from "../components/Forms/CountySelect";
import { MixedBar } from "../components/Charts/MixedBar";
import { StateMixedBar } from "../components/Charts/StateMixedBar";

export const Dashboard: React.FC<{}> = () => {

  return (
  <AppContext.Consumer>
    {({ state }) => {
    return (
      <div className="dashboard grid-container">
      <Card>
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
        >
        <div style={{ display: "flex" }}>
          <StateSelect />
          <CountySelect />
        </div>
        <a
          className="uas-button"
          href="?report=true"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Report
        </a>
        </div>
      </Card>
      <CountyMap/>
      <USATotals/>
      <MixedBar
        state={state.selection.state}
        county={state.selection.county}
        timeSeries={state.covidTimeSeries}
        stat="confirmed"
      />
      <StateMixedBar
        state={state.selection.state}
        county={state.selection.county}
        timeSeries={state.covidTimeSeries}
        stat="confirmed"
        stateCount={true}
        meta={state.graphMetaData}
      />
      <StateMixedBar
        state={state.selection.state}
        county={state.selection.county}
        timeSeries={state.covidTimeSeries}
        stat="confirmed"
        stateCount={false}
        meta={state.graphMetaData}
      />
      </div>
    );
    }}
  </AppContext.Consumer>
  );
};

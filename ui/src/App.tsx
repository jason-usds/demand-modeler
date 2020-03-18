import React from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import { AppStoreProvider } from "./app/AppStore";
import EpiMap from "./components/EpiMap";
import Card from "./components/Card/Card";
import USATotals from "./components/USATotals";
import StateSelect from "./components/Forms/StateSelect";
import CountySelect from "./components/Forms/CountySelect";

function App() {
  return (
    <AppStoreProvider>
      <Header title="Demand Modeller" titleRoute="/" />
      <Card>
        <div style={{display: "flex"}}>
          <StateSelect/>
          <CountySelect/>
        </div>
      </Card>
      <div style={{display: "flex"}}>
        <Card header="Confirmed">
          <EpiMap stat="confirmed"/>
          <USATotals stat="confirmed"/>
        </Card>
        <Card header="Dead">
          <EpiMap stat="dead"/>
          <USATotals stat="dead"/>
        </Card>
      </div>

    </AppStoreProvider>
  );
}

export default App;

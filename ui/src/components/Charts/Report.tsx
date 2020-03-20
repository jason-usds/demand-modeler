import React from "react";
import { AppContext, State } from "../../app/AppStore";
import { StateMixedBar } from "./StateMixedBar";
import { Top10Counties } from "./Top10Counties";
import { StateBar } from "./StateBar";
import { MixedBar } from "./MixedBar";
import "./Report.scss";
import { formatDate, dateTimeString } from "../../utils/DateUtils";

export const Report: React.FC<{}> = () => {
  const pagebreak = (lastUpdated: Date | undefined) => {
    return (
      <div style={{ margin: "20px 0", fontSize: "13px" }}>
        <div>
          Source:{" "}
          <a
            href="https://www.csbs.org/information-covid-19-coronavirus"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conference of State Bank Supervisors
          </a>
          , as of {lastUpdated && dateTimeString(lastUpdated)}.
          {/* 12 states with highest case count as of 3/17 shown. */}
        </div>
        <div>
          Data sourced from state health department websites; reporting may be
          incomplete or delayed
        </div>
        <div className="pagebreak" />
      </div>
    );
  };

  return (
    <AppContext.Consumer>
      {({ state }) => {
        let lastUpdated: Date | undefined; //= new Date("20:03 March 19, 2020");
        Object.values(state.covidTimeSeries.states)
          .flat()
          .forEach(({ Reported }) => {
            if (!lastUpdated || Reported > lastUpdated) {
              lastUpdated = Reported;
            }
          });

        const states = Object.keys(state.covidTimeSeries.states)
          .flatMap(k => state.covidTimeSeries.states[k]);
          // .filter(({ Reported }) => formatDate(Reported) === state.selection.date);
        const stateIDs = new Set();
        const dedupedStates: State[] = [];
        states.forEach(s => {
          const key = `${s.State}`;
          if (!stateIDs.has(key)) {
            dedupedStates.push(s);
            stateIDs.add(key);
          }
        });
        const top10States = [...dedupedStates]
          .sort((s1, s2) => s2.Confirmed - s1.Confirmed)
          .slice(0, 10);
        return (
          <div className="report grid-container" style={{ marginLeft: 0 }}>
            {top10States.map(s => {
              if(s.State === "Washington") {
                const data = [
                  {
                    "March-15": 387,
                    "March-16": 488,
                    "March-17": 569,
                    "March-18": 562,
                    "March-19": 693,
                    "Name": "King"
                  },
                  {
                    "March-15": 154,
                    "March-16": 200,
                    "March-17": 266,
                    "March-18": 310,
                    "March-19": 348,
                    "Name": "Snohomish"
                  },
                  {
                    "March-15": 39,
                    "March-16": 125,
                    "March-17": 121,
                    "March-18": 164,
                    "March-19": 164,
                    "Name": "Unassigned"
                  },
                  {
                    "March-15": 26,
                    "March-16": 38,
                    "March-17": 45,
                    "March-18": 56,
                    "March-19": 75,
                    "Name": "Pierce"
                  },
                  {
                    "March-15": 6,
                    "March-16": 7,
                    "March-17": 14,
                    "March-18": 16,
                    "March-19": 17,
                    "Name": "Island"
                  },
                  {
                    "March-15": 4,
                    "March-16": 7,
                    "March-17": 9,
                    "March-18": 14,
                    "March-19": 18,
                    "Name": "Skagit"
                  },
                  {
                    "March-15": 3,
                    "March-16": 7,
                    "March-17": 7,
                    "March-18": 9,
                    "March-19": 12,
                    "Name": "Kitsap"
                  },
                  {
                    "March-15": 2,
                    "March-16": 7,
                    "March-17": 7,
                    "March-18": 8,
                    "March-19": 8,
                    "Name": "Grant"
                  },
                  {
                    "March-15": 2,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 7,
                    "March-19": 7,
                    "Name": "Whatcom"
                  },
                  {
                    "March-15": 4,
                    "March-16": 4,
                    "March-17": 4,
                    "March-18": 7,
                    "March-19": 7,
                    "Name": "Yakima"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "New York") {
                const data = [
                  {
                    "March-15": 269,
                    "March-16": 463,
                    "March-17": 814,
                    "March-18": 1871,
                    "March-19": 3615,
                    "Name": "New York"
                  },
                  {
                    "March-15": 178,
                    "March-16": 220,
                    "March-17": 380,
                    "March-18": 538,
                    "March-19": 798,
                    "Name": "Westchester"
                  },
                  {
                    "March-15": 79,
                    "March-16": 109,
                    "March-17": 140,
                    "March-18": 278,
                    "March-19": 372,
                    "Name": "Nassau"
                  },
                  {
                    "March-15": 41,
                    "March-16": 74,
                    "March-17": 97,
                    "March-18": 116,
                    "March-19": 239,
                    "Name": "Suffolk"
                  },
                  {
                    "March-15": 12,
                    "March-16": 16,
                    "March-17": 22,
                    "March-18": 31,
                    "March-19": 53,
                    "Name": "Rockland"
                  },
                  {
                    "March-15": 6,
                    "March-16": 11,
                    "March-17": 15,
                    "March-18": 32,
                    "March-19": 51,
                    "Name": "Orange"
                  },
                  {
                    "March-15": 11,
                    "March-16": 15,
                    "March-17": 25,
                    "March-18": 36,
                    "March-19": 43,
                    "Name": "Albany"
                  },
                  {
                    "March-15": 4,
                    "March-16": 10,
                    "March-17": 16,
                    "March-18": 20,
                    "March-19": 31,
                    "Name": "Dutchess"
                  },
                  {
                    "March-15": 2,
                    "March-16": 11,
                    "March-17": 14,
                    "March-18": 19,
                    "March-19": 30,
                    "Name": "Monroe"
                  },
                  {
                    "March-15": 3,
                    "March-16": 7,
                    "March-17": 11,
                    "March-18": 20,
                    "March-19": 28,
                    "Name": "Erie"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "California") {
                const data = [
                  {
                    "March-15": 69,
                    "March-16": 94,
                    "March-17": 144,
                    "March-18": 190,
                    "March-19": 231,
                    "Name": "Los Angeles"
                  },
                  {
                    "March-15": 114,
                    "March-16": 138,
                    "March-17": 155,
                    "March-18": 175,
                    "March-19": 189,
                    "Name": "Santa Clara"
                  },
                  {
                    "March-15": 32,
                    "March-16": 41,
                    "March-17": 64,
                    "March-18": 80,
                    "March-19": 89,
                    "Name": "San Mateo"
                  },
                  {
                    "March-15": 16,
                    "March-16": 55,
                    "March-17": 55,
                    "March-18": 60,
                    "March-19": 80,
                    "Name": "San Diego"
                  },
                  {
                    "March-15": 37,
                    "March-16": 40,
                    "March-17": 43,
                    "March-18": 51,
                    "March-19": 70,
                    "Name": "San Francisco"
                  },
                  {
                    "March-15": 29,
                    "March-16": 33,
                    "March-17": 40,
                    "March-18": 40,
                    "March-19": 45,
                    "Name": "Sacramento"
                  },
                  {
                    "March-15": 14,
                    "March-16": 22,
                    "March-17": 22,
                    "March-18": 29,
                    "March-19": 53,
                    "Name": "Orange"
                  },
                  {
                    "March-15": 29,
                    "March-16": 34,
                    "March-17": 39,
                    "March-18": 39,
                    "March-19": 41,
                    "Name": "Contra Costa"
                  },
                  {
                    "March-15": 11,
                    "March-16": 18,
                    "March-17": 27,
                    "March-18": 30,
                    "March-19": 38,
                    "Name": "Alameda"
                  },
                  {
                    "March-15": 14,
                    "March-16": 15,
                    "March-17": 15,
                    "March-18": 16,
                    "March-19": 22,
                    "Name": "Riverside"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "New Jersey") {
                const data = [
                  {
                    "March-16": 2,
                    "March-17": 2,
                    "March-18": 15,
                    "March-19": 344,
                    "Name": "Unassigned"
                  },
                  {
                    "March-15": 29,
                    "March-16": 61,
                    "March-17": 84,
                    "March-18": 114,
                    "March-19": 195,
                    "Name": "Bergen"
                  },
                  {
                    "March-15": 11,
                    "March-16": 20,
                    "March-17": 32,
                    "March-18": 45,
                    "March-19": 63,
                    "Name": "Essex"
                  },
                  {
                    "March-15": 11,
                    "March-16": 17,
                    "March-17": 22,
                    "March-18": 40,
                    "March-19": 64,
                    "Name": "Middlesex"
                  },
                  {
                    "March-15": 11,
                    "March-16": 20,
                    "March-17": 24,
                    "March-18": 34,
                    "March-19": 55,
                    "Name": "Hudson"
                  },
                  {
                    "March-15": 12,
                    "March-16": 14,
                    "March-17": 22,
                    "March-18": 32,
                    "March-19": 43,
                    "Name": "Monmouth"
                  },
                  {
                    "March-15": 4,
                    "March-16": 8,
                    "March-17": 15,
                    "March-18": 26,
                    "March-19": 29,
                    "Name": "Union"
                  },
                  {
                    "March-15": 4,
                    "March-16": 6,
                    "March-17": 7,
                    "March-18": 19,
                    "March-19": 19,
                    "Name": "Morris"
                  },
                  {
                    "March-15": 5,
                    "March-16": 8,
                    "March-17": 10,
                    "March-18": 18,
                    "March-19": 38,
                    "Name": "Passaic"
                  },
                  {
                    "March-15": 1,
                    "March-16": 5,
                    "March-17": 7,
                    "March-18": 16,
                    "March-19": 21,
                    "Name": "Somerset"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Florida") {
                const data = [
                  {
                    "March-15": 36,
                    "March-16": 39,
                    "March-17": 48,
                    "March-18": 80,
                    "March-19": 96,
                    "Name": "Broward"
                  },
                  {
                    "March-15": 13,
                    "March-16": 23,
                    "March-17": 40,
                    "March-18": 61,
                    "March-19": 86,
                    "Name": "Dade"
                  },
                  {
                    "March-15": 5,
                    "March-16": 8,
                    "March-17": 13,
                    "March-18": 19,
                    "March-19": 29,
                    "Name": "Palm Beach"
                  },
                  {
                    "March-15": 4,
                    "March-16": 5,
                    "March-17": 4,
                    "March-18": 14,
                    "March-19": 20,
                    "Name": "Hillsborough"
                  },
                  {
                    "March-15": 5,
                    "March-16": 6,
                    "March-17": 6,
                    "March-18": 13,
                    "March-19": 18,
                    "Name": "Collier"
                  },
                  {
                    "March-15": 4,
                    "March-16": 5,
                    "March-17": 10,
                    "March-18": 14,
                    "March-19": 15,
                    "Name": "Duval"
                  },
                  {
                    "March-15": 2,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 9,
                    "March-19": 19,
                    "Name": "Orange"
                  },
                  {
                    "March-15": 2,
                    "March-16": 4,
                    "March-17": 4,
                    "March-18": 10,
                    "March-19": 16,
                    "Name": "Pinellas"
                  },
                  {
                    "March-15": 5,
                    "March-16": 4,
                    "March-17": 5,
                    "March-18": 5,
                    "March-19": 11,
                    "Name": "Lee"
                  },
                  {
                    "March-15": 1,
                    "March-16": 2,
                    "March-17": 4,
                    "March-18": 7,
                    "March-19": 11,
                    "Name": "Alachua"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Louisiana") {
                const data =[
                  {
                    "March-15": 66,
                    "March-16": 79,
                    "March-17": 136,
                    "March-18": 187,
                    "March-19": 231,
                    "Name": "Orleans"
                  },
                  {
                    "March-15": 12,
                    "March-16": 16,
                    "March-17": 35,
                    "March-18": 40,
                    "March-19": 62,
                    "Name": "Jefferson"
                  },
                  {
                    "March-15": 2,
                    "March-16": 5,
                    "March-17": 6,
                    "March-18": 8,
                    "March-19": 10,
                    "Name": "St. Tammany"
                  },
                  {
                    "March-15": 1,
                    "March-16": 3,
                    "March-17": 4,
                    "March-18": 5,
                    "March-19": 7,
                    "Name": "Caddo"
                  },
                  {
                    "March-18": 2,
                    "March-19": 5,
                    "Name": "East Baton Rouge"
                  },
                  {
                    "March-15": 1,
                    "March-16": 2,
                    "March-17": 2,
                    "March-18": 3,
                    "March-19": 4,
                    "Name": "Lafourche"
                  },
                  {
                    "March-16": 1,
                    "March-17": 2,
                    "March-18": 2,
                    "March-19": 4,
                    "Name": "St. Bernard"
                  },
                  {
                    "March-15": 2,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 3,
                    "March-19": 4,
                    "Name": "St. Charles"
                  },
                  {
                    "March-15": 1,
                    "March-16": 3,
                    "March-17": 2,
                    "March-18": 3,
                    "March-19": 4,
                    "Name": "Terrebonne"
                  },
                  {
                    "March-15": 4,
                    "March-18": 23,
                    "March-19": 3,
                    "Name": "Unassigned"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Illinois") {
                const data =[
                  {
                    "March-15": 50,
                    "March-16": 73,
                    "March-17": 107,
                    "March-18": 178,
                    "March-19": 278,
                    "Name": "Cook"
                  },
                  {
                    "March-15": 1,
                    "March-16": 3,
                    "March-17": 26,
                    "March-18": 45,
                    "March-19": 54,
                    "Name": "DuPage"
                  },
                  {
                    "March-15": 3,
                    "March-16": 4,
                    "March-17": 7,
                    "March-18": 18,
                    "March-19": 37,
                    "Name": "Lake"
                  },
                  {
                    "March-18": 16,
                    "March-19": 16,
                    "Name": "Unknown"
                  },
                  {
                    "March-16": 1,
                    "March-17": 1,
                    "March-18": 3,
                    "March-19": 9,
                    "Name": "Will"
                  },
                  {
                    "March-15": 3,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 4,
                    "March-19": 6,
                    "Name": "Kane"
                  },
                  {
                    "March-15": 2,
                    "March-16": 2,
                    "March-17": 2,
                    "March-18": 4,
                    "March-19": 6,
                    "Name": "McHenry"
                  },
                  {
                    "March-16": 1,
                    "March-17": 1,
                    "March-18": 3,
                    "March-19": 3,
                    "Name": "Clinton"
                  },
                  {
                    "March-16": 1,
                    "March-17": 1,
                    "March-18": 3,
                    "March-19": 3,
                    "Name": "Peoria"
                  },
                  {
                    "March-15": 2,
                    "March-16": 2,
                    "March-17": 2,
                    "March-18": 3,
                    "March-19": 3,
                    "Name": "St. Clair"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Georgia") {
                const data =[
                  {
                    "March-15": 20,
                    "March-16": 27,
                    "March-17": 33,
                    "March-18": 49,
                    "March-19": 66,
                    "Name": "Fulton"
                  },
                  {
                    "March-15": 19,
                    "March-16": 22,
                    "March-17": 25,
                    "March-18": 28,
                    "March-19": 37,
                    "Name": "Cobb"
                  },
                  {
                    "March-15": 9,
                    "March-16": 9,
                    "March-17": 10,
                    "March-18": 19,
                    "March-19": 26,
                    "Name": "Bartow"
                  },
                  {
                    "March-15": 10,
                    "March-16": 10,
                    "March-17": 10,
                    "March-18": 18,
                    "March-19": 22,
                    "Name": "DeKalb"
                  },
                  {
                    "March-15": 6,
                    "March-16": 6,
                    "March-17": 6,
                    "March-18": 7,
                    "March-19": 20,
                    "Name": "Dougherty"
                  },
                  {
                    "March-15": 6,
                    "March-16": 7,
                    "March-17": 7,
                    "March-18": 9,
                    "March-19": 16,
                    "Name": "Cherokee"
                  },
                  {
                    "March-15": 4,
                    "March-16": 5,
                    "March-17": 5,
                    "March-18": 7,
                    "March-19": 12,
                    "Name": "Gwinnett"
                  },
                  {
                    "March-15": 5,
                    "March-16": 5,
                    "March-17": 5,
                    "March-18": 8,
                    "March-19": 10,
                    "Name": "Fayette"
                  },
                  {
                    "March-15": 2,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 5,
                    "March-19": 8,
                    "Name": "Clarke"
                  },
                  {
                    "March-15": 2,
                    "March-16": 3,
                    "March-17": 3,
                    "March-18": 5,
                    "March-19": 8,
                    "Name": "Lowndes"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Massachusetts") {
                const data = [
                  {
                    "March-15": 65,
                    "March-16": 83,
                    "March-17": 89,
                    "March-18": 100,
                    "March-19": 119,
                    "Name": "Middlesex"
                  },
                  {
                    "March-15": 27,
                    "March-16": 36,
                    "March-17": 43,
                    "March-18": 51,
                    "March-19": 72,
                    "Name": "Suffolk"
                  },
                  {
                    "March-15": 28,
                    "March-16": 36,
                    "March-17": 43,
                    "March-18": 45,
                    "March-19": 52,
                    "Name": "Norfolk"
                  },
                  {
                    "March-15": 9,
                    "March-16": 11,
                    "March-17": 14,
                    "March-18": 17,
                    "March-19": 18,
                    "Name": "Berkshire"
                  },
                  {
                    "March-15": 5,
                    "March-16": 8,
                    "March-17": 8,
                    "March-18": 14,
                    "March-19": 19,
                    "Name": "Essex"
                  },
                  {
                    "March-15": 2,
                    "March-16": 6,
                    "March-17": 6,
                    "March-18": 10,
                    "March-19": 14,
                    "Name": "Worcester"
                  },
                  {
                    "March-15": 1,
                    "March-16": 2,
                    "March-17": 5,
                    "March-18": 5,
                    "March-19": 6,
                    "Name": "Bristol"
                  },
                  {
                    "March-16": 3,
                    "March-17": 5,
                    "March-18": 5,
                    "March-19": 5,
                    "Name": "Plymouth"
                  },
                  {
                    "March-16": 10,
                    "March-17": 10,
                    "March-18": 4,
                    "March-19": 4,
                    "Name": "Unknown"
                  },
                  {
                    "March-15": 1,
                    "March-16": 1,
                    "March-17": 2,
                    "March-18": 2,
                    "March-19": 2,
                    "Name": "Barnstable"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              if(s.State === "Texas") {
                const data = [
                  {
                    "March-15": 14,
                    "March-16": 19,
                    "March-17": 19,
                    "March-18": 39,
                    "March-19": 59,
                    "Name": "Dallas"
                  },
                  {
                    "March-15": 11,
                    "March-16": 13,
                    "March-17": 13,
                    "March-18": 23,
                    "March-19": 30,
                    "Name": "Harris"
                  },
                  {
                    "March-15": 3,
                    "March-16": 3,
                    "March-17": 4,
                    "March-18": 11,
                    "March-19": 29,
                    "Name": "Bexar"
                  },
                  {
                    "March-15": 5,
                    "March-16": 10,
                    "March-17": 10,
                    "March-18": 23,
                    "March-19": 23,
                    "Name": "Travis"
                  },
                  {
                    "March-15": 8,
                    "March-16": 8,
                    "March-17": 8,
                    "March-18": 11,
                    "March-19": 18,
                    "Name": "Collin"
                  },
                  {
                    "March-15": 9,
                    "March-16": 9,
                    "March-17": 9,
                    "March-18": 12,
                    "March-19": 12,
                    "Name": "Fort Bend"
                  },
                  {
                    "March-15": 4,
                    "March-16": 5,
                    "March-17": 5,
                    "March-18": 8,
                    "March-19": 19,
                    "Name": "Tarrant"
                  },
                  {
                    "March-18": 4,
                    "March-19": 8,
                    "Name": "Williamson"
                  },
                  {
                    "March-15": 4,
                    "March-16": 4,
                    "March-17": 4,
                    "March-18": 7,
                    "March-19": 7,
                    "Name": "Montgomery"
                  },
                  {
                    "March-15": 1,
                    "March-16": 2,
                    "March-17": 2,
                    "March-18": 5,
                    "March-19": 6,
                    "Name": "Bell"
                  }
                ]
                return (
                  <>
                  <StateBar
                    state={s.ID}
                    timeSeries={state.covidTimeSeries}
                    stat="confirmed"
                    stateCount={false}
                    reportView
                    meta={state.graphMetaData}
                    data={data}
                  />
                  {lastUpdated && pagebreak(lastUpdated)}
                  </>

                )
              }
              return (
                <>
                <StateBar
                  state={s.ID}
                  timeSeries={state.covidTimeSeries}
                  stat="confirmed"
                  stateCount={false}
                  reportView
                  meta={state.graphMetaData}
                />
                {lastUpdated && pagebreak(lastUpdated)}
                </>
              )
            }
            )}
            <Top10Counties
              timeSeries={state.covidTimeSeries}
              stat="confirmed"
              reportView
              meta={state.graphMetaData}
              data={[
                {
                  "March-15": 269,
                  "March-16": 463,
                  "March-17": 814,
                  "March-18": 1871,
                  "March-19": 3615,
                  "Name": "New York, NY"
                },
                {
                  "March-15": 178,
                  "March-16": 220,
                  "March-17": 380,
                  "March-18": 538,
                  "March-19": 798,
                  "Name": "Westchester, NY"
                },
                {
                  "March-15": 387,
                  "March-16": 488,
                  "March-17": 569,
                  "March-18": 562,
                  "March-19": 693,
                  "Name": "King, WA"
                },
                {
                  "March-15": 79,
                  "March-16": 109,
                  "March-17": 140,
                  "March-18": 278,
                  "March-19": 372,
                  "Name": "Nassau, NY"
                },
                {
                  "March-16": 2,
                  "March-17": 2,
                  "March-18": 15,
                  "March-19": 344,
                  "Name": "Unassigned, NJ"
                },
                {
                  "March-15": 154,
                  "March-16": 200,
                  "March-17": 266,
                  "March-18": 310,
                  "March-19": 348,
                  "Name": "Snohomish, WA"
                },
                {
                  "March-15": 66,
                  "March-16": 79,
                  "March-17": 136,
                  "March-18": 187,
                  "March-19": 231,
                  "Name": "Orleans, LA"
                },
                {
                  "March-15": 69,
                  "March-16": 94,
                  "March-17": 144,
                  "March-18": 190,
                  "March-19": 231,
                  "Name": "Los Angeles, CA"
                },
                {
                  "March-15": 50,
                  "March-16": 73,
                  "March-17": 107,
                  "March-18": 178,
                  "March-19": 278,
                  "Name": "Cook, IL"
                },
                {
                  "March-15": 41,
                  "March-16": 74,
                  "March-17": 97,
                  "March-18": 116,
                  "March-19": 239,
                  "Name": "Suffolk, NY"
                }
              ]}
            />
            {pagebreak(lastUpdated)}
            <StateMixedBar
              state={undefined}
              county={undefined}
              timeSeries={state.covidTimeSeries}
              stat="confirmed"
              stateCount={true}
              reportView
              meta={state.graphMetaData}
              data={[
                {
                  "March-15": 729,
                  "March-16": 969,
                  "March-17": 1374,
                  "March-18": 3038,
                  "March-19": 4160,
                  "Name": "New York"
                },
                {
                  "March-15": 642,
                  "March-16": 908,
                  "March-17": 1012,
                  "March-18": 1187,
                  "March-19": 1187,
                  "Name": "Washington"
                },
                {
                  "March-15": 424,
                  "March-16": 562,
                  "March-17": 700,
                  "March-18": 828,
                  "March-19": 910,
                  "Name": "California"
                },
                {
                  "March-15": 98,
                  "March-16": 179,
                  "March-17": 263,
                  "March-18": 412,
                  "March-19": 741,
                  "Name": "New Jersey"
                },
                {
                  "March-15": 115,
                  "March-16": 162,
                  "March-17": 217,
                  "March-18": 317,
                  "March-19": 390,
                  "Name": "Florida"
                },
                {
                  "March-15": 138,
                  "March-16": 197,
                  "March-17": 218,
                  "March-18": 256,
                  "March-19": 256,
                  "Name": "Massachusetts"
                },
                {
                  "March-15": 91,
                  "March-16": 136,
                  "March-17": 196,
                  "March-18": 280,
                  "March-19": 347,
                  "Name": "Louisiana"
                },
                {
                  "March-15": 67,
                  "March-16": 105,
                  "March-17": 161,
                  "March-18": 288,
                  "March-19": 295,
                  "Name": "Illinois"
                },
                {
                  "March-15": 99,
                  "March-16": 121,
                  "March-17": 146,
                  "March-18": 197,
                  "March-19": 287,
                  "Name": "Georgia"
                },
                {
                  "March-15": 72,
                  "March-16": 92,
                  "March-17": 120,
                  "March-18": 200,
                  "March-19": 247,
                  "Name": "Texas"
                }
              ]}
            />
            {lastUpdated && pagebreak(lastUpdated)}
            <MixedBar
              state={undefined}
              county={undefined}
              timeSeries={state.covidTimeSeries}
              stat="confirmed"
              reportView
              data={[
                {
                  "Name": "March-15",
                  "Grand Total": 2475
                },
                {
                  "Name": "March-16",
                  "Grand Total": 3431
                },
                {
                  "Name": "March-17",
                  "Grand Total": 3439
                },
                {
                  "Name": "March-18",
                  "Grand Total": 7003
                },
                {
                  "Name": "March-19",
                  "Grand Total": 13499
                }
              ]}
            />
          </div>
        );
      }}
    </AppContext.Consumer>
  );
};

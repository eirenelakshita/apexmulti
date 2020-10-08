import React, { Component } from 'react';
import API from "./utils/API.js";
import Chart from "react-apexcharts";
import './App.css';
//import Form from "./Components/Form.js";
import Select from 'react-select';

class App extends Component {

  state = {
    menu: [
        {
            value:"London,UK",
            label:"London,UK"
        },
        {
            value:"Atlanta,US",
            label:"Atlanta,US"
        },
        {
            value:"Bujumbura,BI",
            label:"Bujumbura,BI"
        },
        {
            value:"Tokyo,JP",
            label:"Tokyo,JP"
        }
    ],
    selectedOption: null,
    search: "",
    results: [],
    options: {
      chart: {
          height: 350,
          type: "line",
          stacked: false
      },
      dataLabels: {
        enabled: false
      },
      colors: ["#FF1654", "#247BA0"],
      stroke: {
        width: [4, 4]
      },
      plotOptions: {
        bar: {
          columnWidth: "20%"
        }
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FF1654"
          },
          labels: {
            style: {
              colors: "#FF1654"
            }
          },
          title: {
            text: "Series A",
            style: {
              color: "#FF1654"
            }
          }
        },
        {
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#247BA0"
          },
          labels: {
            style: {
              colors: "#247BA0"
            }
          },
          title: {
            text: "Series B",
            style: {
              color: "#247BA0"
            }
          }
        }
      ],
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    },
    series: [
            {
              name: "Atlanta,GA",
              data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
            },
            {
              name: "London,UK",
              data: [20, 29, 37, 36, 44, 45, 50, 58]
            }
    ]
  }

  handleChange = selectedOption => {
      this.setState({ selectedOption });
      console.log("Option selected:", selectedOption);
    };

  searchWeather = query => {
    API.search(query)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
  }

  render() {
    const { selectedOption } = this.state;
    return (
        <div className="App">
          <h1>5 days temperature in Atlanta and London</h1>
          <Select
                  isMulti
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={this.state.menu}
          />
          <Chart
                  options={this.state.options}
                  series={this.state.series}
                  type="line"
                  width="500"
          />
        </div>
    );
  }
}

export default App;

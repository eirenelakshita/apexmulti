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
      colors: ["#FF1654", "#247BA0", "#633194", "#1CB527"],
      stroke: {
        width: [4, 4, 4, 4]
      },
      plotOptions: {
        bar: {
          columnWidth: "20%"
        }
      },
      xaxis: {
        categories: [1602525600, 1602536400, 1602547200, 1602558000, 1602568800, 1602579600, 1602590400, 1602601200, 1602612000, 1602622800, 1602633600, 1602644400, 1602655200, 1602666000, 1602676800, 1602687600, 1602698400, 1602709200, 1602720000, 1602730800, 1602741600, 1602752400, 1602763200, 1602774000, 1602784800, 1602795600, 1602806400, 1602817200, 1602828000, 1602838800, 1602849600, 1602860400, 1602871200, 1602882000, 1602892800, 1602903600, 1602914400, 1602925200, 1602936000, 1602946800],
        title: {
             text: "Days",
             style: {
             color: "#000000"
          }
        }
      },
      yaxis:
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
            text: "Temperatures",
            style: {
              color: "#FF1654"
            }
          }
        },
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
              name: "Atlanta,US",
              data: [23.19, 25.78, 23.9, 22.67, 22.01, 21.34, 17.04, 21.07, 24.78, 25.32, 20.83, 19.46, 18.84, 18.14, 17.21, 21.37, 25.88, 26.26, 22.49, 20.54, 18.71, 17.47, 16.5, 19.73, 23.22, 24.82, 22.5, 21.13, 18.85, 15.72, 13.8, 15.57, 18.51, 17.84, 14.64, 12.26, 11.06, 11.09, 10.43, 14.83]
            },
            {
              name: "London,UK",
              data: [11.6, 11.3, 11.02, 9.19, 8.37, 9.35, 11.95, 11.96, 10.69, 11.23, 11.47, 10.69, 10.66, 12.38, 14.61, 14.91, 12.64, 11.11, 10.28, 9.98, 9.6, 10.84, 12.58, 12.95, 10.93, 10.16, 9.2, 8.34, 8.33, 10.59, 12.65, 12.65, 11.13, 10.03, 10.02, 10.46, 10.6, 11.1, 11.94, 12.81]
            },
            {
              name: "Bujumbura,BI",
              data: [26.13, 24.59, 23.44, 23.29, 25.53, 24.83, 27.61, 25.84, 23.94, 23.35, 22.85, 22.72, 24.94, 25.46, 27.73, 26.09, 24.06, 23.17, 22.77, 23.01, 25.52, 30.06, 30.7, 29.08, 25.89, 25.33, 23.75, 23.71, 26.09, 28.5, 27.61, 26.91, 24.26, 23.79, 23.24, 23.31, 24.73, 28.98, 28.85, 27.69]
            },
            {
              name: "Tokyo,JP",
              data: [21.17, 20.98, 23.31, 25.98, 26.13, 24.02, 22.61, 21.5, 20.65, 20.04, 20.27, 21.65, 21.24, 20.85, 20.32, 19.43, 18.77, 17.62, 16.41, 16.31, 16.99, 16.66, 15.76, 15.78, 15.42, 15.14, 14.73, 13.91, 13.12, 13.07, 13.2, 12.83, 13.18, 13.58, 14.44, 15.41, 15.99, 15.79, 14.85, 14.8]
            }
    ]
  }

  handleChange = selectedOption => {
      this.setState({ selectedOption },() => {
        console.log(this.state.selectedOption[0].value);
        this.state.selectedOption.map(option => this.searchWeather(option.value));
      });
  };

  searchWeather = query => {
    API.search(query)
        .then(res=>{
            this.listResponse(res);
        })
        .catch(err=>console.log(err));
  }

  listResponse = res => {
//    const newResponse = {
//        name: "",
//        data: []
//    };
    const data = [];
    const dates = [];
    res.data.list.map(d=>
            {
            data.push(d.main.temp);
            dates.push(d.dt);
            }
        );
//    this.setState({results:newResponse},()=>console.log(this.state.results));
    console.log(dates);
  }

  updateData = res => {
    const newSeries = [];

    this.state.series.map((s) => {
      const data = s.data.map(() => {
        return Math.floor(Math.random() * 180)
//        res.data.list.map(d => {return d.main.temp})
      })
      newSeries.push({ data, name: s.name })
    })

    this.setState({
      series: newSeries
    })
  }

  render() {
    const { selectedOption } = this.state;
    return (
        <div className="App">
          <h1>5 days temperatures record</h1>
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

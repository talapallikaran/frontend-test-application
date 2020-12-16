import React from 'react';
import _ from "lodash";
import './App.css';
import { getChildData, getParentData, sortParentData } from "./apiServices/api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      sortType: "asc",
      childData: [],
      page: 1,
      totalPages: 0,
    }
  }

  componentDidMount() {
    const { page } = this.state;
    this._getParentData(page);

  }

  _getParentData = async (page) => {
    const parentData = await getParentData(page);
    const responseData = _.get(parentData, "data.data");
    const totalPages = _.get(parentData, "data.numRows");
    this.setState({
      tableData: responseData,
      totalPages: totalPages
    })
  }

  _handleDataSort = async (sortName) => {
    const sortData = await sortParentData(sortName)
    this.setState({
      sortType: sortName,
      tableData: sortData
    })
  }

  _handleChildData = async (childID) => {
    const childData = await getChildData(childID)
    console.log("childData", childData)
    this.setState({
      childData
    })
  }
  _handleTableNavigation = async (navType) => {
    const { totalPages, page } = this.state
    const pageNumbers = Math.ceil(totalPages / 2);
    switch (navType) {
      case "prev":
        console.log(page)
        if (page > 1) {
          this._getParentData(page - 1);
          this.setState({
            page: page - 1
          })
        }
        break;
      case "next":
        if (page <= pageNumbers) {
          this._getParentData(page + 1);
          this.setState({
            page: page + 1
          })
        }
        break;
      default:
        return null;
    }
  }

  render() {
    const { tableData, childData, sortType, totalPages, page } = this.state;
    const pageNumbers = Math.ceil(totalPages / 2);
    return (
      <div className="App">
        <div className="data-table-wrapper">
          <div className="data-table-inner">
            <div className="data-table-title">
              <h3>
                Parent table
              </h3>
              <div className="table-navigation">
                <a href="#" className={`prev ${page > 1 ? "" : "disable"}`} onClick={() => this._handleTableNavigation("prev")}>Prev</a>
                <a href="#" className={`next ${page < pageNumbers ? "" : "disable"}`} onClick={() => this._handleTableNavigation("next")}>Next</a>
              </div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <a href="#" title="" onClick={() => this._handleDataSort(sortType === "desc" ? "asc" : "desc")} className={sortType === "desc" ? "asc" : "desc"}>ID</a>
                  </th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th style={{ textAlign: "right" }}>Total Amount</th>
                  <th style={{ textAlign: "right" }}>Total Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                {tableData && tableData.length > 0 && tableData.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.sender}</td>
                      <td>{item.receiver}</td>
                      <td style={{ textAlign: "right" }}>{item.paidAmount}</td>
                      <td style={{ textAlign: "right" }}>
                        <a href="#" title="" onClick={() => this._handleChildData(item.id)} >{item.totalAmount}</a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="data-table-inner">
            {childData && childData.length > 0 ? (
              <React.Fragment>
                <h3>
                  Child table
                  </h3>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>
                        ID
                </th>
                      <th>Sender</th>
                      <th>Receiver</th>
                      <th style={{ textAlign: "right" }}>Total Amount</th>
                      <th style={{ textAlign: "right" }}>Total Paid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {childData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.sender}</td>
                          <td>{item.receiver}</td>
                          <td style={{ textAlign: "right" }}>{item.TotalAmount}</td>
                          <td style={{ textAlign: "right" }}>
                            {item.paidAmount}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </React.Fragment>) : ''}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

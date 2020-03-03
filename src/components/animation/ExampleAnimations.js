import React, { Component } from "react";
import { Row, Col, Card, Table, Popconfirm, Button } from "antd";
import BreadcrumbCustom from "../BreadcrumbCustom";

class ExampleAnimations extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'name',
        dataIndex: 'name',
        width: '30%'
      },
      {
        title: 'age',
        dataIndex: 'age',
      },
      {
        title: 'address',
        dataIndex: 'address',
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
          return (
            (this.state.dataSource.length > 1) ?
              (
                <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record, index)}>
                  <a href="#/app/animation/exampleAnimations">Delete</a>
                </Popconfirm>
              ) : null
          );
        },
      }
    ];
    this.state = {
      dataSource: [
        {
          key: '0',
          name: 'Edward King 0',
          age: '32',
          address: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          name: 'Edward King 1',
          age: '32',
          address: 'London, Park Lane no. 1',
        }
      ],
      count: 2,
      deleteIndex: -1
    };
  }

  onDelete = (record, index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({
      deleteIndex: record.key
    });
    this.onDeleteTimer = setTimeout(() => {
      this.setState({
        dataSource
      });
    }, 500);
  };

  handleAdd = () => {
    const newData = {
      key: this.state.count,
      name: `Edward King ${this.state.count}`,
      age: 32,
      address: `London, Park Lane no. ${this.state.count}`
    };
    this.setState({
      dataSource: [newData, ...this.state.dataSource],
      count: this.state.count + 1
    });
  };

  componentWillUnmount() {
    clearTimeout(this.onDeleteTimer);
  }

  render() {
    return (
      <div className="gutter-example">
        <BreadcrumbCustom first='动画' second='动画案例'/>
        <Row gutter={16}>
          <Col className="gutter-row" md={24}>
            <div className="gutter-box">
              <Card bordered={false}>
                <Button className="editable-add-btn mb-s" onClick={this.handleAdd}>Add</Button>
                <Table bordered dataSource={this.state.dataSource} columns={this.columns}
                       rowClassName={(record, index) => {
                         if (this.state.deleteIndex === record.key) {
                           return 'animated zoomOutLeft min-black';
                         }
                         return 'animated fadeInRight';
                       }}
                />
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ExampleAnimations;

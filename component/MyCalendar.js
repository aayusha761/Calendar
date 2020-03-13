import React, {useState, useEffect, Component} from 'react';
import {Text, Button, View} from 'react-native';
// import SyncStorage from 'sync-storage';

class MyCalendar extends Component {
  state = {
    activeDate: new Date(),
  };

  changeMonth = n => {
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };
  changeYear = n => {
    this.setState(() => {
      this.state.activeDate.setFullYear(
        this.state.activeDate.getFullYear() + n,
      );
      return this.state;
    });
  };
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  rows = [];
  _onPress = item => {
    this.setState(() => {
      if (!item.match && item !== -1) {
        this.state.activeDate.setDate(item);
        return this.state;
      }
    });
    this.setState({
      activeDate: 'sfd',
    });
  };

  generateMatrix() {
    const matrix = [];
    matrix[0] = this.weekDays;
    const year = this.state.activeDate.getFullYear();
    const month = this.state.activeDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    let maxDays = this.nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }

  render() {
    var matrix = this.generateMatrix();
    return (
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <View
          style={{
            flex: 1,
            paddingTop: '10%',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <Button title="<<" onPress={() => this.changeMonth(-1)} />
            <Button title="<" onPress={() => this.changeYear(-1)} />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {this.state.activeDate.getFullYear()}
            </Text>
            <Button title=">" onPress={() => this.changeYear(+1)} />
            <Button title=">>" onPress={() => this.changeMonth(+1)} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              {this.months[this.state.activeDate.getMonth()]}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 4,
          }}>
          {
            (this.rows = matrix.map((row, rowIndex) => {
              const rowItems = row.map((item, colIndex) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      backgroundColor: rowIndex === 0 ? '#ddd' : '#fff',
                    }}>
                    <Text
                      style={{
                        flex: 1,
                        textAlign: 'center',
                        color: colIndex === 0 ? '#a00' : '#000',
                        fontWeight:
                          item === this.state.activeDate.getDate()
                            ? 'bold'
                            : '',
                        backgroundColor: rowIndex % 2 === 0 ? '#ddd' : '#fff',
                        borderWidth: item !== -1 ? 1 : null,
                      }}
                      onPress={() => this._onPress(item)}>
                      {item !== -1 ? item : ''}
                    </Text>
                    <View
                      style={{
                        backgroundColor: rowIndex % 2 === 0 ? '#ddd' : '#fff',
                        flex: rowIndex !== 0 ? 1 : null,
                        borderWidth: item !== -1 ? 1 : null,
                        borderColor: item !== -1 ? '#ddd' : null,
                      }}>
                      {item !== -1 && rowIndex !== 0 ? (
                        <Button title="+" onPress={() => {}} />
                      ) : null}
                    </View>
                  </View>
                );
              });
              return (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    // padding: 15,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  {rowItems}
                </View>
              );
            }))
          }
        </View>
      </View>
    );
  }
}

export default MyCalendar;

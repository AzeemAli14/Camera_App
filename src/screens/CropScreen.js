import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'

class CropScreen extends Component {
  constructor(props) {
    super(props)

    // this.state = {
    //   item: null
    // }
    // this.props = {
    //   item: 0
    // }
    console.log("Props are: ",this.props.onDelete)
  }

  // console.log("")
  // componentDidMount() {
  //   // this.props.navigation.setOptions({
  //   //   headerTitle: 'Crops',
  //   //   headerBackTitle: 'Back'
  //   // })

  //   // onDelete = this.props.onDelete;
  // }
    // onDelete = id = {
    //   // console.log("onDelete called")
    //   let arr = this.state.fileList;
    //   let arrList = arr.filter(item => {
    //     return item.id !== id;
    //   });
    //   this.setState({ FileList: arrList });
    // }

  //   onDelete = id => {
  //   const arrList = this.props.fileList
  //   const arr = arrList.filter(function (item) {
  //     return item.id !== id;
  //   });
  //   this.setState({ FileList: arrList });
  // };

  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
        // onPress={() => onClickItem(item, index)}
        // onLongPress={() => handleLongPress(item, index)}
        >
          <View style={{padding: 8}}>
            <Image source={this.props.item.url} style={styles.itemImage} />
            <View>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={1.5}
                onPress={() => this.props.onDelete(this.props.item.id)}>
                <Image
                  source={require('../images/delete.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default CropScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewData: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 150,
    borderRadius: 30,
    height: 45,
    elevation: 10,
    backgroundColor: '#7a1f5c',
  },
  itemImage: {
    height: 100,
    width: 100,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  textStyle: {
    color: 'black',
  },
  buttonStyle: {
    width: 100,
    height: 100,
  },
});

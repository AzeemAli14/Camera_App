import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import React, { Component } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import CropScreen from './CropScreen';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {
    // this.props.navigation.setOptions({
    //   title: 'Home',
    // });
  }

  onDelete = (id) => {
    console.log("OnDelete Called ....", id)
    const arrList = this.state.fileList;
    const arr = this.state.fileList.filter(item => item.id !== id);
    console.log(arrList);
    // filter(function (item) {
    //   return item.id !== id;
    // });
    this.setState({ fileList: arr });
  };


  // delete = this.onDelete.call;

  // renderItem({item}) {
  //   return (
  //     <View style={{justifyContent: 'center', alignItems: 'center'}}>
  //       <TouchableOpacity
  //       // onPress={() => onClickItem(item, index)}
  //       // onLongPress={() => handleLongPress(item, index)}
  //       >
  //         <View style={{padding: 8}}>
  //           <Image source={item.url} style={styles.itemImage} />
  //           <View>
  //             <TouchableOpacity
  //               style={styles.buttonStyle}
  //               activeOpacity={1.5}
  //               onPress={
  //                 this.props
  //                 }>
  //               <Image
  //                 source={require('../images/delete.png')}
  //                 style={styles.imageStyle}
  //               />
  //               <Text style={styles.textStyle}>Delete</Text>
  //             </TouchableOpacity>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //       {/* <CropScreen item={this.state} /> */}
  //     </View>
  //   );
  // }

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      this.onSelectedImage(image);
    });
  };

  onSelectedImage = image => {
    let newDataImg = [...this.state.fileList];

    const source = { uri: image.path };
    let item = {
      id: this.state.fileList.length + 1,
      url: source,
    };
    // console.log(this.onDelete);
    newDataImg.push(item);
    this.setState({ fileList: newDataImg });
  }

  renderItem = ({ item }) => {
    // console.log(item.id);
    return (
      <CropScreen item={item} onDelete={this.onDelete} />
    );
  }

  componentDidUpdate(image) {
    // this.setState({
    //   fileList: [],
    // });

    // this.state({
    //   onSelectedImage
    // });

    const choosePhotoFromLibrary = () => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
      })
        .then(image => {
          this.onSelectedImage(image);
        })
        .catch(error => {
          if (error.code === 'E_PICKER_CANCELLED') {
            alert('Error in uploading image from gallery');
            return false;
          }
        });
    };
  }

  componentWillUnmount() {
    this.state.fileList;
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="white" />
        <FlatList
          numColumns={3}
          data={this.state.fileList}
          renderItem={this.renderItem}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={styles.viewData}
            onPress={() => this.takePhotoFromCamera()}>
            <Text>Camera</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
          style={styles.viewData}
          onPress={() => choosePhotoFromLibrary()}>
          <Text>Gallery</Text>
        </TouchableOpacity> */}
        </View>
        {/* <CropScreen fileList={this.state} /> */}
      </View>
    );
  }
}

export default HomeScreen;

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

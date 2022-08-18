import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  StatusBar,
  Dimensions,
  LayoutAnimation,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const DisplayScreen = () => {
  const [fileList, setFileList] = useState([]);
  const [seletedItem, setSelectedItem] = useState([]);
  const [list, setList] = useState([false])
  const [count, setCount] = useState(1)

  const increment =useCallback( () => {
    console.log("Increment...",count)
    let counter = count +1;
    setCount(counter)
    console.log("Increment...",counter)
  },[count])


  const onSelectedImage = useCallback(image => {
    setFileList(fileList => {
      let newDataImg = [...fileList];

      const source = {uri: image.path};
      // const listState = this.state;
      let item = {
        id: Math.floor(Math.random(1)*100),
        url: source,
        content: image.data,
      };
      newDataImg.push(item);
      return newDataImg;
    });
  }, [onSelectedImage]);

  const takePhotoFromCamera = useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      // console.log(image, 'image');
      onSelectedImage(image);
      increment()

    });
  }, []);

  useEffect(() => {
    setList(list, true)
    return () => {
    
    }
  }, [fileList])
  

  // const getSelected = (item) => {
  //   seletedItem.includes(item.id)
  // }

  // let listState = fileList;
  // const onClickItem = (item, index) => {
  //   // setSelectedItem([seletedItem, item.id])
  //   // alert(item.id)
  //   const newArr = fileList.map((e, index) => {
  //     if (item.id == e.id) {
  //       return {
  //         ...e,
  //         selected: true,
  //       };
  //     }

  //     return {
  //       selected: false,
  //     };
  //   });

  //   // setdata(newArr);
  // };

  // useCallback(() => {

  // }, [])

  // alert(seletedItem)

  const choosePhotoFromLibrary = useCallback(() => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
    })
      .then(image => {
        onSelectedImage(image);
        console.log(image);
      })
      .catch(error => {
        if (error.code === 'E_PICKER_CANCELLED') {
          alert('Error in uploading image from gallery');
          return false;
        }
      });
  }, [onSelectedImage]);

  const onDelete = id => {

    console.log("id is ", fileList)

    // console.log('On Delete....fileList', index);
  //   const arr = fileList.filter(function(item) {
  //     return item.id !== id
  //   })
  //   // let filterData = fileList.filter(item => item.index !== index);
  //   // console.log('Filtrer Data.....................', filterData);
  //   setFileList(arr);
  //   LayoutAnimation.configureNext(layoutAnim)
  };

  const layoutAnim = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut, 
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const renderItem = useCallback(({item, index, selected, id}) => {
    return (
      <View style={styles.flatlist}>
        <TouchableOpacity
          onPress={() => onClickItem(item, index)}
          // onLongPress={() => handleLongPress(item, index)}
          style={[
            styles.item,
            {
              backgroundColor: item.selected ? styles.overlay : 'white',
            },
          ]}>
          <View style={{padding: 8}}>
            <Image source={item.url} style={styles.itemImage} />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={1.5}
                onPress={() => onDelete(fileList.id)}>
                <Image
                  source={require('../images/delete.png')}
                  style={styles.imageStyle}
                />
                <Text style={styles.textStyle}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* {selected && <View style={styles.overlay}/>} */}
        </TouchableOpacity>
      </View>
    );
  }, [fileList]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <FlatList
        numColumns={3}
        data={fileList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        // extraData={state}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          margin: 15,
        }}
        // selected = {getSelected(renderItem)}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.viewData} onPress={(list) => takePhotoFromCamera(setFileList)}>
          <Text>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewData}
          onPress={() => choosePhotoFromLibrary()}>
          <Text>Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const resizeMode = 'center';

// DisplayScreen.navigationOptions = {
//   headerShown: false,
// };

export default DisplayScreen;

const width = Dimensions.get('window').width - 140;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    backgroundColor: '#D32345',
    width: width / 2 - 10,
    // padding: 8,
    borderRadius: 10,
    overflow: 'hidden',
  },

  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 10,
  },
  textIniciar: {
    color: 'white',
    width: 300,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  back: {
    marginTop: 30,
    marginLeft: 20,
    flexDirection: 'column',
    color: 'white',
  },
  textInit: {
    marginTop: 30,
    color: '#b3b4b5',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewData: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    width: 150,
    borderRadius: 30,
    height: 45,
    backgroundColor: '#D32345',
  },
  logout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: 260,
    borderRadius: 30,
    height: 45,
    backgroundColor: '#911830',
  },
  loginText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemImage: {
    height: 100,
    width: 100,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rbga(0,0,0,0.4)',
    top: 0,
    left: 0,
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
    width: '100%',
    height: '100%',
  },
});

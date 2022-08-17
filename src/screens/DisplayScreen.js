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
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const DisplayScreen = ({navigation}) => {
  const [fileList, setFileList] = useState([]);
  const state = useMemo(() => ({fileList}), [fileList]);
  const [seletedItem, setSelectedItem] = useState([])

  const onSelectedImage = useCallback(
    image => {
      setFileList(fileList => {
        const newDataImg = [...fileList];
        const source = {uri: image.path};
        const isSelected = false;
        const item = {
          id: Date.now(),
          url: source,
          content: image.data,
        };
        newDataImg.push(item);
        return newDataImg;
      });
    },
    [setFileList],
  );

  const takePhotoFromCamera = useCallback(() => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    }).then(image => {
      onSelectedImage(image);
      console.log(image);
    });
  }, [onSelectedImage]);

  const getSelected = (item) => {
    seletedItem.includes(item.id)
  }

  useCallback(() => {
    const handleLongPress = (item, index) => {
      // setSelectedItem([seletedItem, item.id])
      const newArr = fileList.map((e, index) => {
        if(item.id == e.id) {
          return {
            ...e,
            selected : true
          }
        }
  
        return {
          selected : false
        }
      })
  
      setdata(newArr);
    }
  
    
  }, [])
  

  

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

  const renderItem = useCallback(({item, index, selected}) => {
    return (
      <View style={styles.flatlist}>
        <TouchableOpacity
        onPress={() => alert(index, "Seleted")}
        onLongPress={() => handleLongPress(item, index)}
        style={[styles.item, {
          
          backgroundColor: item.selected ? styles.overlay : "white"
        }]}
        >
          <View style={{padding: 8}}>
          <Image source={item.url} style={styles.itemImage} />
          </View>
          {selected && <View style={styles.overlay}/>}
        </TouchableOpacity>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" />
      <FlatList
        numColumns={3}
        data={fileList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        extraData={state}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          margin: 15
        }}
        selected = {getSelected(renderItem)}
      />

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity style={styles.viewData} onPress={takePhotoFromCamera}>
          <Text>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.viewData}
          onPress={choosePhotoFromLibrary}>
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
    backgroundColor: "#D32345",
    width: width/2-10,
    // padding: 8,
    borderRadius: 10,
    overflow: "hidden"
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
  }
});

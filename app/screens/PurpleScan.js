import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import OrangePayload1 from "../components/OrangePayload1";
import RedPayload1 from "../components/RedPayload1";
import PurplePayload1 from "../components/PurplePayload1";

function PurpleScan({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
  
  
    useEffect(() => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
  
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
      
        fetch('https://tipjargold.a8mnj2x1n5f.eu-de.codeengine.appdomain.cloud/purplescan',{
          method: 'POST',
          body: JSON.stringify({data}),
          headers: {"Content-Type": "application/json"}
        })
        .then(function(response){
        return response.json()
        }).catch(error => console.log(error));
      
    };
  
    
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <>
     
     <View style={{width: "100%", height: 90, justifyContent: "center", alignItems: "center", backgroundColor: "purple"}}>
        <Text style={{fontFamily: "Menlo", fontSize: 30, fontWeight: "bold", color: "white"}} numberOfLines={1}>Scan Purple Bin QR Code</Text>
        
      </View>
      <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type="front"
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
    <View style={{top: 25, height: 150, flexDirection: "row"}}>
        <View style={{top: 20, left: 40}}>
        <Text style={{fontFamily: "Menlo", fontSize: 30, fontWeight: "bold"}}>Number of Products</Text>
        </View>
        <View style={{top: 20, left: 150}}>
        <Text style={{fontFamily: "Menlo", fontSize: 30, fontWeight: "bold"}}>Tip</Text>
        </View>
        </View>
        <PurplePayload1 />
        <TouchableOpacity onPress={() => navigation.navigate("Purple Step 2")} style={{left: 255,justifyContent: "center", bottom: 10, width: 300, height: 80, backgroundColor: "lavender", borderWidth: 1, borderRadius: 15, borderColor: "white" }}>
          
          <Text style={{fontFamily: "Menlo", fontSize: 30, alignItems: "center", justifyContent: "center", left: 90, fontWeight: "bold"}}>Step 2</Text>
      </TouchableOpacity>

           
   

    
    
  </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
    
      width: '100%',
      height: 500,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "peachpuff"
    }
  })


export default PurpleScan;
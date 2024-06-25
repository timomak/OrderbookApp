/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  View,
} from 'react-native';

import Orderbook from './src/components/Orderbook';

import { Centrifuge } from 'centrifuge';


function App(): React.JSX.Element {
  const [orderbook, setOrderbook] = useState({ asks: [], bids: [] });

  function mergeUpdates(current, updates) {
    const updateMap = new Map(updates.map(item => [item[0], item[1]]));
    const resultMap = new Map(current.map(item => [item[0], item[1]]));

    updateMap.forEach((size, price) => {
      if (size === '0') {
        resultMap.delete(price); // Remove levels where size is zero
      } else {
        resultMap.set(price, size); // Update existing or add new level
      }
    });

    return Array.from(resultMap).sort((a, b) => parseFloat(a[0]) - parseFloat(b[0])); // Sort by price after merging
  }


  useEffect(() => {
    // Prod
    // const centrifuge = new Centrifuge('wss://api.prod.rabbitx.io/ws');
    // centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDAwMDAwMDAwIiwiZXhwIjo2NTQ4NDg3NTY5fQ.o_qBZltZdDHBH3zHPQkcRhVBQCtejIuyq8V1yj5kYq8');

    const centrifuge = new Centrifuge('wss://api.testnet.rabbitx.io/ws');
    centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwiZXhwIjo1MjYyNjUyMDEwfQ.x_245iYDEvTTbraw1gt4jmFRFfgMJb-GJ-hsU9HuDik');

    centrifuge.on('connected', function (ctx) {
      console.log('Connected:', ctx);

      const sub = centrifuge.newSubscription('orderbook:BTC-USD');

      sub.on('state', function (ctx) {
        console.log('State event:', ctx);
      });

      sub.on('join', function (ctx) {
        console.log('Join event:', ctx);
      });

      sub.on('subscribed', function (initialData) {
        console.log('subscribed event:', initialData);
        setOrderbook({ asks: initialData.data.asks, bids: initialData.data.bids });
      });

      sub.on('publication', function (publication) {
        console.log('publication event:', publication.data);
        setOrderbook(prevOrderbook => {
          const newBids = mergeUpdates(prevOrderbook.bids, publication.data.bids);
          const newAsks = mergeUpdates(prevOrderbook.asks, publication.data.asks);
          return { asks: newAsks, bids: newBids };
        });
      });



      sub.on('error', function (error) {
        console.log('Error in subscription:', error);
      });


      sub.subscribe();

    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
      console.log('Disconnected');
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Orderbook bids={orderbook.bids} asks={orderbook.asks} />
    </View>
  );
}

export default App;

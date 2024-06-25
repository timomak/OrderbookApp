/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Orderbook, { Order, OrderbookProps } from './src/components/Orderbook';
import { Centrifuge } from 'centrifuge';

const App = (): React.ReactElement => {
  const styles = StyleSheet.create({
    container: {
      flex: 1, justifyContent: 'center', backgroundColor: '#212A36',
    },
  });

  // Empty state values
  const [orderbook, setOrderbook] = useState<OrderbookProps>({
    asks: [],
    bids: [],
  });

  console.log('Orderbook:', orderbook);

  useEffect(() => {
    // Production
    // const centrifuge = new Centrifuge('wss://api.prod.rabbitx.io/ws');
    // centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDAwMDAwMDAwIiwiZXhwIjo2NTQ4NDg3NTY5fQ.o_qBZltZdDHBH3zHPQkcRhVBQCtejIuyq8V1yj5kYq8');

    // Development
    const centrifuge = new Centrifuge('wss://api.testnet.rabbitx.io/ws');
    centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwiZXhwIjo1MjYyNjUyMDEwfQ.x_245iYDEvTTbraw1gt4jmFRFfgMJb-GJ-hsU9HuDik');


    centrifuge.on('connected', ctx => {
      console.log('Connected:', ctx);
      const sub = centrifuge.newSubscription('orderbook:BTC-USD');

      sub.on('subscribed', initialData => {
        console.log('subscribed event:', initialData);
        setOrderbook({
          asks: initialData.data.asks.map(([price, quantity]) => ({
            price,
            quantity,
          })),
          bids: initialData.data.bids.map(([price, quantity]) => ({
            price,
            quantity,
          })),
        });
      });

      sub.on('publication', publication => {
        console.log('publication event:', publication.data);
        setOrderbook(prevOrderbook => {
          return {
            asks: mergeUpdates(prevOrderbook.asks, publication.data.asks),
            bids: mergeUpdates(prevOrderbook.bids, publication.data.bids),
          };
        });
      });

      sub.subscribe();
    });

    centrifuge.connect();

    return () => {
      centrifuge.disconnect();
    };
  }, []);

  function mergeUpdates(
    current: Order[],
    updates: [string, string][],
  ): Order[] {
    const updateMap = new Map(
      updates.map(([price, quantity]) => [price, quantity]),
    );
    const resultMap = new Map(current.map(item => [item.price, item.quantity]));

    updateMap.forEach((quantity, price) => {
      if (quantity === '0') {
        resultMap.delete(price);
      } else {
        resultMap.set(price, quantity);
      }
    });

    return Array.from(resultMap, ([price, quantity]) => ({
      price,
      quantity,
    })).sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  return (
    <SafeAreaView style={styles.container}>
      <Orderbook bids={orderbook.bids} asks={orderbook.asks} />
    </SafeAreaView>
  );
};

export default App;

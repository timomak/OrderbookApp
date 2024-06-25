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
    // Would usually use a .env for secrets but it wasn't required.

    // Production
    // const centrifuge = new Centrifuge('wss://api.prod.rabbitx.io/ws');
    // centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0MDAwMDAwMDAwIiwiZXhwIjo2NTQ4NDg3NTY5fQ.o_qBZltZdDHBH3zHPQkcRhVBQCtejIuyq8V1yj5kYq8');

    // Development
    const centrifuge = new Centrifuge('wss://api.testnet.rabbitx.io/ws', {
      // Automatically reconnect with exponential backoff and jitter
      minReconnectDelay: 1000,  // Minimum retry delay in milliseconds
      maxReconnectDelay: 5000,  // Maximum retry delay in milliseconds
    });
    centrifuge.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwIiwiZXhwIjo1MjYyNjUyMDEwfQ.x_245iYDEvTTbraw1gt4jmFRFfgMJb-GJ-hsU9HuDik');


    centrifuge.on('connected', ctx => {
      const sub = centrifuge.newSubscription('orderbook:BTC-USD');

      // Get initial data
      sub.on('subscribed', initialData => {
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

      // Update initial Data
      sub.on('publication', publication => {
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

  // Carefully update initial data with new published changes on the subscribed channel.
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
      {/* Separated the UI from the Logic */}
      <Orderbook bids={orderbook.bids} asks={orderbook.asks} />
    </SafeAreaView>
  );
};

export default App;

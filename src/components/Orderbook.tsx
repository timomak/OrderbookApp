/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderbookProps {
    bids: number[];
    asks: number[];
}

const Orderbook: React.FC<OrderbookProps> = ({ bids, asks }) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
        },
        column: {
            flex: 1,
            alignItems: 'center',
        },
        header: {
            fontSize: 18,
            fontWeight: 'bold',
        },
        order: {
            fontSize: 16,
            padding: 5,
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <Text style={styles.header}>Bids</Text>
                {bids.map((bid, index) => (
                    <Text key={index} style={styles.order}>
                        {`Price: ${bid[0]}, Size: ${bid[1]}`}
                    </Text>
                ))}
            </View>
            <View style={styles.column}>
                <Text style={styles.header}>Asks</Text>
                {asks.map((ask, index) => (
                    <Text key={index} style={styles.order}>
                        {`Price: ${ask[0]}, Size: ${ask[1]}`}
                    </Text>
                ))}
            </View>
        </View>
    );
};

export default Orderbook;

/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Order {
    price: string;
    quantity: string;
}

interface OrderbookProps {
    bids: Order[];
    asks: Order[];
}

const Orderbook: React.FC<OrderbookProps> = ({ bids, asks }) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'space-between',
            padding: 10,
            flex: 1, // Ensure container takes up all available space
        },
        row: {
            justifyContent: 'space-between',
            display: 'flex',
            marginBottom: 16,
            flexDirection: 'row',
        },
        header: {
            fontSize: 26,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 8,
        },
        subheader: {
            color: '#8C8A9A',
        },
        order: {
            fontSize: 16,
            color: 'white',
        },
        bids: {
            color: '#4caf50', // Greenish shade
            fontWeight: 600,
        },
        asks: {
            color: '#f44336', // Reddish shade
            fontWeight: 600,
        },
    });

    const renderItems = (items: Order[], asks?: boolean) => {
        return (
            <>
                {items.map((bid, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.order, asks ? styles.asks : styles.bids]}>{`$${bid.price}`}</Text>
                        <Text style={styles.order}>{`${bid.quantity} BTC`}</Text>
                    </View>
                ))}
            </>
        );
    };

    const renderHeader = () => {
        return (
            <View style={styles.row}>
                <Text style={styles.subheader}>{'Price\n(USD)'}</Text>
                <Text style={[styles.subheader, { textAlign: 'right' }]}>{'Quantity\n(BTC)'}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>

            <Text style={styles.header}>Asks</Text>
            {renderHeader()}
            <ScrollView style={styles.asks} contentContainerStyle={{ alignItems: 'stretch' }}>
                {renderItems(asks, true)}
            </ScrollView>


            <Text style={styles.header}>Bids</Text>
            {renderHeader()}
            <ScrollView style={styles.bids} contentContainerStyle={{ alignItems: 'stretch' }}>
                {renderItems(bids)}
            </ScrollView>
        </View>
    );
};

export default Orderbook;

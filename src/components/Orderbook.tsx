/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export interface Order {
    price: string;
    quantity: string;
}

// Created a consistent interface for the data.
export interface OrderbookProps {
    bids: Order[];
    asks: Order[];
}

// The view can have 3 states.
type ViewState = 'all' | 'bids' | 'asks'

const Orderbook: React.FC<OrderbookProps> = ({ bids, asks }) => {
    const [viewState, setViewState] = useState<ViewState>('all');

    // Custom styling.
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'flex-start',
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
        button: {
            fontSize: 14,
            fontWeight: '800',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#8C8A9A',
            paddingTop: 6,
            borderRadius: 20,

        },
    });

    // Create a number formatter for string to USD.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    // Modular function to render all the items.
    const renderItems = (items: Order[], asks?: boolean) => {
        const allItems = viewState === 'all' ? items.slice(0, 8) : items;

        const onViewMore = () => {
            if (viewState !== 'all') {
                setViewState('all');
            }
            else if (asks) {
                setViewState('asks');
            } else {
                setViewState('bids');
            }
        };

        if (allItems.length === 0) {
            return (<Text style={styles.button}>Loading...</Text>);
        }

        return (
            <>
                {allItems.map((bid, index) => (
                    <View key={index} style={styles.row}>
                        <Text style={[styles.order, asks ? styles.asks : styles.bids]}>{`${formatter.format(Number(bid.price))}`}</Text>
                        <Text style={styles.order}>{`${bid.quantity} BTC`}</Text>
                    </View>
                ))}
                <Text onPress={onViewMore} style={styles.button}>{viewState === 'all' ? 'View more' : 'View less'}</Text>
            </>
        );
    };

    // Modular Subheader component for avoiding duplicate code.
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
            {/* Asks component */}
            {viewState === 'all' || viewState === 'asks' ? (
                <>
                    <Text style={styles.header}>Asks</Text>
                    {renderHeader()}
                    <ScrollView style={styles.asks} contentContainerStyle={{ alignItems: 'stretch' }}>
                        {renderItems(asks, true)}
                    </ScrollView>
                </>
            ) : null}

            {/* Bids component */}
            {viewState === 'all' || viewState === 'bids' ? (
                <>
                    <Text style={styles.header}>Bids</Text>
                    {renderHeader()}
                    <ScrollView style={styles.bids} contentContainerStyle={{ alignItems: 'stretch' }}>
                        {renderItems(bids)}
                    </ScrollView>

                </>
            ) : null}
        </View>
    );
};

export default Orderbook;

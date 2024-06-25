# Orderbook Application

This React Native application displays real-time updates for cryptocurrency order books. It uses WebSocket connections to fetch and display bid and ask prices dynamically.

![Orderbook screenshit](https://github.com/timomak/OrderbookApp/blob/main/app-screenshot.png?raw=true)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js installed (18.x or higher recommended)
- Yarn package manager
- React Native environment set up (including Android Studio or Xcode for emulator support)

## Installation

To install the Orderbook application, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/timomak/OrderbookApp.git
   cd OrderbookApp
2. Install the dependencies using Yarn:
   ```yarn install```

## Setting Up for iOS Development
For iOS development, you need to install CocoaPods dependencies:

1. Navigate to the iOS directory:
 ```cd ios```
 2. Install CocoaPods dependencies:
```pod install```
3. Return to the project root directory:
```cd ..```

## Running the Application

To run the Orderbook application on a simulator/emulator, follow these steps:

### Android
Run the application:
```yarn android```

### iOS
Start the iOS simulator.
```yarn ios```

Once the application is running on your emulator or device, it will connect to the WebSocket server and start displaying live order book data for a pre-configured cryptocurrency market.

### Approach Taken
The project focused on creating a robust and responsive React Native application to display real-time orderbook data for cryptocurrency exchanges. The core functionality hinges on establishing and maintaining a WebSocket connection using the centrifuge-js library, which allows for real-time data updates. To manage the display of this data, a functional component, Orderbook, was developed, which renders bid and ask prices in a user-friendly format. The data handling logic ensures that updates are processed efficiently and state changes trigger re-renders of the UI to reflect the most current data. To enhance user experience and system reliability, the application includes error handling, automatic reconnection logic, and sequence number verification to handle any discrepancies in the data stream.

### Challenges Faced
One of the primary challenges was ensuring that the WebSocket connection remains stable and effectively recovers from any network interruptions. Implementing a robust reconnection mechanism that could seamlessly handle disconnections without losing data integrity or causing user disruption was critical. Additionally, managing the state of rapidly updating data posed a challenge, especially in maintaining sequence integrity and ensuring the UI updates smoothly without performance lags. Another technical hurdle was optimizing the React Native UI to handle the dynamic data efficiently, preventing render blocks or memory leaks which could degrade the application's performance.

### Possible Improvements
Moving forward, the application could benefit from several enhancements to boost its functionality and user experience. First, integrating a more sophisticated state management solution like Redux or MobX could help manage state more efficiently, especially for more complex datasets and interactions. This change would facilitate easier scaling of the app and integration of additional features, such as user-specific settings or multiple market subscriptions. Secondly, improving the user interface with advanced visualization tools such as charts and graphs for historical data analysis would significantly enhance the value provided to users. Lastly, implementing more comprehensive error handling and user feedback mechanisms would improve the resilience and usability of the app, ensuring users are well-informed about the app's state and any issues that might impact their experience.
# Starting

Welcome to the React Native Starter.

Follow these steps, then delete this portion of the README.

## Rename

Rename your application from the react starter.

1. `npm install`
2. `npm run rename` to rename the application from the starter
3. `(cd ios && pod install)`

## Install Common Packages

The react starter comes with some built in packages. Consider adding the following common packages.

```
npm install moment    # date/time management
npm install immer     # immutable data management
npm install use-immer # immer hooks data
```

## Clean up

1. `rm bin/rename.js` # delete the rename component
2. Delete this starting section of the README

# Development

## Dependencies

React Native requires a number of dependencies for iOS or Android development. Ensure you've followed the [CLI Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) page so you've got those dependencies installed.

## Getting Started

1. `npm install`
2. `(cd ios && pod install)`
3. `npm run ios` | `npm run android`

## Testing

1. `npm test`

## State Management

`redux`, `react-redux`, and `@reduxjs/toolkit` are all installed for managing state. If you install the [React Native Debugger](https://github.com/jhen0409/react-native-debugger) you can debug the state live.

## UI Hierarchy

`react-navigation` is added for managing navigation state

## Generators

For creating certain elements, we have generators that will create the new component for you.

To create a new `BarScreen`:
`npm run generate screen Bar`

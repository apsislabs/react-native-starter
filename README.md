# Starting

Welcome to the React Native Starter.

Follow these steps, then delete this portion of the README.

## Rename

Rename your application from the react starter.

1. `npm install`
2. `npm run rename` to rename the application from the starter
3. `npm run setup`

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
2. `npm run setup`
3. `npm run ios` | `npm run android`

## Testing

1. `npm test`

## UI Hierarchy

`react-navigation` is added for managing navigation state

## Generators

For creating certain elements, we have generators that will create the new component for you.

To create a new `BarScreen`:
`npm run generate screen Bar`

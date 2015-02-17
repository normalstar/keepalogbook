``` javascript
{
  "modifieduid1": { // Don't access this one because it gets big
    days: {
      "20151201": {count: 3},
      "20141105": {count: 2},
      ...
    },

    data: {
      "20150201": {
        "pushedUniqueId1": "Thing you did",
        "pushedUniqueId2": "Another thing you did",
        ...
      },

      "20150201": {
        ...  
      },

      ...
    },

    meta: {
      share: false,
      active: true,
      displayName: "Something"
    }

  },

  "modifieduid2": {
    ...
  }
}
```

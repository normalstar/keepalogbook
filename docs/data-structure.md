``` javascript
{
  "usernames": { // Used for finding if a username exists or not
    "franky": "uid",
    "anotherUserName": "uid"
  },

  "uids": { // Used for finding username after authenticating
    "someuid": "franky",
    "anotheruid": "anotherUserName"
  },

  "users": {
    "franky": { // Don't access this one because it gets big
      days: {
        "20151201": {share: true, count: 3, mood: 5},
        "20141105": {share: false, count: 2, mood: 1},
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

      settings: {
        share: false
      }
    },

    "anotherUserName": {
      ...
    }
  }
}
```

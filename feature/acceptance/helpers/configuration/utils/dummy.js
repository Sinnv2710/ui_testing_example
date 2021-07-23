const dummyjson = require('dummy-json');

// Deprecated - need to move to faker
const dummyScopes = () => {
  const template = `{
    "scopes": [
      {{#repeat min=2 max=4}}
      {
        "name": "{{firstName}}_{{int 0 999999999}}",
        "displayName": "{{lorem min=2 max=5}}",
        "description": "{{lorem min=2 max=10}}",
        "price": "{{int 0 100}}",
        "claims": [
          {{#repeat min=1 max=5}}
          {
            "name": "{{firstName}}_{{int 0 999999999}}",
            "displayName": "{{lorem min=2 max=5}}",
            "description": "{{lorem min=2 max=10}}",
            "valueType": "{{random 'TEXT' 'INTEGER' 'BOOLEAN'}}",
            "minValue": {{int 0 9}},
            "maxValue": {{int 10 100}}
          }
          {{/repeat}}
        ]
      }
      {{/repeat}}
    ]
  }`;
  const result = dummyjson.parse(template);
  return JSON.parse(result);
};

exports.dummyScopes = dummyScopes;

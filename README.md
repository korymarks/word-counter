## Description

Word Counting API

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

### Endpoint Manual Testing

#### Sample CURL

```bash
curl --location --request POST 'http://localhost:3000/word-counter/frequencies' \
--form 'file=@"{PATH-TO-YOUR-TEXT-FILE}"' \
--form 'top="5"'
```

#### Sample JavaScript Fetch

```javascript
var formdata = new FormData();
formdata.append('file', fileInput.files[0], '{PATH-TO-YOUR-TEXT-FILE}');
formdata.append('top', '5');

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow',
};

fetch('http://localhost:3000/word-counter/frequencies', requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log('error', error));
```

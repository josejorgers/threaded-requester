# Threaded Requester

A simple tool to simulate parallelized HTTP requests. Recomended as a fast way to deal with
token authentication/authorization, and other requests that need to be executed every certain amount
of time.

## Requirements

Your environment must support **ES6** Module Syntax.

## Installation

On your project folder run

```
npm install threaded-requester --save
```

or

```
yarn add threaded-resquester
```

depending on the package manager your are using on your project.

## Usage

You need to import the **Requester** class from the **threaded-requester** package. Then,
for every request you want to execute programatically you need to create a different instance of the
**Requester** class.

The **Requester** class constructor receives two parameters. The first one is mandatory and is the url to
make the request to. The second one is optional and is an object with the options to configure
your request. Available options and their default values are listed below.

### Example

This is an example where we want to make two kind of requests. One is a GET request that is executed
every minute and the other one is a POST that is executed every two minutes.

```javascript
import Requester from "threaded-requester";

let priceRequester = new Requester("https://www.myapi.com/1/price", {
  timeout: 60000, // time in miliseconds
  callback: console.log,
});

let postInfo = new Requester("https://www.myapi.com/personalInfo", {
  timeout: 120000,
  method: "POST",
  headers: {
    "content-type": "application/json",
  },
  body: JSON.stringify({
    firstName: "John",
    lastName: "Doe",
    age: 24,
  }),
  callback: () => console.log("Info Posted!"),
});

// Run the "threads" to make the request every time [] they are needed
priceRequester.run();
postInfo.run();
```

The callback option is a function to be executed once the request is done. The response of the request is passed
as an argument to this function. So, the **priceRequest** will print to the console the response received and
the **postInfo** requester will print to the console the message _Info Posted!_ every time it made a request.

To stop the requester's execution you have to call its **stop** method

```javascript
priceRequester.stop();
postInfo.stop();
```

Note that after stopping the execution is highly likely that one request was waiting for its next execution,
in that case the request will be executed one more time and then it will not be executed anymore until you call
the **run** method again.

## Options

Here's the list of all available options to pass to a requester instance.

| Option   | Default | Description                                                                                                                                                                                                            |
| -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| method   | 'GET'   | The request's HTTP method.                                                                                                                                                                                             |
| headers  | none    | The request's HTTP header.                                                                                                                                                                                             |
| body     | none    | The body of the request.                                                                                                                                                                                               |
| timeout  | 60000   | The request is made every _timeout_ miliseconds.                                                                                                                                                                       |
| callback | none    | A function to be called once the request is finished. The response of the request is passed as a parameter to this function.                                                                              |
| failure  | none    | A function to be called when the request fails. The response of the request is passed as a parameter to this function. The request will still be executed no matter whether it has failed. |

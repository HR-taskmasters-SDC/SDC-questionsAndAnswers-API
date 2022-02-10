# SDC-questionsAndAnswers-API

This project is about build one of the service that make up the full API to support FEC application(https://github.com/cynthia2604/FEC-HRLAX48). The project requires to first design a database and server that meet the requirements of application, and then deploy and scale the service to support (a minimum of) 100 requests per second on EC2 using a t2.micro instance.


### Built With

* [Node.js](https://nodejs.dev/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [AWS](https://aws.amazon.com/)
* [NGINX](https://www.nginx.com/)


### Installation

* Make a copy of the file `.env_example` and rename to `.env`, assign the database connection infomation.

* Install dependencies
```sh
npm install
```
* Start the server
```sh
npm run server
```
## Endpoints List

`GET /qa/questions` Retrieves a list of questions for a particular product.
| Query Parameter | Type    | Description                                               |
| --------------- | ------- | -------------------------------------------------------   |
| product_id      | integer | Specifies the product for which to retrieve questions.    |
| page            | integer | Specifies the page of results to return. Default 1.       |
| count           | integer | Specifies how many results per page to return. Default 5. |

**Response**

`Status: 200 OK `

```json
{
    "product_id": 5,
    "results": [
        {
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2021-03-06T07:24:17.250Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": [
                {
                    "id": 70,
                    "body": "Some of the seams started splitting the first time I wore it!",
                    "date": "2021-02-21T21:19:34.898-08:00",
                    "answerer_name": "sillyguy",
                    "helpfulness": 6,
                    "photos": []
                },
                {
                    "id": 78,
                    "body": "9 lives",
                    "date": "2021-03-02T06:17:15.222-08:00",
                    "answerer_name": "iluvdogz",
                    "helpfulness": 31,
                    "photos": [
                        "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"
                    ]
                }
                // ...
            ]
        },
        // ...
    ]
}
```

`GET /qa/questions/:question_id/answers` Returns answers for a given question.
| Parameter   | Type    | Description                                               |
| ----------- | ------- | -------------------------------------------------------   |
| question_id | integer | Required ID of the question for wich answers are needed.  |


| Query Parameter | Type    | Description                                               |
| --------------- | ------- | --------------------------------------------------------- |
| page            | integer | Selects the page of results to return. Default 1.         |
| count           | integer | Specifies how many results per page to return. Default 5. |

**Response**

`Status: 200 OK`

```json
{
    "question": 1,
    "page": 1,
    "count": "5",
    "results": [
        {
            "answer_id": 8,
            "body": "DONT BUY IT! It's bad for the environment",
            "date": "2020-09-19T21:49:22.548Z",
            "answerer_name": "metslover",
            "helpfulness": 8,
            "photos": []
        },
        {
            "answer_id": 5,
            "body": "Something pretty soft but I can't be sure",
            "date": "2020-09-13T09:49:20.555Z",
            "answerer_name": "metslover",
            "helpfulness": 5,
            "photos": [
                {
                    "id": 1,
                    "url": "https://images.unsplash.com/photo-1530519729491-aea5b51d1ee1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1651&q=80"
                },
                {
                    "id": 2,
                    "url": "https://images.unsplash.com/photo-1511127088257-53ccfcc769fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                },
                {
                    "id": 3,
                    "url": "https://images.unsplash.com/photo-1500603720222-eb7a1f997356?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1653&q=80"
                }
            ]
        },
        // ...
    ]
}
```

`POST /qa/questions` Add a question for the given product.
| Body Parameter | Type    | Description                                                 |
| -------------- | --------| ------------------------------------------------------------|
| body           | text    | Text of question being asked                                |
| name           | text    | Username for question asker                                 |
| email          | text    | Email address for question asker                            |
| product_id     | integer | Required ID of the Product for which the question is posted |

**Response**

`Status: 201 CREATED`

`POST /qa/questions/:question_id/answers`
| Parameter   | Type    | Description                                               |
| ----------- | ------- | -------------------------------------------------------   |
| question_id | integer | Required ID of the question to post the answer for        |

| Body Parameter | Type    | Description                                                 |
| -------------- | --------| ------------------------------------------------------------|
| body           | text    | Text of question being answered                             |
| name           | text    | Username for question answered                              |
| email          | text    | Email address for question answered                         |
| photos         | [text]  | An array of urls corresponding to images to display         |

**Response**

`Status: 201 CREATED`

`PUT /qa/questions/:question_id/helpful`
| Parameter   | Type    | Description                           |
| ----------- | ------- | --------------------------------------|
| question_id | integer | Required ID of the question to update |

**Response**

`Status: 204 NO CONTENT`

`PUT /qa/questions/:question_id/report`
| Parameter   | Type    | Description                           |
| ----------- | ------- | --------------------------------------|
| question_id | integer | Required ID of the question to update |

**Response**

`Status: 204 NO CONTENT`

`PUT /qa/answers/:answer_id/helpful`
| Parameter   | Type    | Description                           |
| ----------- | ------- | --------------------------------------|
| answer_id   | integer | Required ID of the answer to update   |

**Response**

`Status: 204 NO CONTENT`

`PUT /qa/answers/:answer_id/report`
| Parameter   | Type    | Description                           |
| ----------- | ------- | --------------------------------------|
| answer_id   | integer | Required ID of the answer to update   |

**Response**

`Status: 204 NO CONTENT`


## Local Stress Testing and Optimization
K6 loading tests are run with `K6 run` and following path of file. Need K6 installed.
I used K6 for local stress testing to identify system bottlenecks and optimizing the performance with PostgreSQL indexes.
![K6 Loading Test](./readme/100rps.png)

## Deployment
I deployed the server and database onto separate AWS EC2 t2.micro instances and used Loader.io, a cloud-based stress testing tool, to benchmark performance.

## Scaling
Microservice is horizontally scaled by deploying two servers with one NGINX load balancer to handle 2000 RPS in 15ms with less than 1% error rate.
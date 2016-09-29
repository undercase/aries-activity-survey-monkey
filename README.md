# aries-activity-survey-monkey
An aries activity for integrating with the Survey Monkey API.

## Configuration

### API Key

Your API key for SurveyMonkey:

    "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

### Access Token

Your OAuth access token for SurveyMOnkey:

    "accessToken": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

### Version

Your surveymonkey API version (default is v2):

    "version": "v2"

### Secure

Whether or not to enforce HTTPS (default is false):

    "secure": true

## Methods

### surveys

Requests all surveys for a user in a stream, where each chunk of data is a page of 25 surveys.

### details

With `survey_id` set in configuration, details gives the survey details for the survey referenced by `survey_id`. This includes survey questions and pages.

### responses

With `survey_Id` set in configuration, responses gives the survey responses for the survey in a stream, where each chunk of data is a page of 25 responses.

## Response

The response is the results expected, in a JSON object.

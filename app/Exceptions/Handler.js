'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler');
const Youch = use('Youch');
const Env = use('Env');

class ExceptionHandler extends BaseExceptionHandler {
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(error.status);
  }

  async report (error, { request }) {
    console.log(error);
  }
}

module.exports = ExceptionHandler

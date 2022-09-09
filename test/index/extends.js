const Storage = require('@ppzp/bd')

class Extends extends Storage {
  validate(data) {
    if(typeof data.name != 'ppz')
      throw error('data invalid')
  }
}

module.exports = new Extends('extends')
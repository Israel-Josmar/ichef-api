import { SERIAL_LENGTH, FIELD_CODES, FIELD_CODE_LENGTH } from './constants'

const createCursor = (field, serial) => {
  const tagBuffer = Buffer.from('cursor:v1:')

  const serialBuffer = Buffer.alloc(SERIAL_LENGTH)
  serialBuffer.writeUInt32BE(serial)

  let fieldCode
  if (field instanceof Date) {
    fieldCode = FIELD_CODES.date
  } else if (Number.isInteger(field)) {
    fieldCode = FIELD_CODES.integer
  } else if (typeof field === 'string') {
    fieldCode = FIELD_CODES.string
  } else {
    throw new Error('Field type not supported')
  }

  const fieldCodeBuffer = Buffer.alloc(FIELD_CODE_LENGTH)
  fieldCodeBuffer.writeUIntBE(fieldCode, 0, 1)

  let fieldValueBuffer
  if (fieldCode === FIELD_CODES.date) {
    fieldValueBuffer = Buffer.from(field.toISOString())
  } else if (fieldCode === FIELD_CODES.integer) {
    fieldValueBuffer = Buffer.alloc(4)
    fieldValueBuffer.writeUIntBE(field, 0, 4)
  } else {
    fieldValueBuffer = Buffer.from(field)
  }
  const cursorBuffer = Buffer.concat([
    tagBuffer,
    fieldValueBuffer,
    fieldCodeBuffer,
    serialBuffer,
    //
  ])

  const cursor = cursorBuffer.toString('base64')
  return cursor
}

export default createCursor

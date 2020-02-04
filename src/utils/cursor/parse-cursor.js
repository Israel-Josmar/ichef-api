import { SERIAL_LENGTH, TAG_LENGTH, FIELD_CODES, FIELD_CODE_LENGTH } from './constants'

const minimumCursorLength = TAG_LENGTH + FIELD_CODE_LENGTH + SERIAL_LENGTH

const parseCursor = cursor => {
  const cursorBuffer = Buffer.from(cursor, 'base64')

  if (cursorBuffer.length < minimumCursorLength) {
    throw new Error(`${cursor} does not appear to be a valid cursor.`)
  }

  const tokens = cursorBuffer.slice(0, TAG_LENGTH).toString()
  const {
    groups: { cursorVersion },
  } = tokens.match(/^cursor:v(?<cursorVersion>\d+):$/)

  if (Number.parseInt(cursorVersion) !== 1) {
    throw new Error(`${cursor} does not appear to be a valid cursor.`)
  }

  const serialStartPos = cursorBuffer.length - SERIAL_LENGTH
  const serial = cursorBuffer.readUInt32BE(serialStartPos)

  const fieldCodeStartPos = serialStartPos - FIELD_CODE_LENGTH
  const fieldCode = cursorBuffer.readUIntBE(fieldCodeStartPos, 1)

  const fieldStartPos = TAG_LENGTH

  let field

  switch (fieldCode) {
    case FIELD_CODES.integer:
      if (fieldStartPos + 4 != fieldCodeStartPos) {
        throw new Error(`${cursor} does not appear to be a valid cursor.`)
      }
      field = cursorBuffer.readUIntBE(fieldStartPos, 4)
      break
    case FIELD_CODES.date: // passthru
    case FIELD_CODES.string:
      if (fieldStartPos >= fieldCodeStartPos) {
        throw new Error(`${cursor} does not appear to be a valid cursor.`)
      }
      field = cursorBuffer.slice(fieldStartPos, fieldCodeStartPos).toString()
      break
    default:
      throw new Error(`${cursor} does not appear to be a valid cursor.`)
  }

  if (fieldCode === FIELD_CODES.date) {
    field = new Date(field)
  }

  return [field, serial]
}

export default parseCursor

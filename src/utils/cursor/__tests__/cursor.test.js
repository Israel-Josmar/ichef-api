import { createCursor, parseCursor } from '..'

describe('cursor create/parse', () => {
  test('should create cursor from string', () => {
    const cursor = createCursor('value-test', 1001)
    const [field, serial] = parseCursor(cursor)

    expect(field).toEqual('value-test')
    expect(serial).toEqual(1001)
  })

  test('should create cursor from Date', () => {
    const date = new Date()

    const cursor = createCursor(date, 1001)
    const [field, serial] = parseCursor(cursor)

    expect(field).toEqual(date)
    expect(serial).toEqual(1001)
  })

  test('should create cursor from integer', () => {
    const cursor = createCursor(7, 1001)
    const [field, serial] = parseCursor(cursor)

    expect(field).toEqual(7)
    expect(serial).toEqual(1001)
  })

  test.todo('should not accept null as field')

  test.todo('should not accept undefined as field')
})

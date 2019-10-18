const jwt = require('jsonwebtoken');

describe('jsonwebtoken test', () => {

  it('should be ok', () => {
    const token = jwt.sign({ id: '1'}, '123');

    expect(jwt.verify(token, '123')).toEqual(true);
  })
});

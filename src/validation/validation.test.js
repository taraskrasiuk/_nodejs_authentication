const fs = require('fs');
const { getFileData } = require('./validation');



describe('validations', () => {

  describe('when read a private key file', () => {
    it('should read private key file', async () => {

      const sut = await getFileData(fs.readFileSync)(__dirname + '/public.key', 'utf-8');

      expect(sut).toBeDefined();
    })
  });

  describe('test', () => {
    it('test', () => {
      const t = 'MDwwDQYJKoZIhvcNAQEBBQADKwAwKAIhAKfJfUHZJXMtmmZ5hXzZCQ/RWxqFx30xWMKrbxCW3tWxAgMBAAE=\n';
    });
  })
})

const { handleJournal } = require('../src/index');

describe('handleJournal', () => {
  it('parses valid binary data', () => {
    const result = handleJournal("test");
    console.log(result);
    expect(result.getName()).toBe("test");
  });
});
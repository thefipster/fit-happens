const { CreateTagMsg } = require('../src/models/tag-messages');

describe('tag messages', () => {
  test('check ctor', () => {
    const tagName = "blah";
    
    const msg = new CreateTagMsg(tagName);

    expect(msg.name).toBe(tagName);
    expect(msg.timestamp).toBeGreaterThan(0);
    expect(msg.id).toBeDefined();
  }),

  test('check ids', () => {
    const msg = new CreateTagMsg("irrelevant");

    expect(msg.id).not.toBe(msg.tagId);
  });
});
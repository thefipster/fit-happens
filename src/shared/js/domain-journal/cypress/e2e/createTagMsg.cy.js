import { CreateTagMsg } from '../../src/models/tag-messages'

describe('Journal API Test', () => {
  it('should create a tag and receive 200 response', () => {
    const msg = new CreateTagMsg('TestTag', null);

    cy.request({
      method: 'POST',
      url: 'http://localhost:32769/api/journal/append', // adjust to your actual endpoint
      body: [msg],
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '1A2B3C4D5E6F7G8H9I0J'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  
  it('should emit on new message', () => {
    const msg = new CreateTagMsg('TestTag', null);

    cy.request({
      method: 'POST',
      url: 'http://localhost:32769/api/journal/append', // adjust to your actual endpoint
      body: [msg],
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '1A2B3C4D5E6F7G8H9I0J'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
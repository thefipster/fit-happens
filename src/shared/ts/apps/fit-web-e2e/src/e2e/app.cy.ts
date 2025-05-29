import { MessageBuilder } from '@fit-journal';

describe('fit-web-e2e', () => {
  it('should post and retrieve a journal message', () => {
    const message = new MessageBuilder().createTag('assisted');

    cy.request({
      method: 'POST',
      url: '/api/journal/append',
      headers: {
        'X-API-Key': '42GEG32WGFE4WFWE3WEFGW',
        'Content-Type': 'application/json',
      },
      body: [message],
    }).then((postResponse) => {
      expect(postResponse.status).to.eq(200);

      cy.request({
      method: 'GET',
      url: '/api/journal',
      headers: {
        'X-API-Key': '42GEG32WGFE4WFWE3WEFGW'
      }
    }).then((getResponse) => {
        expect(getResponse.status).to.eq(200);

        const received = getResponse.body;
        expect(received).to.deep.include(message); // partial match
      });
    });
  });
});

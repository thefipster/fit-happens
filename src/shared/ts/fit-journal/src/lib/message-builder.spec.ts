import axios from 'axios';
import { MessageBuilder } from './message-builder';
import { ExerciseTypes } from './models';

describe('FitJournal API Integration', () => {
  const baseUrl = 'http://localhost:32769/api/journal';
  const apiKey = '42GEG32WGFE4WFWE3WEFGW';
  const headers = {
    'X-API-Key': apiKey,
    'Content-Type': 'application/json',
  };

  it('should post tag with name', async () => {
    const tagName = 'assisted';
    const message = new MessageBuilder().createTag(tagName);
    const body = [message];

    // POST
    const postResponse = await axios.post(`${baseUrl}/append`, body, {
      headers,
    });
    expect(postResponse.status).toBe(200);

    // GET
    const getResponse = await axios.get(baseUrl, { headers });
    expect(getResponse.status).toBe(200);
    const actual = getResponse.data[0];

    expect(actual.name).toBe(tagName);
    expect(actual.parentId ?? null).toBeNull();

    // DELETE
    const deleteResponse = await axios.delete(baseUrl, { headers });
    expect(deleteResponse.status).toBe(200);
  });

  it('should post exercise with name', async () => {
    const exerciseName = 'Pushups';
    const message = new MessageBuilder().createExercise(exerciseName, ExerciseTypes.Repeated);
    const body = [message];

    // POST
    const postResponse = await axios.post(`${baseUrl}/append`, body, {
      headers,
    });
    expect(postResponse.status).toBe(200);

    // GET
    const getResponse = await axios.get(baseUrl, { headers });
    expect(getResponse.status).toBe(200);
    const actual = getResponse.data[0];

    expect(actual.name).toBe(exerciseName);
    expect(actual.exerciseType).toBe(ExerciseTypes.Repeated);

    // DELETE
    const deleteResponse = await axios.delete(baseUrl, { headers });
    expect(deleteResponse.status).toBe(200);
  });
});

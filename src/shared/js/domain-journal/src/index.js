const { CreateTagMsg } = require('./protos/journal_pb')

function handleJournal(name) {
  var msg = new CreateTagMsg();
  msg.setName(name);
  return msg;
}

module.exports = {
  handleJournal
};
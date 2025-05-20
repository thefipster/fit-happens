using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Enums;
using FitHappens.Domain.Journal.Events;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Components
{
    public class JournalEmitter : IJournalEmitter
    {
        private readonly List<JournalMessage> messages;
        private long last;
        public event NextEventHandler? Next;
        public delegate void NextEventHandler(object sender, NextEventArgs e);

        public JournalEmitter()
        {
            messages = [];
        }

        public JournalEmitter(IEnumerable<JournalMessage> messages)
        {
            this.messages = [.. messages.OrderBy(x => x.Timestamp)];
            last = this.messages.Max(x => x.Timestamp);
        }

        public void Append(JournalMessage message)
        {
            if (message.Timestamp < last)
                throw new Exception("Can't append, there are newer messages. Use merge instead.");

            messages.Add(message);
            last = message.Timestamp;
            Next?.Invoke(this, new NextEventArgs(message));
        }

        public void Append(IEnumerable<JournalMessage> messages)
        {
            if (messages.Any(messages => messages.Timestamp < last))
                throw new Exception("Can't append, there are newer messages. Use merge instead.");

            foreach (var message in messages.OrderBy(x => x.Timestamp))
                Append(message);
        }

        public void Merge(JournalMessage message, MergeStrategy strategy)
        {
            throw new NotImplementedException();
        }

        public void Merge(IEnumerable<JournalMessage> messages, MergeStrategy strategy)
        {
            throw new NotImplementedException();
        }
    }
}

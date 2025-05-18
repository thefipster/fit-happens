using FitHappens.Domain.Journal.Abstractions;

namespace FitHappens.Domain.Journal.Messages
{
    public partial class CreateSetMsg : IJournalMessage
    {
        public long Timestamp => Stamp.Timestamp;

        IJournalMessage IJournalMessage.Clone() => Clone();
    }
}

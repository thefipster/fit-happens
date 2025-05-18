using Google.Protobuf;

namespace FitHappens.Domain.Journal.Abstractions
{
    public interface IJournalMessage
    {
        IJournalMessage Clone();

        long Timestamp { get; }
    }
}

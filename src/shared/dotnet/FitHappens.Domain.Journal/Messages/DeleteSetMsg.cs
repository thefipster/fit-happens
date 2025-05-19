namespace FitHappens.Domain.Journal.Messages
{
    public partial class DeleteSetMsg : JournalMessage
    {
        public string SetId { get; set; }
    }
}

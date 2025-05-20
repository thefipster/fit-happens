using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Events
{
    public class NextEventArgs : EventArgs
    {
        public NextEventArgs(JournalMessage message)
        {
            Type = message.GetType().Name;
            Message = message;
        }

        public string Type { get; set; }
        public JournalMessage Message { get; set; }
    }
}

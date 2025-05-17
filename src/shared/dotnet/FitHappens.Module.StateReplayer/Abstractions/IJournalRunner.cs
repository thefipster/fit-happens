using FitHappens.Domain.FitData;

namespace FitHappens.Module.StateReplayer.Abstractions
{
    public interface IJournalRunner
    {
        FitState ReplayJournal(IEnumerable<object> journal);

        FitState ReplayJournal(FitState state, IEnumerable<object> journal);
    }
}

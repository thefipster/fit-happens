using FitHappens.Domain.Journal.Events;

namespace FitHappens.Domain.FitData.Abstractions
{
    public interface IJournalRunner
    {
        FitState Next(FitState state, NextEventArgs args);
    }
}

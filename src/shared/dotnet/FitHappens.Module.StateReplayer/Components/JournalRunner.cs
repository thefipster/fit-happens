using FitHappens.Domain.FitData;
using FitHappens.Module.StateReplayer.Abstractions;

namespace FitHappens.Module.StateReplayer.Components
{
    public class JournalRunner : IJournalRunner
    {
        private readonly IEnumerable<IMessageHandler> handlers;

        public JournalRunner()
        {
            handlers = ensureHandlers();
        }

        public FitState ReplayJournal(FitState state, IEnumerable<object> journal)
        {
            foreach (var entry in journal)
            {
                var handler = ensureHandler(entry);
                state = handler.Apply(state, entry);
            }

            return state;
        }

        public FitState ReplayJournal(IEnumerable<object> journal)
        {
            var state = new FitState();

            return ReplayJournal(state, journal);
        }

        private IEnumerable<IMessageHandler> ensureHandlers()
        {
            try
            {
                var handlers = findHandlers();
                if (!handlers.Any())
                    throw new InvalidOperationException("No handlers found.");

                return handlers.Select(x => (IMessageHandler)Activator.CreateInstance(x));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    "Failed to create handlers. Ensure all handlers have a parameterless constructor.",
                    ex
                );
            }
        }

        private static IEnumerable<Type> findHandlers()
        {
            var handlerType = typeof(IMessageHandler);
            var types = AppDomain
                .CurrentDomain.GetAssemblies()
                .SelectMany(s => s.GetTypes())
                .Where(p => handlerType.IsAssignableFrom(p) && p.IsInterface == false);

            return types;
        }

        private IMessageHandler ensureHandler(object entry)
        {
            try
            {
                return handlers.First(handler => handler.CanHandle(entry));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    $"No handler found for entry of type {entry.GetType().Name}",
                    ex
                );
            }
        }
    }
}

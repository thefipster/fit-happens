using FitHappens.Domain.FitData.Abstractions;
using FitHappens.Domain.Journal.Events;

namespace FitHappens.Domain.FitData.Components
{
    public class JournalRunner : IJournalRunner
    {
        private readonly IEnumerable<IMessageHandler> handlers;

        public JournalRunner()
        {
            handlers = ensureHandlers();
        }

        public FitState Next(FitState state, NextEventArgs args)
        {
            var handler = ensureHandler(args.Type);
            state = handler.Apply(state, args.Message);
            return state;
        }

        private static List<IMessageHandler> ensureHandlers()
        {
            try
            {
                var types = findHandlers();
                if (!types.Any())
                    throw new InvalidOperationException("No handlers found.");

                var handlers = new List<IMessageHandler>();
                foreach (var type in types)
                {
                    if (Activator.CreateInstance(type) is IMessageHandler handler)
                        handlers.Add(handler);
                }

                return handlers;
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

        private IMessageHandler ensureHandler(string type)
        {
            try
            {
                return handlers.First(handler => handler.CanHandle(type));
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(
                    $"No handler found for entry of type {type}",
                    ex
                );
            }
        }
    }
}

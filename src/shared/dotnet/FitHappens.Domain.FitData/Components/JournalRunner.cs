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
            var message = args.Message;
            var handler = ensureHandler(message);
            state = handler.Apply(state, message);
            return state;
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

using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal
{
    public static class JournalBuilder
    {
        public static CreateTagMsg CreateTagMessage(string name)
        {
            return new CreateTagMsg
            {
                Stamp = createStamp(),
                Id = Guid.NewGuid().ToString(),
                Name = name,
            };
        }

        public static CreateTagMsg CreateTagMessage(string name, string parent)
        {
            var msg = CreateTagMessage(name);
            msg.Parent = parent;
            return msg;
        }

        public static CreateExerciseMsg CreateExerciseMessage(string name)
        {
            return new CreateExerciseMsg
            {
                Stamp = createStamp(),
                Id = Guid.NewGuid().ToString(),
                Name = name,
            };
        }

        public static CreateSetMsg CreateSetMessage(
            long timestamp,
            string exerciseId,
            int reps,
            IEnumerable<string> tagIds
        )
        {
            var message = new CreateSetMsg
            {
                Stamp = createStamp(),
                Id = Guid.NewGuid().ToString(),
                Timestamp = timestamp,
                ExerciseId = exerciseId,
                Reps = reps,
            };

            foreach (var tag in tagIds)
            {
                message.TagIds.Add(tag);
            }

            return message;
        }

        public static DeleteSetMsg DeleteSetMessage(string id)
        {
            return new DeleteSetMsg { Stamp = createStamp(), Id = id };
        }

        private static MessageStamp createStamp()
        {
            return new MessageStamp
            {
                Id = Guid.NewGuid().ToString(),
                Timestamp = ((DateTimeOffset)DateTime.UtcNow).ToUnixTimeMilliseconds(),
            };
        }
    }
}

using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Util
{
    public static class JournalBuilder
    {
        public static CreateTagMsg CreateTagMessage(string name)
        {
            return new CreateTagMsg { TagId = Guid.NewGuid().ToString(), Name = name };
        }

        public static CreateTagMsg CreateTagMessage(string name, string parentId)
        {
            var msg = CreateTagMessage(name);
            msg.ParentId = parentId;
            return msg;
        }

        public static CreateExerciseMsg CreateExerciseMessage(string name)
        {
            return new CreateExerciseMsg { ExerciseId = Guid.NewGuid().ToString(), Name = name };
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
                SetId = Guid.NewGuid().ToString(),
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
            return new DeleteSetMsg { SetId = id };
        }

        public static IEnumerable<JournalMessage> Concat(params JournalMessage[] messages)
        {
            return messages;
        }
    }
}

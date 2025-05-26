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

        public static CreateExerciseMsg CreateExerciseMessage(string name, string type)
        {
            return new CreateExerciseMsg
            {
                ExerciseId = Guid.NewGuid().ToString(),
                Name = name,
                ExerciseType = type,
            };
        }

        public static CreateBatchMsg CreateSetMessage(
            long timestamp,
            string exerciseId,
            int reps,
            IEnumerable<string> tagIds
        )
        {
            var message = new CreateBatchMsg
            {
                BatchId = Guid.NewGuid().ToString(),
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

        public static DeleteBatchMsg DeleteSetMessage(string id)
        {
            return new DeleteBatchMsg(id);
        }

        public static IEnumerable<JournalMessage> Concat(params JournalMessage[] messages)
        {
            return messages;
        }
    }
}

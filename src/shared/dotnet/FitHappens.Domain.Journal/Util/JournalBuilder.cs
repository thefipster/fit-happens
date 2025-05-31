using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Util
{
    public static class JournalBuilder
    {
        #region Create Tag

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

        public static CreateTagMsg CreateTagMessage(string name, IEnumerable<string> exerciseIds)
        {
            var msg = CreateTagMessage(name);
            msg.ExerciseIds = exerciseIds;
            return msg;
        }

        public static CreateTagMsg CreateTagMessage(
            string name,
            string parentId,
            IEnumerable<string> exerciseIds
        )
        {
            var msg = CreateTagMessage(name, parentId);
            msg.ExerciseIds = exerciseIds;
            return msg;
        }

        #endregion

        #region Create Exercise

        public static CreateExerciseMsg CreateExerciseMessage(string name, string type)
        {
            return new CreateExerciseMsg
            {
                ExerciseId = Guid.NewGuid().ToString(),
                Name = name,
                ExerciseType = type,
            };
        }

        public static CreateExerciseMsg CreateExerciseMessage(
            string name,
            string type,
            IEnumerable<string> tagIds
        )
        {
            var msg = CreateExerciseMessage(name, type);
            msg.TagIds = tagIds;
            return msg;
        }

        #endregion

        #region Create Batch

        public static CreateBatchMsg CreateBatchMessage(string exerciseId, int reps)
        {
            return new CreateBatchMsg
            {
                BatchId = Guid.NewGuid().ToString(),
                BatchTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
                ExerciseId = exerciseId,
                Reps = reps,
            };
        }

        public static CreateBatchMsg CreateBatchMessage(string exerciseId, int reps, long timestamp)
        {
            var msg = CreateBatchMessage(exerciseId, reps);
            msg.BatchTimestamp = timestamp;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(
            string exerciseId,
            int reps,
            IEnumerable<string> tagIds
        )
        {
            var msg = CreateBatchMessage(exerciseId, reps);
            msg.TagIds = tagIds;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(
            string exerciseId,
            int reps,
            long timestamp,
            IEnumerable<string> tagIds
        )
        {
            var msg = CreateBatchMessage(exerciseId, reps, timestamp);
            msg.TagIds = tagIds;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(string exerciseId, int reps, double weight)
        {
            var msg = CreateBatchMessage(exerciseId, reps);
            msg.Weight = weight;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(
            string exerciseId,
            int reps,
            double weight,
            long timestamp
        )
        {
            var msg = CreateBatchMessage(exerciseId, reps, timestamp);
            msg.Weight = weight;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(
            string exerciseId,
            int reps,
            double weight,
            IEnumerable<string> tagIds
        )
        {
            var msg = CreateBatchMessage(exerciseId, reps, tagIds);
            msg.Weight = weight;
            return msg;
        }

        public static CreateBatchMsg CreateBatchMessage(
            string exerciseId,
            int reps,
            double weight,
            long timestamp,
            IEnumerable<string> tagIds
        )
        {
            var msg = CreateBatchMessage(exerciseId, reps, timestamp, tagIds);
            msg.Weight = weight;
            return msg;
        }

        #endregion

        #region Delete Batch

        public static DeleteBatchMsg DeleteBatchMessage(string id)
        {
            return new DeleteBatchMsg { BatchId = id };
        }

        #endregion

        #region Create Bodyweight

        public static CreateBodyweightMsg CreateBodyweightMessage(double weight)
        {
            return new CreateBodyweightMsg
            {
                Weight = weight,
                WeightTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(),
            };
        }

        public static CreateBodyweightMsg CreateBodyweightMessage(double weight, long timestamp)
        {
            return new CreateBodyweightMsg { Weight = weight, WeightTimestamp = timestamp };
        }

        #endregion

        #region Link Exercise Tags

        public static LinkExerciseTagsMsg LinkExerciseTagsMessage(string exerciseId, string tagId)
        {
            return new LinkExerciseTagsMsg { ExerciseIds = [exerciseId], TagIds = [tagId] };
        }

        public static LinkExerciseTagsMsg LinkExerciseTagsMessage(
            string exerciseId,
            IEnumerable<string> tagIds
        )
        {
            return new LinkExerciseTagsMsg { ExerciseIds = [exerciseId], TagIds = tagIds };
        }

        public static LinkExerciseTagsMsg LinkExerciseTagsMessage(
            IEnumerable<string> exerciseIds,
            string tagId
        )
        {
            return new LinkExerciseTagsMsg { ExerciseIds = exerciseIds, TagIds = [tagId] };
        }

        public static LinkExerciseTagsMsg LinkExerciseTagsMessage(
            IEnumerable<string> tagIds,
            IEnumerable<string> exerciseIds
        )
        {
            return new LinkExerciseTagsMsg { ExerciseIds = exerciseIds, TagIds = tagIds };
        }

        #endregion
    }
}

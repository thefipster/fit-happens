﻿using FitHappens.Domain.FitData.Components;
using FitHappens.Domain.Journal.Components;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Domain.Journal.Util;

namespace FitHappens.Domain.FitData.Unittest
{
    public class SetMessageTests
    {
        [Fact]
        public void StatisticsGetUpdatedOnCreateTest()
        {
            // Arrange
            var reps = 10;

            var createTagMsg = JournalBuilder.CreateTagMessage("assisted");
            var createExerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Up",
                ExerciseTypes.Repeated
            );
            var createBatchMsg = JournalBuilder.CreateBatchMessage(
                createExerciseMsg.ExerciseId,
                reps,
                [createTagMsg.TagId]
            );

            var state = new FitState();
            var runner = new JournalRunner();
            var emitter = new JournalEmitter();
            emitter.Next += (sender, args) =>
            {
                state = runner.Next(state, args);
            };

            // Assert Initial State
            emitter.Append(createTagMsg);
            emitter.Append(createExerciseMsg);
            emitter.Append(createBatchMsg);

            // Assert
            Assert.Equal(reps, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }

        [Fact]
        public void StatisticsGetUpdatedTwiceOnCreateTest()
        {
            // Arrange
            var reps = 10;

            var createExerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Up",
                ExerciseTypes.Repeated
            );
            var createBatchMsg = JournalBuilder.CreateBatchMessage(
                createExerciseMsg.ExerciseId,
                reps,
                []
            );

            var state = new FitState();
            var runner = new JournalRunner();
            var emitter = new JournalEmitter();
            emitter.Next += (sender, args) =>
            {
                state = runner.Next(state, args);
            };

            // Assert Initial State
            emitter.Append(createExerciseMsg);
            emitter.Append(createBatchMsg);
            emitter.Append(createBatchMsg);

            // Assert
            Assert.Equal(reps * 2, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }

        [Fact]
        public void StatisticsGetUpdatedOnDeleteTest()
        {
            // Arrange
            var reps = 10;

            var createExerciseMsg = JournalBuilder.CreateExerciseMessage(
                "Push-Up",
                ExerciseTypes.Repeated
            );
            var createBatchMsg = JournalBuilder.CreateBatchMessage(
                createExerciseMsg.ExerciseId,
                reps,
                []
            );
            var deleteBatchMsg = JournalBuilder.DeleteBatchMessage(createBatchMsg.BatchId);

            var initJournal = new object[] { createExerciseMsg, createBatchMsg };
            var updateJournal = new object[] { deleteBatchMsg };

            var state = new FitState();
            var runner = new JournalRunner();
            var emitter = new JournalEmitter();
            emitter.Next += (sender, args) =>
            {
                state = runner.Next(state, args);
            };

            // Assert Initial State
            emitter.Append(createExerciseMsg);
            emitter.Append(createBatchMsg);
            Assert.Equal(reps, state.AllTimeForeverAndEverStatistics.TotalRepCount);

            // Assert Updated State
            emitter.Append(deleteBatchMsg);
            Assert.Equal(0, state.AllTimeForeverAndEverStatistics.TotalRepCount);
        }
    }
}

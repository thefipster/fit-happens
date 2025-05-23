﻿using FitHappens.Domain.FitData;
using FitHappens.Domain.FitData.Abstractions;
using FitHappens.Domain.FitData.Models;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.FitData.Handlers
{
    public class CreateExerciseHandler : IMessageHandler
    {
        public const string MsgType = "CreateExerciseMsg";

        public bool CanHandle(object message)
        {
            return message.GetType().Name == MsgType;
        }

        public bool CanHandle(string type)
        {
            return type == MsgType;
        }

        public FitState Apply(FitState state, object entry)
        {
            var message = (entry as CreateExerciseMsg)!;

            var exercise = new Exercise { Id = message.ExerciseId, Name = message.Name };
            state.Exercises.Add(exercise);

            return state;
        }
    }
}

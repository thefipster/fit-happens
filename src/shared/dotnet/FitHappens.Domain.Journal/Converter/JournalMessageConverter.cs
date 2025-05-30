using System.Text.Json;
using System.Text.Json.Serialization;
using FitHappens.Domain.Journal.Messages;

namespace FitHappens.Domain.Journal.Converter
{
    public class JournalMessageConverter : JsonConverter<JournalMessage>
    {
        public const string Discriminator = "type";

        public override JournalMessage? Read(
            ref Utf8JsonReader reader,
            Type typeToConvert,
            JsonSerializerOptions options
        )
        {
            using var doc = JsonDocument.ParseValue(ref reader);
            var root = doc.RootElement;

            if (!root.TryGetProperty(Discriminator, out var typeProp))
                throw new JsonException("Missing type discriminator.");

            var typeDiscriminator = typeProp.GetString();
            return typeDiscriminator switch
            {
                MessageTypes.CreateExercise => JsonSerializer.Deserialize<CreateExerciseMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.CreateTag => JsonSerializer.Deserialize<CreateTagMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.CreateBatch => JsonSerializer.Deserialize<CreateBatchMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.DeleteBatch => JsonSerializer.Deserialize<DeleteBatchMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.CreateBodyweight => JsonSerializer.Deserialize<CreateBodyweightMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.DeleteBodyweight => JsonSerializer.Deserialize<DeleteBodyweightMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.CreateUser => JsonSerializer.Deserialize<CreateUserMsg>(
                    root.GetRawText(),
                    options
                ),
                MessageTypes.LinkExerciseTags => JsonSerializer.Deserialize<LinkExerciseTagsMsg>(
                    root.GetRawText(),
                    options
                ),
                _ => throw new JsonException($"Unknown type discriminator: {typeDiscriminator}"),
            };
        }

        public override void Write(
            Utf8JsonWriter writer,
            JournalMessage value,
            JsonSerializerOptions options
        )
        {
            var typeDiscriminator = value switch
            {
                CreateExerciseMsg => MessageTypes.CreateExercise,
                CreateTagMsg => MessageTypes.CreateTag,
                CreateBatchMsg => MessageTypes.CreateBatch,
                DeleteBatchMsg => MessageTypes.DeleteBatch,
                CreateBodyweightMsg => MessageTypes.CreateBodyweight,
                DeleteBodyweightMsg => MessageTypes.DeleteBodyweight,
                LinkExerciseTagsMsg => MessageTypes.LinkExerciseTags,
                CreateUserMsg => MessageTypes.CreateUser,
                _ => throw new JsonException($"Unknown type: {value.GetType().Name}"),
            };

            var json = JsonSerializer.SerializeToElement(value, value.GetType(), options);
            using var obj = new MemoryStream();
            using var writerWrapper = new Utf8JsonWriter(obj);

            writer.WriteStartObject();
            writer.WriteString(Discriminator, typeDiscriminator);

            foreach (var prop in json.EnumerateObject())
            {
                prop.WriteTo(writer);
            }

            writer.WriteEndObject();
        }
    }
}

using System.Net;
using FitHappens.Domain.Journal.Messages;
using FitHappens.Repository.Journal.Abstractions;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace FitHappens.WebApi.Controllers
{
    [Route("api/journal")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IJournalStore store;

        public JournalController(IUserService userService, IJournalStore store)
        {
            this.userService = userService;
            this.store = store;
        }

        /// <summary>
        /// Retrieves the latest timestamp from the journal of the authorized user.
        /// </summary>
        /// <returns>Unix timestamp in milliseconds</returns>
        [ApiKey]
        [HttpGet("latest", Name = "GetLatestTimestamp")]
        public long GetLatestTimestamp()
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            var journal = store.Load(userId.ToString());

            if (!journal.Any())
                return 0;

            return journal.Max(x => x.Timestamp);
        }

        /// <summary>
        /// Retrieves the journal messages of the authorized user.
        /// </summary>
        /// <param name="timestamp">Optional timestamp to define the start of the send journal.</param>
        /// <returns>Journal messages</returns>
        [ApiKey]
        [HttpGet(Name = "GetJournal")]
        public IEnumerable<JournalMessage> Get()
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            var journal = store.Load(userId.ToString());

            return journal.OrderBy(x => x.Timestamp);
        }

        /// <summary>
        /// Retrieves the journal messages of the authorized user since the specified timestamp.
        /// </summary>
        /// <param name="timestamp">Unix timestamp in milliseconds to define the start of the transmitted partial journal.</param>
        /// <returns>Journal messages</returns>
        [ApiKey]
        [HttpGet("{timestamp:long}", Name = "GetJournalPartially")]
        public IEnumerable<JournalMessage> Get(long timestamp)
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            var journal = store.Load(userId.ToString());

            return journal.Where(x => x.Timestamp > timestamp).OrderBy(x => x.Timestamp);
        }

        /// <summary>
        /// Appends messages to the journal of the authorized user.
        /// </summary>
        /// <param name="messages">The messages that are appended</param>
        /// <returns>Ok</returns>
        [ApiKey]
        [HttpPost("append", Name = "AppendJournal")]
        public IActionResult Post([FromBody] IEnumerable<JournalMessage> messages)
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            store.Append(userId.ToString(), messages);

            return Ok();
        }
    }
}

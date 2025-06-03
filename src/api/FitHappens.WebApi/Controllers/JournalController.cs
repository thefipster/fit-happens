using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
using FitHappens.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace FitHappens.WebApi.Controllers
{
    [Route("api/journal")]
    [ApiController]
    public class JournalController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly IJournalStore store;
        private readonly ILogger<JournalController> logger;

        public JournalController(
            IUserService userService,
            IJournalStore store,
            ILogger<JournalController> logger
        )
        {
            this.userService = userService;
            this.store = store;
            this.logger = logger;
        }

        /// <summary>
        /// Retrieves the journal messages of the authorized user.
        /// </summary>
        [ApiKey]
        [HttpGet(Name = "GetJournal")]
        public async Task<IEnumerable<JournalMessage>> GetPaged([FromQuery] JournalQuery query)
        {
            var key = Request.Headers["X-Api-Key"];
            var userId = userService.GetIdForKey(key);
            var journal = await store.Load(userId, query);

            return journal;
        }

        /// <summary>
        /// Appends messages to the journal of the authorized user.
        /// </summary>
        [ApiKey]
        [HttpPost(Name = "AppendJournal")]
        public IActionResult Post([FromBody] IEnumerable<JournalMessage> messages)
        {
            var key = Request.Headers["X-Api-Key"];
            var userId = userService.GetIdForKey(key);
            store.Append(userId, messages);
            logger.LogDebug("Messages appended for user: " + userId);

            return Ok();
        }

        /// <summary>
        /// Deletes all messages from the journal of the authorized user.
        /// </summary>
        [ApiKey]
        [HttpDelete(Name = "DeleteJournal")]
        public IActionResult Reset()
        {
            var key = Request.Headers["X-Api-Key"];
            var userId = userService.GetIdForKey(key);
            store.Reset(userId);
            return Ok();
        }
    }
}

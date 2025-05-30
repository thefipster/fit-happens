﻿using FitHappens.Domain.Journal.Abstractions;
using FitHappens.Domain.Journal.Messages;
using FitHappens.WebApi.Abstractions;
using FitHappens.WebApi.Auth;
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
        /// Retrieves the latest timestamp from the journal of the authorized user.
        /// </summary>
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
        [ApiKey]
        [HttpPost("append", Name = "AppendJournal")]
        public IActionResult Post([FromBody] IEnumerable<JournalMessage> messages)
        {
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            store.Append(userId.ToString(), messages);
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
            var key = Request.Headers["X-Api-Key"].ToString();
            var userId = userService.GetIdForKey(key);
            store.Reset(userId.ToString());
            return Ok();
        }
    }
}

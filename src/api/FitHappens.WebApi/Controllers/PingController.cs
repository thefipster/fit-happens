using FitHappens.WebApi.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FitHappens.WebApi.Controllers
{
    /// <summary>
    /// Use this if you don't know what to do.
    /// </summary>
    [ApiController]
    [Route("api/ping")]
    public class PingController : ControllerBase
    {
        private readonly ILogger<PingController> logger;

        public PingController(ILogger<PingController> logger)
        {
            this.logger = logger;
        }

        /// <summary>
        /// Bored? Play some ping pong. (Hint: The server always wins!)
        /// </summary>
        /// <returns></returns>
        [ApiKey]
        [HttpGet(Name = "Ping")]
        public string Get()
        {
            return "pong";
        }
    }
}

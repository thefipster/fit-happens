using FitHappens.WebApi.Auth;
using Microsoft.AspNetCore.Mvc;

namespace FitHappens.WebApi.Controllers
{
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
        [ApiKey]
        [HttpGet(Name = "Ping")]
        public string Get()
        {
            return "pong";
        }
    }
}

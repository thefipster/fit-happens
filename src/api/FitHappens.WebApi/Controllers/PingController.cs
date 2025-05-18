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

        [ApiKey]
        [HttpGet(Name = "Ping")]
        public string Get()
        {
            logger.LogInformation("pong");
            return "pong";
        }
    }
}
